#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
COMPOSE_FILE="${SCRIPT_DIR}/docker-compose.ec2.yml"
ENV_FILE="${SCRIPT_DIR}/.env.ec2"

if [[ ! -f "${ENV_FILE}" ]]; then
  echo "Missing ${ENV_FILE}"
  echo "Copy .env.ec2.example -> .env.ec2 and update values."
  exit 1
fi

docker compose --env-file "${ENV_FILE}" -f "${COMPOSE_FILE}" up -d --build
docker compose --env-file "${ENV_FILE}" -f "${COMPOSE_FILE}" ps

echo
echo "Deployment complete."
echo "UI should be reachable at: http://<EC2_PUBLIC_IP>"
echo "API is proxied via the same host under /api and /auth"
