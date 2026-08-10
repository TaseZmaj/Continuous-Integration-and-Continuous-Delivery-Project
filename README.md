# Continuous Integration and Delivery Project

This project is a simple full-stack CRUD application built for the DevOps course from my faculty. It includes a React frontend, a Node.js/Express backend, and a PostgreSQL database, all containerized and prepared for Docker Compose, Github CI, and Kubernetes deployment.

### Setup

Make sure you have Docker Desktop installed and running and ports 3000 and 3001 are open.

<br>

## Dockerization

1. At the project's root, run:

```bash
docker compose up --build
```

Once the composition has fully started, these are the active ports that expose the services:

- Frontend: http://localhost:3000
- Backend API: http://localhost:3001

For a backend health check, use:

- Health check: http://localhost:3001/health

Stop the application

```bash
docker compose down
```

<br>
<br>

## CI Pipeline

To test the CI pipeline, create your own fork or add a personal remote, then commit and push a small change to that remote. To verify the CI pipeline runs.

<br>
<br>

## Kubernetes deployment

1. First, create a cluster using:

```bash
k3d cluster create devops-project-cluster -p "3000:80@loadbalancer" -p "3001:80@loadbalancer" -s 1 -a 1
```

<br>

2. Then, at the root directory, apply these manifests:

```bash
kubectl apply -f k8s/namespace.yaml
kubectl apply -f k8s/configmap.yaml
kubectl apply -f k8s/secret.yaml
kubectl apply -f k8s/postgres-statefulset.yaml
kubectl apply -f k8s/backend-deployment.yaml
kubectl apply -f k8s/frontend-deployment.yaml
kubectl apply -f k8s/frontend-ingress.yaml
kubectl apply -f k8s/backend-ingress.yaml
```

<br>

3. Next, run:

```bash
kubectl get ingress -n dev-ops-project
```

From here look at the make sure that the "ADRESSES" column has values - if not, wait a bit and run the command again until you see the values.

<br>

4. Finally, run to apply the CORS policy:

```bash
kubectl apply -f k8s/backend-middleware.yaml
```

<br>

With that - the cluster is fully initialized.
