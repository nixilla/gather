---
title: Demo 3 Sending data through to CKAN
permalink: documentation/try/ckan.html
---

# Sending Data to a CKAN Data Portal

In this demo we will add the components necessary to spin up a new CKAN instance and have our collected published to it in real time. To get this working we need to setup the publishing functionality in Aether (“Aether Connect”), then install and configure CKAN.

## Setting Up CKAN

We’re going to use a script to make it easier to install and configure CKAN. This will download Docker images for CKAN and perform the necessary configuration. It will then prompt you for a password for the `admin` user. In your terminal, navigate to the `aether-bootstrap` directory inside your cloned copy of `gather-deploy`, and then run the script:

```
cd aether-boostrap
scripts/setup_ckan.sh
```

Once this has completed, open a new browser window, go to [http://localhost:5000](http://localhost:5000) and login with username `admin` and the password you just entered during the configuration stage.

Now go to [http://localhost:5000/organization](http://localhost:5000/organization) and add a new organization:

![Adding an Organization in CKAN](/images/ckan-organizations.png)

Name it `eHADemo` and click **Create Organisation**.

Now we need 

## Setting Up Aether Connect

To start Aether Connect, run the following `docker-compose` command:

```
docker-compose -f docker-compose-connect.yml up -d
```

This will start the distributed streaming platform [Kafka](https://kafka.apache.org/), Zookeeper (which manages Kafka) and the Aether Producer (which handles communication between Aether and Kafka). 

Aether Connect can publish data to a variety of destinations. For each destination, it requires a ”Consumer”. Since we want to publish our data to CKAN, we will use the *CKAN Consumer*.

## Setting Up the CKAN Consumer

In order to communicate with CKAN, the CKAN Consumer needs an API Key. This can be found in the CKAN User page at [http://localhost:5000/user/admin](http://localhost:5000/user/admin):

![Getting the CKAN API Key](/images/ckan-api-key.png)

Now you need to edit the CKAN Consumer config file. It’s in the `aether-connect` directory, under `ckan-consumer/config/config.json`. Open it in your favourite text editor. If, for example, you like to use `Vi`, you should type

```
vi ./ckan-consumer/config/config.json
```

The config file is JSON. We need to set the API Key field. Copy the API key from the CKAN screen, and paste it into the config file as shown:

```
    ...
    "ckan_servers": [
        {
            "title": "CKAN Demo portal",
            "url": "http://ckan:5000",
            "api_key": "ed6e1671-5919-42cc-bf19-27fb47d4fc22",
            "autoconfig_datasets" : true,
            "autoconfig_owner_org": "ehademo"
        }
    ...
```

## View the Data in CKAN

Now we can start the CKAN Consumer:

```
scripts/run_ckan_consumer.sh
```

Open the datasets screen in CKAN at [http://localhost:5000/dataset/](http://localhost:5000/dataset/). You should see something like this (the name of your dataset will be slightly different):

![Our dataset in CKAN](/images/ckan-datasets.png)

Click on the dataset. You should now see the main screen for our new dataset. Click again on the dataset name as shown here:

![The dataset link](/images/ckan-dataset-link.png)

Now click on the **Manage** button, and in the next page go to the **Views** tab. Click the **New view** button and select **Data Explorer**. Give the view a name and save it.

Now if you go back to the main screen for our dataset, press the **Explore** button and select **Preview**, you will see the data you submitted shown in a table:

![The dataset view in CKAN](/images/ckan-dataset-view.png)

Congratulations - we are now publishing the collected data to CKAN!

If you now fill in the `example-microcensus` form again in ODK Collect and submit it to Gather, the data will be automatically published to CKAN.

## Recap 

In this section we created configured and span up a local CKAN instance. We then configured and deployed Aether Connect, the data publishing half of the Aether platform. We then viewed in CKAN the data that we collected in the previous section.

<div style="margin-top: 2rem; text-align: center"><a href="ckan">Final Steps: Cleaning Up</a></div>
