FROM maven:3.9-eclipse-temurin-17 AS builder
WORKDIR /build

COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

FROM eclipse-temurin:17-jre-jammy
WORKDIR /app

# The API needs the Docker CLI to generate JHipster projects by invoking `docker run`.
# It also needs the host Docker daemon socket at `/var/run/docker.sock` (mounted via docker-compose).
RUN apt-get update \
  && apt-get install -y ca-certificates curl gnupg \
  && install -m 0755 -d /etc/apt/keyrings \
  && curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg \
  && ARCH="$(dpkg --print-architecture)" \
  && CODENAME="$(. /etc/os-release && echo "$VERSION_CODENAME")" \
  && echo "deb [arch=${ARCH} signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu ${CODENAME} stable" > /etc/apt/sources.list.d/docker.list \
  && apt-get update \
  && apt-get install -y docker-ce-cli \
  && rm -rf /var/lib/apt/lists/*

COPY --from=builder /build/target/acmf-apis.jar /app/acmf-apis.jar

EXPOSE 8081
ENTRYPOINT ["java", "-jar", "acmf-apis.jar"]
