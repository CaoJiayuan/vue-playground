#!/bin/sh

if ["$FORWARD_PROTO" == ""]; then
    export FORWARD_PROTO=http
fi
if ["$API_URL" == ""]; then
    export API_URL='http://localhost'
fi

envsubst '$API_URL,$FORWARD_PROTO' < /etc/nginx/nginx.conf.tempate > /etc/nginx/nginx.conf

/usr/sbin/nginx -g 'daemon off;'
