# Use the official Node.js image
FROM node:18-alpine

# Set the working directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Copy the app source code
COPY . .

# Build the app
RUN npm run build

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start:prod"]