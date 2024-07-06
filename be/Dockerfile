FROM openjdk:17-jdk-slim AS builder  
  
WORKDIR /app  
  
COPY build.gradle settings.gradle gradlew ./  
COPY gradle ./gradle  
  
COPY src ./src  
  
RUN chmod +x ./gradlew  
  
RUN ./gradlew build  
  
FROM openjdk:17-jdk-slim  
  
WORKDIR /app  
  
COPY --from=builder /app/build/libs/*.jar app.jar  
  
ENTRYPOINT ["java", "-jar", "app.jar"]  
