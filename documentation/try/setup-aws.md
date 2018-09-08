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
* Configure your VPC to be accessible from the internet with these ports open: 22, 80, 8000, 8443 and 5000
* Verify/Install git, Docker and Docker Compose. It helps if Docker can be [run as a non-root user](https://docs.docker.com/install/linux/linux-postinstall/)
* Use *Stop* instead of *Terminate* if you want to preserve data between sessions.

## Very detailed steps for people new to AWS
[ ![AWS EC2 Launch](/images/aws-ec2-launch.png)](/images/aws-ec2-launch.png){: .scalable}Log into your Amazon Web Services account and navigate to the EC2 Management Console.  Select an availability zone appropriate to your location. The screenshot shows that my zone is set to Frankfurt. 

Click **Launch Image** to create a new EC2 image.

<p style="clear: both;"/>

[![AWS EC2 AMI](/images/aws-ec2-step1.png)](/images/aws-ec2-step1.png){: .scalable}**Step 1: Choose an AMI -** Select **Ubuntu Server 16.04 LTS (HVM), SSD Volume Type** from the list of AMIs

<p style="clear: both;"/>

[![AWS EC2 Instance Type](/images/aws-ec2-step2.png)](/images/aws-ec2-step2.png){: .scalable}**Step 2: Choose an Instance Type -** Select **Ubuntu Server 16.04 LTS (HVM), SSD Volume Type** from the list of AMIs

<p style="clear: both;"/>

[![AWS EC2 Instance Details](/images/aws-ec2-step3.png)](/images/aws-ec2-step3.png){: .scalable}**Step 3: Configure Instance Details -** Accept all the defaults except for **Auto-assign Public IP** which should be set to **Enable**

<p style="clear: both;"/>

[![AWS EC2 Add Storage](/images/aws-ec2-step4.png)](/images/aws-ec2-step4.png){: .scalable}**Step 4: Add Storage -** The defaults should be fine for just the demo.  If you plan to test with lots of other data, then increase **Size (GiB) -** from 8 GiB to something more appropriate for your use case 

<p style="clear: both;"/>

[![AWS EC2 Add Tags](/images/aws-ec2-step5.png)](/images/aws-ec2-step5.png){: .scalable}**Step 5: Add Tags -** No tags are required

<p style="clear: both;"/>

[![AWS EC2 Ports](/images/aws-ec2-step6.png)](/images/aws-ec2-step6.png){: .scalable}**Step 6: Configure Security Group -** Open up the the following ports so that you can access them from your local computer. Ports 22, 80, 8000, 8443 and 5000.  The screenshot on the left has more detail about each port.

<p style="clear: both;"/>

[![AWS EC2 Ports](/images/aws-ec2-step7-sm.png)](/images/aws-ec2-step7.png){: .scalable}**Step 7: Review Instance Launch -** Verify your launch settings with the screenshot on the left. When you feel good about your settings, press **Launch**.

<p style="clear: both;"/>

[![AWS EC2 Ports](/images/aws-ec2-KeyPair.png)](/images/aws-ec2-KeyPair.png){: .scalable}**Select your key pair -** Amazon EC2 uses public–key cryptography to encrypt and decrypt login information. In order for you to log in to your instance, you must have an [Amazon EC2 cryptographic key pair](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-key-pairs.html) specified for your instance and stored locally on your client machine.  If you already have a key pair that you use for AWS, select it here and go to the next step.  

If you don't have a key pair, select **Create a new key pair**, give it a name and press **Download Key Pair**.  The private key file is automatically downloaded by your browser. The base file name is the name you specified as the name of your key pair, and the file name extension is .pem. Save the private key file in a safe place.  I use .ssh in my home folder. If you will use an SSH client on a Mac or Linux computer to connect to your instance, use the following command to set the permissions of your private key file so that only you can read it. `chmod 400 my-key-pair.pem`

<p style="clear: both;"/>

[![AWS EC2 Ports](/images/aws-ec2-console.png)](/images/aws-ec2-console.png){: .scalable}**Wait for instance to be ready -** It will take a few minutes for your instance to initialize and be ready for service.  Bring up your EC2 console and wait for the **Status Checks** to be complete and for **Instance State** to change to **running**.  You will need to note the **IPv4 Public IP Address** displayed on the console.

<p style="clear: both;"/>

[![AWS EC2 Ports](/images/aws-ec2-connect.png)](/images/aws-ec2-connect.png){: .scalable}**Connection info -** After your instance is ready, select it in your EC2 console and press the **Actions** button.  In the drop down, select **Connect** and you will be presented with a popup that has all the connect info for your instance.  You will use this info at the commandline in order to connect to your instance via [SSH](https://en.wikipedia.org/wiki/Secure_Shell).  

<p style="clear: both;"/>

[![AWS EC2 Ports](/images/aws-ec2-ssh.png)](/images/aws-ec2-ssh.png){: .scalable}**Connect to your instance -** Bring up a commandline and enter `ssh -i "~/.ssh/Test_Keys.pem" ubuntu@18.184.160.216` where **~/.ssh/Test_Keys.pem** is replaced by the location of your .pem file and **18.184.160.216** is replaced by the IP address of your instance.

<p style="clear: both;"/>


