# Use the official Node.js image
FROM node:9

# Set the working directory inside the container
WORKDIR /app

# Copy all files from the current directory to the working directory
COPY . .

# Install dependencies
RUN npm install
RUN npm install -g bower
CMD ["bower", "install"]

# Expose the port on which the app will run
EXPOSE 3000

# Command to start the Node.js server
CMD ["npm", "run", "build"]
CMD ["npm", "run", "start:server"]
