# Stage 1: Build the NestJS application
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Stage 2: Create the final production image (leaner)
FROM node:18-alpine

WORKDIR /app

COPY --from=build /app/dist ./dist

COPY --from=build /app/node_modules ./node_modules

COPY --from=build /app/package.json ./package.json

COPY data ./data

EXPOSE 8080

CMD ["node", "dist/main"]