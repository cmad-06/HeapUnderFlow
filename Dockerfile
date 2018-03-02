from maven:latest as build
WORKDIR /opt/demo
COPY . /opt/demo
RUN mvn package


FROM tomcat:latest
WORKDIR /usr/local/tomcat
EXPOSE 8080 
COPY --from=build opt/demo/target/heapunderflow-0.0.1-SNAPSHOT*.war /usr/local/tomcat/webapps/heapunderflow.war
CMD catalina.sh run
