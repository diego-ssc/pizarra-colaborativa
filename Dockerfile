# Base image
FROM node:20-alpine3.19 as base

# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

# Expose port
EXPOSE 3002

# Start command
FROM base as server
CMD [ "node", "./bin/server.js" ]

FROM base as worker
CMD [ "node", "./bin/worker.js" ]
