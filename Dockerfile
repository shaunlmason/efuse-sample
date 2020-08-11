FROM node:12-alpine

ARG NODE_ENV=production

# install app dependencies
COPY package.json /service/package.json
COPY yarn.lock /service/yarn.lock

# update & install required packages
RUN apk add --update bash curl;
RUN cd /service; yarn install --frozen-lockfile;

# copy app source
COPY . /service

# set work directory to /service
WORKDIR /service

# set your port
ENV PORT 5000

# expose the port to outside world
EXPOSE 5000

CMD ["yarn", "start"]
