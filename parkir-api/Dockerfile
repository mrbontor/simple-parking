FROM node:14-alpine
MAINTAINER mrbontor@gmail.com

RUN apk update; apk add tzdata

# create app directory
WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm install 

# Bundle app source
COPY . .

# Environment
ENV NODE_ENV development

# Run the command on container startup
ENTRYPOINT ["npm", "start"]
