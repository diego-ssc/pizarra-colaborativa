# Base image
FROM node:20-alpine3.19 as base

# Create app directory
WORKDIR /app

# Bundle app source
COPY . .

# Expose port
EXPOSE 3002

# Start command
CMD [ "node", "./worker.js" ]
