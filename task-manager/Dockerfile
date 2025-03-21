# Use Node.js to build the Vite app
FROM node:20 AS builder

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the entire project into the container
COPY . .

# Build the React Vite project
RUN npm run build

# Use NGINX as the production web server
FROM nginx:latest

# Remove the default NGINX configuration
RUN rm -rf /etc/nginx/conf.d

# Copy custom NGINX configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built React Vite files to NGINX's web directory
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 3000
EXPOSE 3000

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]

