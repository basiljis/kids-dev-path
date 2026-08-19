# Multi-stage build for TanStack Start (Nitro)
FROM node:20-slim AS builder

WORKDIR /app
COPY package.json bun.lock ./

# Install curl and bun using official installer
RUN apt-get update && apt-get install -y curl unzip \
    && curl -fsSL https://bun.sh/install | bash \
    && mv /root/.bun/bin/bun /usr/local/bin/bun \
    && bun install

COPY . .

ARG VITE_SUPABASE_URL
ARG VITE_SUPABASE_PUBLISHABLE_KEY
ARG VITE_SUPABASE_PROJECT_ID

ENV VITE_SUPABASE_URL=$VITE_SUPABASE_URL
ENV VITE_SUPABASE_PUBLISHABLE_KEY=$VITE_SUPABASE_PUBLISHABLE_KEY
ENV VITE_SUPABASE_PROJECT_ID=$VITE_SUPABASE_PROJECT_ID

# Build the Nitro application
RUN bun run build

# Production stage
FROM node:20-slim

WORKDIR /app

# Install Nginx
RUN apt-get update && apt-get install -y nginx curl \
    && rm -rf /var/lib/apt/lists/*

# Copy built application
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./package.json

# Copy Nginx config
COPY nginx.conf /etc/nginx/sites-available/default
RUN ln -sf /etc/nginx/sites-available/default /etc/nginx/sites-enabled/default

# Create a start script
RUN echo '#!/bin/sh\n\
nginx &\n\
# Set host to 0.0.0.0 to be accessible inside the container\n\
HOST=0.0.0.0 PORT=3000 node dist/server/index.mjs\n\
' > /app/start.sh && chmod +x /app/start.sh

EXPOSE 8080

CMD ["/app/start.sh"]
