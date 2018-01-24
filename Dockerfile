ARG arch
FROM multiarch/debian-debootstrap:${arch}-sid

# Install lighttpd
RUN apt-get update && apt-get install -y lighttpd

COPY ./lighttpd.conf /etc/lighttpd/lighttpd.conf

RUN apt-get update && apt-get install -y \
	dirmngr \
	gnupg \
	--no-install-recommends \
	&& apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 0AB215679C571D1C8325275B9BDB3D89CE49EC21 \
	&& echo "deb http://ppa.launchpad.net/mozillateam/firefox-next/ubuntu xenial main" >> /etc/apt/sources.list.d/firefox.list \
	&& apt-get update && apt-get install -y \
	ca-certificates \
	firefox \
	hicolor-icon-theme \
	libasound2 \
	libgl1-mesa-dri \
	libgl1-mesa-glx \
	--no-install-recommends \
&& rm -rf /var/lib/apt/lists/*

COPY ./build /var/www

CMD lighttpd -f /etc/lighttpd/lighttpd.conf && firefox http://localhost