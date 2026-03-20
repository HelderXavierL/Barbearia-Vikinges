FROM node:20-alpine

WORKDIR /app

# Copy workspace files
COPY package.json ./
COPY shared/ ./shared/
COPY backend/package.json ./backend/

# Install dependencies
RUN npm install --workspace=backend --workspace=shared

# Copy backend source
COPY backend/ ./backend/

# Generate Prisma client
RUN cd backend && npx prisma generate

# Build
RUN npm run build --workspace=backend

EXPOSE 3333

CMD ["node", "backend/dist/server.js"]
