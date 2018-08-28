---
title: Gather - Try It
permalink: documentation/try/index.html
description: Gather Documentation – Try it for yourself
---

# Try Gather For Yourself

The best way to evaluate Gather is to take it for a test drive.  This series of self guided demos will take you through installation, setting up a simple survey and then sending that data to a CKAN data portal.  

## Prerequisites
These setup instructions assume that you are a System's Administrator, Developer or DevOps type person with some familiarity with github and docker.  If this is not you, maybe you can borrow someone like this to help with the prerequisites and get your machine configured properly.  Once your machine is set up and configured with github and docker, the rest is just following command line instructions.

You will need a computer running Linux, Mac OSX or a cloud based Linux VM (such as AWS) with 8MB of RAM.  These instructions have been tested on Ubuntu 16.04.x (we have seen issues with 14.x VMs) and Mac 10.13.x 

- GitHub
    - [git](https://git-scm.com/) must be installed and available
- Docker
    - [Docker Compose](https://docs.docker.com/compose/) installed setup with at least 3GB limit
- The following ports should be available on your machine:  
80, 8000, 8004, 8443

You will also need to register some domains for local resolution on your computer. This means editing your hosts file. On Mac/Linux this is at `/etc/hosts`; Modify the line that starts with `127.0.0.1` to include:

```
127.0.0.1    localhost odk.aether.local ui.aether.local kernel.aether.local gather.local
```

Finally, if you want to do some data collection you will need an Android phone or tablet with [ODK Collect](https://play.google.com/store/apps/details?id=org.odk.collect.android&hl=en_US) installed.

## Eval using Amazon Web Services
Using AWS is a great way to evaluate Gather without having to install anything on your own computer.  From start to finish, it only takes about an hour to spin up an EC2 instance, configure it and try the following exercises.  To get started, try the [AWS setup instructions.](setup-aws) It only costs about $3.00 to spin up an EC2 instance and run it for 12 hours.

## Quick test

At the commandline type:

```docker-compose --version```

and verify version 1.20 or greater. Then try:

```git --version```

and verify version 2.10 or greater.

**You are now ready to set up Gather**

<div style="margin-top: 2rem; text-align: center"><a href="setup">Next Steps: Set Up and Deploy Gather</a></div>
