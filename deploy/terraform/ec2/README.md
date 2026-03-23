# EC2 Terraform (ACMF UI + API)

This provisions an Ubuntu EC2 instance for your GitHub Action workflow that deploys:
- `acmf-ui` (served via Nginx on port `80`)
- `acmf-api` (Spring Boot behind Nginx)
- `postgres` (as part of the same `docker-compose.ec2.yml`)

## What it creates

- Security group:
  - inbound `80/tcp` from the internet
  - inbound `22/tcp` only from `allowed_ssh_cidr`
- EC2 instance (default: Ubuntu Jammy 22.04)
- Installs Docker + `docker compose` plugin via `user_data`
- Pre-creates `app_dir` (default `/home/ubuntu/acmf`)
- Optional Elastic IP for stable UI URL

## Required inputs

- `aws_region`
- `key_name` (existing EC2 key pair name)
- `allowed_ssh_cidr` (for SSH access)

## Setup steps

From the Terraform folder:

```bash
cd deploy/terraform/ec2
terraform init
terraform apply
```

After `apply`, take these outputs and add them as GitHub repo secrets:
- `EC2_HOST` = `public_ip`
- `EC2_PUBLIC_IP` = `public_ip`
- `EC2_USER` = `ssh_user` (default `ubuntu`)
- `EC2_APP_DIR` = your `app_dir` (default `/home/ubuntu/acmf`)
- `EC2_SSH_PORT` = `22`
- `EC2_SSH_PRIVATE_KEY` = private key content for the EC2 key pair you used
- `POSTGRES_DB`, `POSTGRES_USER`, `POSTGRES_PASSWORD` (any values you want)

Then run the GitHub Action workflow manually (or push a change) to deploy to the fresh instance.

