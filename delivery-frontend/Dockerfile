FROM node:18.15.0-alpine as build-stage

WORKDIR /frontend

COPY package.json .


RUN npm install

COPY . .
RUN npm run build

ARG REACT_APP_API_BASE_URL
ENV REACT_APP_API_BASE_URL=$REACT_APP_API_BASE_URL

FROM nginx:1.17.0-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build-stage /frontend/build /urs/share/nginx/html
RUN touch /var/run/nginx.pid
RUN chown -R nginx:nginx /var/run/nginx.pid /usr/share/nginx/html /var/cache/nginx /var/log/nginx /etc/nginx/conf.d
USER nginx



EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]