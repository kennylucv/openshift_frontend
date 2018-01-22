FROM nginx:1.12

RUN mkdir /dist /health

COPY nginx.conf /etc/nginx/

COPY dist/ /dist/

EXPOSE 9000

CMD /usr/sbin/nginx