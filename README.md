# Docker + Naught Zombie Process Example 

## Building

```shell
docker build -t ze .
```

## Run Example

Open 3 shell window/tabs/split panes, then run the commands in each:

#### Shell 1

```shell
docker run -it --rm --name ze ze
```

#### Shell 2

You will see a few processes here, when the main process (pid 1) is the maught main process, then the master process,
then the two child worker processes.

```shell
docker exec -it ze bash -c 'watch -n 1 ps auxf'
```

#### Shell 3

There are two endpoints `/`, which just is a basic hello world, and then `/redeploy` which calls `naught deploy`.

##### Hello World Endpoint

```shell
docker exec -it ze curl http://localhost:8080
```

##### Redeploy Endpoint

```shell
docker exec -it ze curl http://localhost:8080/redeploy
```

### Findings

After calling the `/redeploy` endpoint, you will see that the `node deploy` child process becomes a zombie process. Since
naught is not a real process manger, it does not cleanup zombie processes from it's childen.
