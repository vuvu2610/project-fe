FROM openjdk:17-jdk-slim  
  
WORKDIR /app  
  
COPY --from=builder /app/build/libs/*.jar app.jar  
  
ENTRYPOINT ["java", "-jar", "app.jar"]  
