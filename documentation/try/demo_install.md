---
title: Gather - Demo 1 Setting up Gather
permalink: documentation/try/demo_install.html
---

# The Gather Environment
Gather actually consists of several different servers and services that run in their own virtual network environment.  More specifically, it utilizes container-based virtualization, which allows multiple isolated systems, called containers, to run on a single host and access a single kernel.  The container we use is Docker and we use Docker Compose to define and script deployment configurations.  In production, Gather is deployed and maintained using a DevOps model that takes advantage of this technology.

For this demo, you will not need to know much about containers and docker although a basic understanding is helpful.  More information can be found on the [Docker website](https://www.docker.com/what-docker) if you are curious.

In order to follow this run-through, you will need to have your met the prerequisites defined in the [previous section](index)

## Setup
We have created a GitHub project to help you get started.  It is contains the instructions required for docker to download and install the components that make up the Gather server.  The first time this is run, it will take a while to download all the artifacts to you machine.  Those artifacts are cashed locally and will be available the next time you run Gather so the long startup only happens once.

Begin by cloning this repository to your computer:

`git clone git@github.com:eHealthAfrica/aether-ckan-consumer.git`

Navigate to aether-ckan-consumer/example (all scripts should be run from this directory, not from example/scripts)

`cd example`

Initialize the Aether Bootstrap repository

 `git submodule update --init --recursive`

...

