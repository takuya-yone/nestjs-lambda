FROM node:18-alpine AS base
RUN apk add --no-cache libc6-compat curl

# Install dependencies only when needed
FROM base AS builder
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY . .
RUN \
  if [ -f yarn.lock ]; then yarn install --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi


# Rebuild the source code only when needed
# FROM base AS builder
# WORKDIR /app
RUN yarn prisma generate
RUN yarn build

FROM base AS runner
# FROM amazon/aws-lambda-nodejs:18.2023.06.16.13 AS runner
# COPY --from=public.ecr.aws/awsguru/aws-lambda-adapter:0.7.0 /lambda-adapter /opt/extensions/lambda-adapter

WORKDIR /app
ENV NODE_ENV=production 
COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/package.json /app/package.json
# COPY --from=builder /app/schema.gql /app/schema.gql
COPY --from=builder /app/prisma /app/prisma
COPY --from=builder /app/dist /app/dist
COPY --from=builder /app/.env /app/.env
# COPY package.json ./

EXPOSE 3000
ENV PORT 3000
# ENTRYPOINT ["ls"]
ENTRYPOINT ["node"]
CMD ["dist/src/main.js"]