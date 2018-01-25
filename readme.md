Expino Kiosk

### How to run 

Get Jessie Frazelle's seccomp profile 
```
wget https://raw.githubusercontent.com/jfrazelle/dotfiles/master/etc/docker/seccomp/chrome.json -O ~/chrome.json
```

```
docker run --rm   \
	--name chrome \
    -v /etc/localtime:/etc/localtime:ro \
    -v /tmp/.X11-unix:/tmp/.X11-unix \
    -e DISPLAY=unix$DISPLAY \
	--security-opt seccomp=./chrome.json \
	-v /etc/machine-id:/etc/machine-id \
	-v /dev/shm:/dev/shm \
	expino/kiosk
```