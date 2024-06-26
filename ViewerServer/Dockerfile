FROM openjdk:21-jdk-slim

RUN apt-get update && \
    apt-get install -y fontconfig libfreetype6 && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY target/ruoyi.jar /app/ruoyi.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "/app/ruoyi.jar"]