---
title: Gather - Setting up Gather
permalink: documentation/try/setup.html
description: Gather Documentation – Try it for yourself
---

# The Gather Environment
Gather actually consists of several different servers and services that run in their own virtual network environment.  More specifically, it utilizes container-based virtualization, which allows multiple isolated systems, called containers, to run on a single host and access a single kernel.  The container we use is [Docker](https://www.docker.com/) and we use [Docker Compose](https://docs.docker.com/compose/) to define and script deployment configurations (this is known as “orchestration”).  In production, Gather is deployed and maintained using [Kubernetes](https://kubernetes.io/), a more robust system that takes advantage of this technology.   

For this demo, you will not need to know much about containers or Docker, although a basic understanding is helpful.  More information can be found on the [Docker website](https://www.docker.com/what-docker) if you’re curious.

In order to follow this run-through, you will need to have your met the prerequisites defined in the [previous section](index)

## Setup
We’ve created a helper repository on GitHub to help you get started.  It contains the instructions that Docker needs in order to download and install the components that make up the Gather server.  

Begin by cloning this repository to your computer:

```
git clone --recurse-submodules git@github.com:eHealthAfrica/gather-deploy.git
cd gather-deploy
```

The `--recurse-submodules` option is necessary because Gather Deploy uses another repository called [Aether Bootstrap](https://github.com/eHealthAfrica/aether-bootstrap) to install and configure Aether, the underlying platform on which Gather is built.

If you are starting Aether for the first time, you will need to create some docker resources (networks and volumes) and generate credentials for all applications:

```
./scripts/initialise_docker_environment.sh
```

To start all the servers and services, just type

```
docker-compose up -d
```

*The `-d` at the end of that command means that the Docker containers will run in the background. If you’d like to see the logging and debug output of the containers, skip the `-d` on this and all the other `docker-compose` commands. This will mean that you will need multiple terminal windows to run all the separate parts.*

The first time this is run, it will take a while to download all the artifacts to your machine.  Those artifacts are cached locally and will be available the next time you run Gather so the long startup only happens once.

Give Gather a minute or so to start up, and then go to [gather.local](http://gather.local) in your browser. Once Gather is ready, you should see the login screen:

![Gather login screen](/images/gather-login.png)

*Tip: If you see an **Welcome to nginx!** screen instead of the one shown above, just reload the page - that means you were too fast!*

You can login with the following credentials:

|Username|**admin**|
|Password|**adminadmin**|

You should now see the Gather main screen:

![Gather main screen](/images/gather-first-screen.png)

## Recap

In this section cloned the `gather-deploy` helper repository and then span up a Gather instance by running a single command.

In the next section, we’re going to collect some data using the ODK Collect Android application.

<div style="margin-top: 2rem; text-align: center"><a href="collect-data">Next Steps: Collecting Data</a></div>
