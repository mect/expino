FROM amd64/node:16 as build

COPY ./ /opt/expino
WORKDIR /opt/expino

RUN npm install --legacy-peer-deps
RUN npm run build

FROM alpine:3.17

RUN apk add --no-cache lighttpd

COPY ./lighttpd.conf /etc/lighttpd/lighttpd.conf

COPY --from=build /opt/expino/build /var/www

CMD ["lighttpd", "-D", "-f", "/etc/lighttpd/lighttpd.conf"]