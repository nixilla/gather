---
title: Gather - Try It
permalink: documentation/try/index.html
---

# Try Gather For Yourself

The best way to evaluate Gather is to take it for a test drive.  This series of self guided demo's will take you through installation, setting up a simple survey and then sending that data to a CKAN data portal.  

### Prerequisites
These setup instructions assume that you are a System's Administrator, Developer or DevOps type person with some familiarity with github and docker.  If this is not you, maybe you can borrow someone like this to help with the prerequisites and get your machine configured properly.  Once your machine is set up and configured with github, docker, and python, the rest is just following command line instructions.

You will need a computer running Linux, Mac OSX or a cloud based Linux VM (such as AWS) with 8MB of RAM.  These instructions have been tested on Ubuntu 16.04.x (we have seen issues with 14.x VMs) and Mac 10.13.x 

- GitHub
 - git must be installed and available
 - SSH keys set up for command line access - [https://help.github.com/articles/connecting-to-github-with-ssh/](https://help.github.com/articles/connecting-to-github-with-ssh/)
- Docker
    - Docker Compose installed setup with at least 4GB limit
- Python
    - Python 3 
    - Mac users - As of Python 3.6, you must have set up your trust certificates, usually at install.  Otherwise, you will get this error when running the generate script:  
 `ERROR: urllib.error.URLError: <urlopen error [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed`  
 FIX: There is info in the installer readMe file and here: [http://www.cdotson.com/2017/01/sslerror-with-python-3-6-x-on-macos-sierra/](http://www.cdotson.com/2017/01/sslerror-with-python-3-6-x-on-macos-sierra/)
    - pipenv (python enviroment and package manager) installed - http://pipenv.readthedocs.io/en/latest/
    - The following ports should be available on your machine:  
3000, 5601, 5984, 8000, 8080, 8443, 8666, 9000, 9200, 9300, 9443 & 9600

You will also need to register some domains for local resolution on your computer. This means editing your hosts file. On Mac/Linux this is at `/etc/hosts`; on Windows it’s at `...`. Add this line to the bottom:

`127.0.0.1    localhost odk.aether.local sync.aether.local ui.aether.local kernel.aether.local gather.local`

### You are now ready to try some demos

<< It would be great if we had a simple git project that would test git, docker and python without having to wait until they try a dome to find config issues. >>


[Demo 1 - Installation](demo_install)


