#!/bin/bash
set -euo pipefail

APP_DIR="${app_dir}"
SSH_USER="${ssh_user}"

echo "Bootstrapping ACMF EC2 instance..."

apt-get update -y
apt-get install -y ca-certificates curl gnupg

install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg

ARCH="$(dpkg --print-architecture)"
CODENAME="$(. /etc/os-release && echo "$VERSION_CODENAME")"
echo \
  "deb [arch=$${ARCH} signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $${CODENAME} stable" \
  > /etc/apt/sources.list.d/docker.list

apt-get update -y
apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

systemctl enable docker
systemctl start docker

# Ensure the SSH user can run docker without sudo.
if id "$${SSH_USER}" >/dev/null 2>&1; then
  usermod -aG docker "$${SSH_USER}" || true
fi

mkdir -p "$${APP_DIR}/deploy"
chown -R "$${SSH_USER}:$${SSH_USER}" "$${APP_DIR}"

echo "Bootstrap complete."

