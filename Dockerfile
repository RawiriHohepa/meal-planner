# syntax=docker/dockerfile:1.4

# Create image based on the official Node image from dockerhub
FROM node:lts-iron

# Create app directory
WORKDIR /app

# Get all the code needed to run the app
COPY . /app

# Install dependecies
RUN npm ci

# Build the app
RUN npm run build

# Serve the app
CMD ["npm", "start"]
