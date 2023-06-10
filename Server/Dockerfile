# Use the official Nodejs 14 images as the base image

FROM node:18-alpine

# Set the working directory to /app
WORKDIR /app 

#COPY the package.json and package-lock files to the container.
COPY package*.json ./

COPY .env ./

#Copy the rest application files to the container.
COPY . .

#Expose port 3000
EXPOSE 3000

# Start the application
ENTRYPOINT ["sh", "start.sh"] 
