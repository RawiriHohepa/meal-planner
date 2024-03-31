# syntax=docker/dockerfile:1.4

# Create image based on the official Node image from dockerhub
FROM node:lts-iron

# Create app directory
WORKDIR /usr/src/app

# Get all the code needed to run the app
COPY . /usr/src/app

# Install dependecies
RUN npm ci

# Build the app
RUN npm run build

# Serve the app
CMD ["npm", "start"]
