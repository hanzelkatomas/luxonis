FROM node:20-alpine AS build

# Set the working directory
WORKDIR /app

COPY package.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

# Start the Nginx web server
CMD ["nginx", "-g", "daemon off;"]
