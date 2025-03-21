# Use Node.js to build the React application
FROM node:20 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy only package.json and package-lock.json first for better caching
COPY task-manager/package.json task-manager/package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app files
COPY task-manager ./

# Build the React app
RUN npm run build

# Use Nginx to serve the React build
FROM nginx:alpine

# Remove default Nginx files
RUN rm -rf /usr/share/nginx/html/*

# Copy built React files from the previous stage
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 3000 (inside the container)
EXPOSE 3000

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]

