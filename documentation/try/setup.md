---
title: Gather - Demo 1 Setting up Gather
permalink: documentation/try/setup.html
---

# The Gather Environment
Gather actually consists of several different servers and services that run in their own virtual network environment.  More specifically, it utilizes container-based virtualization, which allows multiple isolated systems, called containers, to run on a single host and access a single kernel.  The container we use is [Docker](https://www.docker.com/) and we use [Docker Compose](https://docs.docker.com/compose/) to define and script deployment configurations (this is known as “orchestration”).  In production, Gather is deployed and maintained using [Kubernetes](https://kubernetes.io/), a more robust system that takes advantage of this technology.   

For this demo, you will not need to know much about containers or Docker, although a basic understanding is helpful.  More information can be found on the [Docker website](https://www.docker.com/what-docker) if you’re curious.

In order to follow this run-through, you will need to have your met the prerequisites defined in the [previous section](index)

## Setup
We’ve created a GitHub project to help you get started.  It contains the instructions that Docker needs in order to download and install the components that make up the Gather server.  

Begin by cloning this repository to your computer:

```
git clone --recurse-submodules git@github.com:eHealthAfrica/gather-deploy.git
cd gather-deploy
```

The `--recurse-submodules` option is necessary because Gather Deploy uses another repository called [Aether Bootstrap](https://github.com/eHealthAfrica/aether-bootstrap) to install and configure Aether, the underlying platform on which Gather is built.

To start all the servers and services, just type

```
docker-compose up
```

The first time this is run, it will take a while to download all the artifacts to your machine.  Those artifacts are cached locally and will be available the next time you run Gather so the long startup only happens once.

Once information stops scrolling across your terminal, you should see something like this:

```
gather_1  | *** uWSGI is running in multiple interpreter mode ***
gather_1  | spawned uWSGI master process (pid: 25)
gather_1  | spawned uWSGI worker 1 (pid: 27, cores: 1)
gather_1  | spawned uWSGI worker 2 (pid: 28, cores: 1)
gather_1  | spawned uWSGI worker 3 (pid: 29, cores: 1)
gather_1  | spawned uWSGI worker 4 (pid: 30, cores: 1)
gather_1  | spawned uWSGI http 1 (pid: 31)
```

This means that Gather is now running. You can confirm this by going to [gather.local](http://gather.local) in your browser. You should see the Gather login screen:

![Gather login screen](/images/gather-login.png)

*Tip: If you see an **Welcome to nginx!** screen instead of the one shown above, just reload the page - that means you were too fast!*

You can login with the following credentials:

|Username|**admin**|
|Password|**adminadmin**|

You should now see the Gather main screen:

![Gather main screen](/images/gather-first-screen.png)

[Next Steps: Collecting Data](collect-data)
