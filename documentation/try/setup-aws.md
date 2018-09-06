---
title: AWS Setup for Gather
permalink: documentation/try/setup-aws.html
description: Gather Documentation – Setting up AWS for Gather evaluation
---
Setting up 
Starting up an AWS instance and configuring it for use with the Gather eval is actually very easy once you have an Amazon account setup.  If you are totally new to AWS and would like to try it out, start with the [Amazon EC2 Users Guide for Linux Instances](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/concepts.html).

This guide will take you through the steps required to create and configure an EC2 instance that can be used to evaluate and use Gather and Aether in a **Non Production** environment.  This guide doesn't setup strong security and does not provide any data backup or protection.  **When the EC2 terminates, all of your data will be lost.**   Use *Stop* instead of *Terminate* if you want to preserve data between sessions.

![AWS EC2 Launch](/images/aws-ec2-launch.png){: .scalable}Log into your Amazon Web Services account and navigate to the EC2 Management Console.  Select an availability zone appropriate to your location. The screenshot shows that my zone is set to Frankfurt. Click **Launch Image** to create a new EC2 image.
Select **Ubuntu Server 16.04 LTS (HVM), SSD Volume Type** from the list of AMIs



