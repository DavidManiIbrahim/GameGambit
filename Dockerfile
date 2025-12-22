
#-----------Base------------
FROM node:18-alphine AS base
WORKDIR /app

#--------Dependencies--------
FROM base AS deps
COPY package*.json ./
RUN npm ci

#------------Build-------------
From base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

#----------Production-------------
FROM node:18-alphine AS runner
WORKDIR /app

ENV NODE_ENV=production

#Copy only what we need
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000

CMD ["npm", "run", "start"]
