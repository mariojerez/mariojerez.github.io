# Set up

## Prepare host machine for React app
``` bash
npm create vite@latest my-site -- --template react
cd my-site
```

## Build the image
From `/my-site`,
``` bash
docker build -t react-website-dev .
```

## Run the container
``` bash
docker run -it \
  --name react-website-dev \
  -p 5173:5173 \
  -v "$(pwd):/app" \
  -v react-website-node-modules:/app/node_modules \
  -v ~/.ssh:/root/.ssh:ro \
  react-website-dev
```

## Restart the container
``` bash
docker start -ai react-website-dev
```

## Inside the container, make installations.
``` bash
node -v
npm install
npm run dev -- --host 0.0.0.0
```

## In another shell inside the same container, or after exiting Claude
Open another container:
``` bash
docker exec -it react-website-dev bash
```

```
npm run dev -- --host 0.0.0.0
```

## Open local URL in a browser
``` plain text
http://localhost:5173
```

# TODO:
