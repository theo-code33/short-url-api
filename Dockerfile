FROM node:18-alpine as build

WORKDIR /app

# Copy configuration files
COPY tsconfig*.json ./
COPY package*.json ./

# Install dependencies from package-lock.json
RUN yarn install \
  --prefer-offline \
  --frozen-lockfile \
  --non-interactive \
  --production=false

# Copy application sources (.ts, .tsx, js)
COPY src/ src/

# Build application (produces dist/ folder)
RUN npm run build


FROM node:18-alpine as production

WORKDIR /app

# Copy dependencies files
COPY package*.json ./

# Install runtime dependecies (without dev/test dependecies)
RUN rm -rf node_modules && \
  NODE_ENV=production yarn install \
  --prefer-offline \
  --pure-lockfile \
  --non-interactive \
  --production=true

# Copy production build
COPY --from=build /app/dist/ ./dist/

# Expose application port
EXPOSE 8000

ENV NODE_ENV=production

# Start application
CMD [ "node", "dist/main.js" ]