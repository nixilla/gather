---
title: Gather - Demo 1 Installation
permalink: documentation/try/demo_install.html
---

# The Gather Environment
Gather runs as a set of containerized 


In order to follow this run-through, you will need to have your met the prerequisites defined in the previous [section](index)

We have created a GitHub project to help you get started.  It is contains the instructions required for docker to download and install the components that make up the Gather server.  

The easiest way to start building an Aether-based solution is to use _Aether Bootstrap_. Begin by cloning this repository to your computer:

```
git clone git@github.com:eHealthAfrica/aether-bootstrap.git
cd aether-bootstrap
```

Now you just need to tell Docker to download the images and start them up:

```
docker-compose up
```

Once the console output has stopped, you should be able to access the Aether UI in your browser. Use these credentials to log in:

- _Username:_ **admin**
- _Password:_ **adminadmin**

Now let’s [start creating our first Aether-based solution](walkthrough-core).
