FROM eclipse-temurin:11-jre
ENV TZ=America/Lima
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
WORKDIR /
COPY target/*.jar /app.jar
ENV PROFILE ''
ENTRYPOINT java -jar -Dspring.profiles.active=$PROFILE app.jar