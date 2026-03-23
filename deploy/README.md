# EC2 Deployment (UI + API)

This setup deploys:
- `acmf-ui` as an Nginx container on port `80` (public).
- `acmf-api` as a Spring Boot container on internal port `8081`.
- PostgreSQL as a private container.

The UI is available at the EC2 instance IP, and API traffic is routed through Nginx:
- `/api/*` -> Spring Boot `/api/*`
- `/auth/*` -> Spring Boot `/auth/*`

## 1) EC2 prerequisites

- Ubuntu 22.04/24.04 instance
- Security Group inbound:
  - `80/tcp` from `0.0.0.0/0`
  - `22/tcp` from your IP
- Docker + Compose plugin installed

Install Docker on EC2:

```bash
sudo apt-get update
sudo apt-get install -y ca-certificates curl gnupg
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
sudo usermod -aG docker $USER
newgrp docker
```

## 2) Copy project to EC2

Clone or copy this repository so the same folder structure exists on EC2.

## 3) Configure environment

```bash
cd deploy
cp .env.ec2.example .env.ec2
```

Edit `.env.ec2` and set:
- `POSTGRES_PASSWORD` (strong value)
- `FRONTEND_URLS=http://<YOUR_EC2_PUBLIC_IP>`

## 4) Deploy

```bash
cd deploy
chmod +x deploy-ec2.sh
./deploy-ec2.sh
```

## 5) Verify

- Open `http://<EC2_PUBLIC_IP>` (UI).
- API health: `http://<EC2_PUBLIC_IP>/actuator/health`
- Swagger: `http://<EC2_PUBLIC_IP>/docs`

## Useful commands

```bash
docker compose --env-file .env.ec2 -f docker-compose.ec2.yml logs -f
docker compose --env-file .env.ec2 -f docker-compose.ec2.yml ps
docker compose --env-file .env.ec2 -f docker-compose.ec2.yml down
```

## GitHub Actions (single pipeline)

The monorepo uses one workflow at `.github/workflows/deploy-ec2.yml` to deploy both UI and API together to EC2.

Set these repository secrets:
- `EC2_HOST` (public DNS/IP)
- `EC2_PUBLIC_IP` (public IPv4 for `FRONTEND_URLS`)
- `EC2_USER` (for example `ubuntu`)
- `EC2_SSH_PORT` (usually `22`)
- `EC2_SSH_PRIVATE_KEY` (private key content for EC2 access)
- `EC2_APP_DIR` (target path on EC2, for example `/home/ubuntu/acmf`)
- `POSTGRES_DB`
- `POSTGRES_USER`
- `POSTGRES_PASSWORD`
