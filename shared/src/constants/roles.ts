// =============================================
// Barbearia Vikings — Shared Constants: Roles
// =============================================

export enum UserRole {
  ADMIN = 'ADMIN',
  BARBER = 'BARBER',
}

export enum BookingStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
  COMPLETED = 'COMPLETED',
  NO_SHOW = 'NO_SHOW',
}

export enum StockMovementType {
  IN = 'IN',
  OUT = 'OUT',
  ADJUSTMENT = 'ADJUSTMENT',
}

export enum NotificationChannel {
  INTERNAL = 'INTERNAL',
  WHATSAPP = 'WHATSAPP',
  SMS = 'SMS',
}

export enum NotificationType {
  CONFIRMATION = 'CONFIRMATION',
  REMINDER = 'REMINDER',
  CANCELLATION = 'CANCELLATION',
}

export enum NotificationStatus {
  PENDING = 'PENDING',
  SENT = 'SENT',
  FAILED = 'FAILED',
}
