FROM mhart/alpine-node:16.4


# Set Working directory
WORKDIR /app

# Copy package.json
COPY package.json .

# Install dependencies
RUN npm install

# Copy files
COPY . .

# Run npm install
CMD ["npm", "run", "dev"]


#  docker build --platform linux/amd64  -t codeusdev/farepod_server .