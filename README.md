# Continuous Integration and Delivery Project

This project is a simple full-stack CRUD application built for the DevOps course from my faculty. It includes a React frontend, a Node.js/Express backend, and a PostgreSQL database, all containerized and prepared for Docker Compose, Github CI, and Kubernetes deployment.

## Start the application

From the project root, run:

```bash
docker compose up --build
```

Once the containers are running, open:

- Frontend: http://localhost:3000
- Backend API: http://localhost:3001
- Health check: http://localhost:3001/health

## Stop the application

```bash
docker compose down
```

## Run locally without Docker

### Backend

```bash
cd backend
npm install --omit=dev
npm start
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Kubernetes deployment

The repository also contains basic Kubernetes manifests in the k8s folder. To apply them, run:

```bash
kubectl apply -f k8s/namespace.yaml
kubectl apply -f k8s/configmap.yaml
kubectl apply -f k8s/secret.yaml
kubectl apply -f k8s/postgres-statefulset.yaml
kubectl apply -f k8s/backend-deployment.yaml
kubectl apply -f k8s/frontend-deployment.yaml
```

Before deploying, replace the placeholder Docker Hub image names in the Kubernetes manifests with your own image names.
