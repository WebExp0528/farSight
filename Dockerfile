FROM node:14.5

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

#ARG DISABLE_OPENCOLLECTIVE=true

#RUN npm config set unsafe-perm true

#RUN CI=true 

RUN npm install 
# If you are building your code for production
RUN npm ci --only=production

# Bundle app source
COPY . .
RUN npm run build

RUN npm install -g serve

#serve runs on port 5000 and EB will map port 80 to any exposed port here. 
EXPOSE 3000

#command to run by default when starting the container.  
CMD [ "serve", "-s","build","-l","3000"]