ARG arch
FROM multiarch/debian-debootstrap:${arch}-stretch

# Install lighttpd
RUN apt-get update && apt-get install -y lighttpd

COPY ./lighttpd.conf /etc/lighttpd/lighttpd.conf

# Install Chromium
RUN apt-get update && apt-get install -y \
      chromium \
      chromium-l10n \
      fonts-liberation \
      fonts-roboto \
      hicolor-icon-theme \
      libcanberra-gtk-module \
      libexif-dev \
      libgl1-mesa-dri \
      libgl1-mesa-glx \
      libpango1.0-0 \
      libv4l-0 \
      fonts-symbola \
      --no-install-recommends \
    && rm -rf /var/lib/apt/lists/* \
    && mkdir -p /etc/chromium.d/ 
# Add chromium user
RUN groupadd -r chromium && useradd -r -g chromium -G audio,video chromium \
    && mkdir -p /home/chromium/Downloads && chown -R chromium:chromium /home/chromium

COPY ./build /var/www

# Run as non privileged user
USER chromium

CMD lighttpd -f /etc/lighttpd/lighttpd.conf && chromium http://localhost