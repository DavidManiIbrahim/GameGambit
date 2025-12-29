
# Server Dockerfile for the Express backend
# Single-stage, production-focused image

FROM node:18-alpine

LABEL org.opencontainers.image.source="https://github.com/DavidManiIbrahim/GameGambit"

WORKDIR /app

# Set production env and default port
ENV NODE_ENV=production
ENV PORT=4000

# Copy package files and install production dependencies only
COPY package*.json ./
RUN npm ci --only=production

# Copy app source
COPY . .

# Install curl for HEALTHCHECK (keeps image small)
RUN apk add --no-cache curl

# Use built-in non-privileged 'node' user
RUN chown -R node:node /app
USER node

EXPOSE 4000

# Simple healthcheck - hits /health endpoint
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
CMD curl -f http://localhost:4000/health || exit 1

# Start the server
CMD ["node", "index.js"]
