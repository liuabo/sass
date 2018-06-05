FROM registry.cn-hangzhou.aliyuncs.com/zhongxin-repertory/zhongxin-prod:nginx
COPY default.conf /etc/nginx/conf.d
COPY dist/  /usr/share/nginx/html/om
RUN echo 'Spring Cloud Docker'
EXPOSE 80