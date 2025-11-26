FROM nginx:alpine

RUN rm -rf /etc/nginx/conf.d/default.conf
COPY custom.conf /etc/nginx/conf.d/custom.conf

COPY cert.pem /etc/nginx/ssl/cert.pem
COPY key.pem /etc/nginx/ssl/key.pem

EXPOSE 80
EXPOSE 443