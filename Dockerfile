FROM amd64/node:14 as build

COPY ./ /opt/expino
WORKDIR /opt/expino

RUN npm install
RUN npm run build

FROM alpine:3.13

RUN apk add --no-cache lighttpd

COPY ./lighttpd.conf /etc/lighttpd/lighttpd.conf

COPY --from=build /opt/expino/build /var/www

CMD ["lighttpd", "-D", "-f", "/etc/lighttpd/lighttpd.conf"]