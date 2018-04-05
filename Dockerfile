FROM registry.cn-hangzhou.aliyuncs.com/0x01301c74/nginx

COPY nginx.conf.template /etc/nginx/nginx.conf.tempate
COPY dist /usr/share/nginx/html
COPY entry-point.sh /run/entry-point.sh
RUN  chmod +x /run/entry-point.sh


ENTRYPOINT /run/entry-point.sh
