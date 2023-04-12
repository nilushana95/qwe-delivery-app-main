FROM node:18.15.0 as build-stage
# RUN npm install -g yarn@1.22.19

WORKDIR /backend
COPY package*.json ./
COPY yarn.lock .
# RUN yarn add -g rimraf

RUN yarn

COPY . .

RUN yarn run build

CMD [ "node", "dist/main" ]
