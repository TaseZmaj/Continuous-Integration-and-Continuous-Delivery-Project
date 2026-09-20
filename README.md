# Continuous Integration and Delivery Project

This project is a simple full-stack CRUD application built for the DevOps course from my faculty. It includes a React frontend, a Node.js/Express backend, and a PostgreSQL database, all containerized and prepared for Docker Compose, Github CI, and Kubernetes deployment.

### Setup

- Make sure you have <b>Docker Desktop</b> - installed and running, and <b>K3D</b> installed.  Ports 3000, 3001, 3100, and 3101 are required to be open.

<br>

## Dockerization

1. At the project's root, run:

```bash
docker compose up --build
```

Once the composition has fully started, you can check the frontend via:

- Frontend:

```url
http://localhost:3000
```

and for a backend health check, you can use:

```url
http://localhost:3001/health
```

<br>

2. In order to be able to test Kubernetes - Stop the application and remove the containers with:

```bash
docker compose down
```

<br>
<br>

## CI Pipeline

1. After cloning the repository, remove the pre-existing remotes with:

```bash
git remote remove origin
```

You can check to make sure they are removed with:

```bash
git remote -v
```

<br>

2. Create your own remote git repository and add a remote.

```bash
git remote add origin <your_repository_url>
```

<br>

3. Go to github, navigate to your repository -> Settings -> Secrets and Variables -> Actions and add 2 new repository secrets:
   - DOCKERHUB_USERNAME -> your own dockerhub username
   - DOCKERHUB_TOKEN -> generate a token from dockerhub and add the string here

<br>

4. Then make a small change in the code/readme somewhere, commit and push it to your repository. Immediately after that, open the Actions tab at your repository and watch the pipeline run. You can also check your dockerhub repository to see the new images that were just created.

<br>
<br>

## Kubernetes deployment

1. First, create a cluster using:

```bash
k3d cluster create devops-project-cluster -p "3100:80@loadbalancer" -p "3101:80@loadbalancer" -s 1 -a 1
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

4. Run the last manifest to apply the CORS policy:

```bash
kubectl apply -f k8s/backend-middleware.yaml
```

<br>

5. Finally, in order for kubernetes to resolve the DNS name, make sure to add this to your windows hosts file - C:\Windows\System32\drivers\etc :

```notepad
127.0.0.1 devops-project.local
```

<br>

With that - the cluster is fully initialized. You can see the results via:

- Frontend:

```url
http://devops-project.local:3100
```

and for a backend health check, you can use:

```url
http://localhost:3101/health
```
