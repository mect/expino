ARG arch
FROM multiarch/alpine:${arch}-latest-stable

RUN apk add --no-cache lighttpd

COPY ./lighttpd.conf /etc/lighttpd/lighttpd.conf

COPY ./build /var/www

CMD ["lighttpd", "-D", "-f", "/etc/lighttpd/lighttpd.conf"]