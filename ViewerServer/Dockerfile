FROM openjdk:17-jdk-slim

WORKDIR /app

COPY target/ruoyi.jar /app/ruoyi.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "/app/ruoyi.jar"]