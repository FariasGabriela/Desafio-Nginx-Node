set -e

echo "Docker-Entrypoint iniciado"
npm install
npm install -g nodemon

echo "Docker-Entrypoint finalizado"

exec "$@"