---
title: Gather – Cleaning Up
permalink: documentation/try/clean-up.html
description: Gather Documentation – Try it for yourself
---

# Cleaning Up

If you’d like to wipe all the data that you created during this walkthrough, this section goes through the necessary commands. These steps assume that you’re currently in the `aether-bootstrap` directory.

1. Wipe *CKAN* and *CKAN Consumer* data:

```
scripts/wipe_ckan.sh
```

2. Take down Aether

```
docker-compose -f ./docker-compose-connect.yml kill
docker-compose -f ./docker-compose-connect.yml down
```

3. Take down Gather

```
cd ..
docker-compose down
```

4. Delete all Gather/Aether data

```
sudo rm -R aether-bootstrap/.persistent_data
```

You will now be able to repeat the steps of this tutorial from a fresh starting point, should you wish to do so.




