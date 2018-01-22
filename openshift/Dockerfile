# run-time container using nginx
FROM nginx:1.12

# overwrite nginx dedefault configurations
COPY nginx.conf /etc/nginx/

# copy and store Angular distribution files
RUN mkdir /dist
RUN chmod 777 /dist
COPY dist/ /dist/

EXPOSE 9000

# start nginx
CMD /usr/sbin/nginx