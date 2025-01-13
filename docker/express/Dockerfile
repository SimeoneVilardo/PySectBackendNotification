# Use a specific version of Node.js.
FROM node:21 AS builder_image

# Set the working directory in the container.
WORKDIR /code

# Copy dependency manifests.
COPY package.json package-lock.json ./

# Install production dependencies.
RUN npm ci --only=production

# Copy the rest of the application code.
COPY . .

# Use a lighter Node.js image for the final production image.
FROM node:21-alpine as runner_image

# Set the working directory in the container.
WORKDIR /code

# Copy only the necessary files from the previous stage.
COPY --from=builder_image /code .

# Expose the port the app runs on.
EXPOSE 8000

# Command to run the application.
CMD ["npm", "start"]
