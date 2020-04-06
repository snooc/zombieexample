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

To test using docker's `--init` flag, which adds the [tini](https://github.com/krallin/tini) as PID 1, instead of
naught, run:

```shell
docker run -it --rm --name ze --init ze
```

#### Shell 2

You will see a few processes here, when the main process (pid 1) is the maught main process, then the master process,
then the two child worker processes.

```shell
docker exec -it ze bash -c 'watch -n 1 ps axjf'
```

#### Shell 3

There are three endpoints `/`, which just is a basic hello world, and then `/redeploy` which calls `naught deploy`.
Finally, there is a `/sleep` endpoint that just executes `sleep 20` as a child process.

##### Hello World Endpoint

```shell
docker exec -it ze curl http://localhost:8080
```

##### Sleep Endpoint

```shell
docker exec -it ze curl http://localhost:8080/sleep
```

##### Redeploy Endpoint

```shell
docker exec -it ze curl http://localhost:8080/redeploy
```

### Findings

After calling the `/redeploy` endpoint, you will see that the `node deploy` child process becomes a zombie process. Since
naught is not a real process manger, it does not cleanup zombie processes from it's childen.

Another quick test is to call `/sleep`, then `/redeploy`. This will cause the sleep command to be zombied as well, since
the parent goes away.

If you run the container using the `--init` flag for `docker run` you will see that `docker-init` becomes PID 1,
and all zombies will be killed.
