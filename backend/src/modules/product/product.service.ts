// =============================================
// Barbearia Vikings — Product Service
// =============================================

import { prisma } from '../../config/database';
import { StockMovementType } from '@prisma/client';
import type { CreateProductInput, UpdateProductInput, StockMovementInput } from './product.schema';

export class ProductService {
  async findAllPublic() {
    return prisma.product.findMany({
      where: { active: true },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        imageUrl: true,
      },
      orderBy: { name: 'asc' },
    });
  }

  async findAll(activeOnly = true) {
    return prisma.product.findMany({
      where: activeOnly ? { active: true } : undefined,
      orderBy: { name: 'asc' },
    });
  }

  async findById(id: string) {
    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) {
      throw Object.assign(new Error('Produto não encontrado'), { statusCode: 404 });
    }
    return product;
  }

  async create(data: CreateProductInput) {
    return prisma.product.create({ data });
  }

  async update(id: string, data: UpdateProductInput) {
    await this.findById(id);
    return prisma.product.update({ where: { id }, data });
  }

  async softDelete(id: string) {
    await this.findById(id);
    return prisma.product.update({
      where: { id },
      data: { active: false },
    });
  }

  /**
   * Register a stock movement and update the product's stockQuantity.
   */
  async addStockMovement(productId: string, userId: string, data: StockMovementInput) {
    const product = await this.findById(productId);

    return prisma.$transaction(async (tx) => {
      // Calculate new quantity
      let quantityDelta: number;
      switch (data.type) {
        case 'IN':
          quantityDelta = data.quantity;
          break;
        case 'OUT':
          quantityDelta = -data.quantity;
          if (product.stockQuantity + quantityDelta < 0) {
            throw Object.assign(
              new Error('Estoque insuficiente para esta movimentação'),
              { statusCode: 400 },
            );
          }
          break;
        case 'ADJUSTMENT':
          // Adjustment sets the absolute value; delta = target - current
          quantityDelta = data.quantity - product.stockQuantity;
          break;
        default:
          throw new Error('Tipo de movimentação inválido');
      }

      // Create movement record
      const movement = await tx.stockMovement.create({
        data: {
          productId,
          userId,
          type: data.type as StockMovementType,
          quantity: data.quantity,
          reason: data.reason,
        },
      });

      // Update product stock
      await tx.product.update({
        where: { id: productId },
        data: {
          stockQuantity: { increment: quantityDelta },
        },
      });

      return movement;
    });
  }

  /**
   * Get stock movement history for a product.
   */
  async getStockHistory(productId: string) {
    return prisma.stockMovement.findMany({
      where: { productId },
      include: {
        user: { select: { id: true, name: true } },
      },
      orderBy: { createdAt: 'desc' },
      take: 50,
    });
  }

  /**
   * Get products with low stock (stockQuantity <= stockMin).
   */
  async getLowStock() {
    return prisma.$queryRaw`
      SELECT id, name, stock_quantity, stock_min
      FROM products
      WHERE active = true AND stock_quantity <= stock_min
      ORDER BY stock_quantity ASC
    `;
  }
}

export const productService = new ProductService();
