# Use an official Python runtime as a parent image
FROM node

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
ADD . /app

EXPOSE 3000

RUN npm install

# Run app.py when the container launches
CMD ["node", "index.js"]
