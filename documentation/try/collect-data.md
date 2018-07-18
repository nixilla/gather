---
title: Demo 2 Collecting Data
permalink: documentation/try/collect-data.html
---

# Gathering Data

Now that you have an operational Gather server, you can start collecting data. Let’s go ahead and create a survey so that we can do that.

## Creating a Surveyor

The first thing we need to do is create a surveyor. This is a set of credentials (username and password) that will be configured in ODK Collect. In real-world data collection, you would probably set up several sets of credentials for all of your data collectors (or you might just set up one and share it between all the collectors - it’s up to you).

Click on **SURVEYORS** in the top bar, and then click the **NEW SURVEYOR** button. Enter a username and password (don’t forget the password!) and click **SAVE SURVEYOR**.

## Creating a Survey

Now we can create a survey. Click **SURVEYS** in the top bar, then hit the **NEW SURVEY** button. We’re going to use a simple microcensus style form for our example survey - you can find an XLS file under `aether-bootstrap/assets/forms/aether-walkthrough-microcensus.xls`.

Provide a name for the survey, select your surveyor from the list and click **ADD** to move it to the right hand box, then upload the aforementioned XLS file by clicking on **ADD XFORM / XLSFORM FILES**.

It should now look something like this:

![Create a new survey](/images/gather-create-survey.png)

Click on **SAVE SURVEY**, and we’re done. Now let’s collect some data.

## Collecting Data

We’re going need to tell ODK Collect how to connect to our local Gather instance so that it can download our microcensus form, and then submit the data once we’ve completed said form. The information it needs is (a) the IP address of your computer, and (b) the username and password of the surveyor we created a few minutes ago. To find out the IP address of your computer, type the following command:

```
if config | grep 192
```

You should get some output that looks like this:

```
inet 192.168.178.163 netmask 0xffffff00 broadcast 192.168.178.255
```

In this particular example, `192.168.178.163` is my computer’s IP address.

*Note that this command assumes that you are on a standard local network. If you don’t get output that looks like the above, seek professional assistance.*

Fire up _ODK Collect_ on your Android device. Tap the three dots in the top right hand corner:

![ODK Collect settings menu](/images/gather-collect-dots.png)

Tap **General Settings**, then in the next screen tap **Server**. For the **URL** you need to enter the following:

```
http://<your ip address>:8443
```

*”8443” is the port number that Gather is listening on for connections from ODK Collect. The ODK protocol requires the use of port number 443 (the default port for HTTPS, which is preferable in production but not easy to set up locally) or 8443*

Under **Username** and **Password** you need to set the credentials that you set for the surveyor. Once this is done, hit your device’s back button twice to get to the ODK Collect main screen, and then tap **Get Blank Form**. You may be prompted again for the username and password; if so, just enter it again and tap OK.

You should now see our form listed. Tap the checkbox on the right, and then tap **Get Selected**. Once it’s downloaded and you’re back on the main screen again, tap **Fill Blank Form**, and select the entry in the list called `example-microcensus`.

Go ahead and fill in the form. Once you’re done and you’re back at the main screen, tap **Send Finalized Form**, tap the checkbox on the right of the form you just filled, and tap **Send Selected**.

## Reviewing Submitted Data

Back on your computer, we should now be able to see the submitted data. Click on **Surveys** in the top bar (or reload the page if you’re already there). You should now see that there is one submission in the Microcensus survey. 

![Gather Surveys screen with one submission](/images/gather-surveys-screen.png)

Click on the survey box and you will see the data you just submitted displayed in a table.

Congratulations - we just collected some data! 

## Recap 

In this section we created a survey in Gather and uploaded an XLSForm. We then used ODK Collect to download the form, complete it, and submit the data back to Gather. We then reviewed this data in tabulated form within Gather.

<div style="margin-top: 2rem; text-align: center"><a href="ckan">Next Steps: Publish Data to CKAN</a></div>
