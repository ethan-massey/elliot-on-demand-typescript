# Elliot On Demand!

<img src="./public/demo.png"  width="50%">

## Development
Secrets needed:

```
S3_SECRET_ACCESS_KEY=
S3_ACCESS_KEY_ID=
SPOTIFY_CLIENT_ID=
SPOTIFY_CLIENT_SECRET=
MONGO_URI=
```

**To run:**
1. `yarn install`
2. `yarn run dev`

**To run in local container:**

Context: docker is installed
1. `docker build -t eitm-od .` (generates new docker image using dockerfile)
2. `docker run -dp 8080:8080 --env-file .env eitm-od` (runs docker image in a new container with host port 8080 mapped to container port 8080)

**To gracefully shut down a container**
1. `docker ps` to view running containers
2. `docker stop <container id or name>` to shut down
