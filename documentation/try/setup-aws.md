---
title: AWS Setup for Gather
permalink: documentation/try/setup-aws.html
description: Gather Documentation – Setting up AWS for Gather evaluation
---
# Set up AWS EC2 Instances for evaluating Aether and Gather
Starting up an AWS instance and configuring it for use with the Aether and Gather evals is very easy once you have an AWS account.  If you are totally new to AWS and would like to try it out, start with the [Amazon EC2 Users Guide for Linux Instances](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/concepts.html) and then follow the instructions below.

This guide will take you through the steps required to create and configure an EC2 instance that can be used to evaluate and use Gather and Aether in a **Non Production** environment.  This guide doesn't setup strong security and does not provide any data backup or protection.  **When the EC2 instance terminates, all of your data will be lost.**   

## Overview of the setup process
If you are already comfortable with configuring and running Amazon EC2 instances, just follow this list of steps and return to [Try Gather](/documentation/try/index#quick-test) or [Try Aether](https://aether.ehealthafrica.org/documentation/try/index.html#quick-test)
* Create an EC2 Ubuntu instance with at least 2 processors, 8GB RAM and 8GB Storage **t3.large**
* Configure your VPC to be accessable from the internet with these ports open: 22, 80, 8000, 8443, 5000
* Verify/Install git, Docker and Docker Compose. It helps if Docker can be [run as a non-root user](https://docs.docker.com/install/linux/linux-postinstall/)
* Use *Stop* instead of *Terminate* if you want to preserve data between sessions.

## Very detailed steps for people new to AWS
![AWS EC2 Launch](/images/aws-ec2-launch.png){: .scalable}
Log into your Amazon Web Services account and navigate to the EC2 Management Console.  Select an availability zone appropriate to your location. The screenshot shows that my zone is set to Frankfurt. Click **Launch Image** to create a new EC2 image.

Select **Ubuntu Server 16.04 LTS (HVM), SSD Volume Type** from the list of AMIs

![AWS EC2 Launch](/images/aws-ec2-step3.png){: .scalable}
On **Step 3: Configure Instance Details**, Accept all the defaults except for **Auto-assign Public IP** which should be set to **Enable**



