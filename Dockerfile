FROM node:alpine

USER root
ENV NODE_ENV=production
ENV HOME=/home/node/app
RUN mkdir $HOME
WORKDIR $HOME

COPY . /home/node/app

RUN npm install --unsafe-perm -g @angular/cli@1.6.1

RUN npm install

EXPOSE 4200

#CMD sh -c 'if [ "$ENV" = prod ]; then ng serve --env=prod --host 0.0.0.0 --disable-host-check; elif [ "$ENV" = dev ]; then ng serve --env=dev --host 0.0.0.0 --disable-host-check; elif [ "$ENV" = qa ]; then ng serve --env=qa --host 0.0.0.0 --disable-host-check; fi'

CMD ng serve --env=$ENV --host 0.0.0.0 --disable-host-check




