# Stage 1: Build Vue app
FROM node:14 AS build

WORKDIR /usr/src/app

# Copy only the package.json and package-lock.json files initially
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the app source code
COPY . .

# Build the Vue app for production
RUN npm run build

# Stage 2: Serve the app with Nginx
FROM nginx:alpine

# Remove the default Nginx configuration
RUN rm -rf /etc/nginx/conf.d

# Copy the custom Nginx configuration
COPY nginx /etc/nginx/conf.d

# Copy the built Vue app from the previous stage
COPY --from=build /usr/src/app/dist /usr/share/nginx/html

# Expose port 80 for Nginx
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
