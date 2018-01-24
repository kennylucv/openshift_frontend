# run-time container using nginx
FROM nginx:1.12

# overwrite nginx default configurations
COPY    nginx.conf /etc/nginx/

# copy sites-enabled directory
RUN     mkdir /etc/nginx/sites-enabled
COPY    sites-enabled/ /etc/nginx/sites-enabled/

# copy and store Angular distribution files
RUN     mkdir /dist
RUN     chmod 777 /dist
COPY    dist/ /dist/


#EXPOSE 9000

# start nginx
RUN     chmod 777 -R /var/
RUN     touch /var/run/nginx.pid
RUN     chmod 777 /var/run/nginx.pid
CMD     /usr/sbin/nginx