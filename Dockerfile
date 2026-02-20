FROM node:20-slim AS base

# Install Chromium dependencies for Puppeteer
RUN apt-get update && apt-get install -y \
    chromium \
    fonts-liberation \
    libnss3 \
    libatk-bridge2.0-0 \
    libx11-xcb1 \
    libxcomposite1 \
    libxdamage1 \
    libxrandr2 \
    libgbm1 \
    libpango-1.0-0 \
    libcairo2 \
    libasound2 \
    libcups2 \
    libdbus-1-3 \
    --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

# Install dependencies
FROM base AS deps
WORKDIR /app/webapp
COPY webapp/package.json webapp/package-lock.json ./
RUN npm ci

# Build
FROM base AS builder
WORKDIR /app/webapp
COPY --from=deps /app/webapp/node_modules ./node_modules
COPY webapp/ .
COPY prompts/ /app/prompts/
RUN npm run build

# Run
FROM base AS runner
WORKDIR /app/webapp
ENV NODE_ENV=production
ENV PORT=3000

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/webapp/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/webapp/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/webapp/.next/static ./.next/static
COPY --from=builder /app/prompts /app/prompts

USER nextjs
EXPOSE 3000

CMD ["node", "server.js"]
