FROM node:18.20
RUN mkdir /app
COPY . /app
WORKDIR /app

RUN npm config set registry https://registry.npmmirror.com
RUN npm install
RUN npm run build

FROM nginx
RUN mkdir /app
COPY --from=0 /app/dist /app
COPY ./nginx.conf /etc/nginx/nginx.conf