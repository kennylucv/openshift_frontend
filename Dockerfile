# container for building Angular distribution files
FROM teracy/angular-cli:1.5.0

# copy source code
RUN mkdir /app
COPY . /app/

EXPOSE 4200

WORKDIR /app
RUN npm install 
RUN ng build --prod

RUN git config --global user.name "BoZhaoUTSC"
RUN git config --global user.email "bodotzhao@gmail.com"

RUN git clone http://BoZhaoUTSC:1@52.233.32.176:7990/scm/oc/frontend-dist.git
RUN cp -r dist/ frontend-dist/

WORKDIR frontend-dist
RUN git add .
RUN git commit -m "Update"
RUN git push -u origin master