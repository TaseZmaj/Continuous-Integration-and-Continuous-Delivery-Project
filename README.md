# Continuous Integration and Delivery Project

This project is a simple full-stack CRUD application built for the DevOps course from my faculty. It includes a React frontend, a Node.js/Express backend, and a PostgreSQL database, all containerized and prepared for Docker Compose, Github CI, and Kubernetes deployment.

## Start the application

Make sure you have Docker Desktop installed and running. Also, make sure that the ports 3000 and 3001 are open.

Then from the project's root, run:

```bash
docker compose up --build
```

Once the composition is fully started, these are the active ports that expose the services:

- Frontend: http://localhost:3000
- Backend API: http://localhost:3001

For a backend health check, use:

- Health check: http://localhost:3001/health

Stop the application

```bash
docker compose down
```

## Kubernetes deployment

First, create a cluster using

```bash
k3d cluster create -a 1 -m 1
```

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
