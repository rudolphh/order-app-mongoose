FROM node:14

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

# Sendgrid api key
ENV SENDGRID_API_KEY='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'

EXPOSE 3000
CMD [ "node", "index.js" ]