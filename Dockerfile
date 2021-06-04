FROM node:14.5

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package.json yarn.lock ./

#ARG DISABLE_OPENCOLLECTIVE=true

#RUN npm config set unsafe-perm true

#RUN CI=true 
#RUN npm install node-env-run nodemon npm-run-all express-pino-logger pino-colada --save-dev

RUN yarn 

# Bundle app source
COPY . .
#RUN npm install -g serve
RUN npm run-script client:build


#serve runs on port 3000 and EB will map port 80 to any exposed port here. 
EXPOSE 3000
#command to run by default when starting the container.  
CMD [ "npm","run-script", "server:prod"]
