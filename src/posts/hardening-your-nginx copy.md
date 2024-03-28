---
title: A minimal modern deep learning setup
description: During my machine learning course I realized how critical it can be to have a stable high performant machine learning setup from the get go, so this is just an overview of how my workflow was in the end.
date: '2024-3-20'
categories:
  - ml
published: false
github: null
post_type: 3
---


# Overview

The main parts of this setup are 
- Keras 3 and Tensorflow 2.16 
- A Ubuntu GCP compute engine VM using an Nvidia GPU 
- Using poetry to manage the venv 

# GCP VM setup 
## login and basics
For this we are going to use GCP compute engine VMs specifically with GPUs starting off go to [here](https://cloud.google.com/products/compute?hl=en) and activate the compute engine API. 

> You might have to input your payment information but you will most likely get around 300$ in credits which equates to roughly 300h of VM usage, so assuming this is your first time using GCP you shouldn't be too worried. 

Once you setup everything you should be greeted with a screen similar to this. 

<figure style="display: flex; align-items: center; flex-direction: column;">
  <img src="https://i.imgur.com/6gF0oKh.png" alt="screen" style="width: 100%;">
</figure>

Its a bit overwhelming but the two most important things for now are **CREATE INSTANCE** and the *External IP* ( which you use to connect to the VM ). 

## quota check

Before we the instance - since we want to use GPUs - we have to check if our GPU quota (number of GPUs allowed) is >0, since for some reason an issue is that the default is sometimes 0. To check this 
1. Click on the search bar above **CREATE INSTANCE** 
2. Look for `All quotas`
3. In the field `Enter property name or value` look for `Name:GPUs (all regions)`
4. Click the little checkbox next to the name 
5. Click `EDIT QUOTAS` (top right of the screen)
6. Type 1 (if you want multiple GPUs then type more)
7. Hit `SUBMIT REQUEST`

Visually this looks something like this 

<figure style="display: flex; align-items: center; flex-direction: column;">
  <img src="https://i.imgur.com/a1lixKV.png" alt="screen" style="width: 100%;">
</figure>

> I've seen some varying response times here, they officially say 2 days but for small requests it seems to just be automated and often happen immediately. You will very likely get this approved, its only for more expensive GPUs where they decline you and you (I believe) have to appeal and talk to an actual service agent.

## instance creation

### the short way (CLI)

The short way would be via the gcloud CLI, the command for the instance I used is as follows 
```bash
gcloud compute instances create instance-20240318-102911 \
    --machine-type=g2-standard-4 \
    --zone=europe-west1-b \
    --boot-disk-size=100GB \
    --boot-disk-type=pd-balanced \
    --image=c0-deeplearning-common-gpu-v20240128-debian-11-py310 \
    --image-project=c0-deeplearning-common-gpu-v20240128-debian-11-py310 \
    --accelerator="type=nvidia-tesla-l4,count=1" \
    --maintenance-policy=TERMINATE \
    --restart-on-failure
```

### the long way (GUI)

Then you edit the following settings 

|                    | settings you should edit                                                                                                                                                                                      |
|--------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **region**         | Now GPUs are quite popular especially in US regions so trying to pick a higher tier GPU there is hard, I've had luck with certain EU regions but its more or less just hoping you pick an okay region. |
| **gpu**            | This is going to depend a lot on your workflow, Nvidia L4 should suffice for most moderately intense models, its not going to be the fastest but it gets the job done.                                 |
| **boot disk**      | Here you want to pick any VM with CUDA, later versions generally have patches that fix certain bugs so >12 is a good thing to go with unless you need older versions.                                  |
| **boot disk size** | This again depends mainly on the model and data you are working with, but anything between 50 - 100GB should be okay.                                                                                  |

Visually the most important parts look like this 

<figure style="display: flex; align-items: center; flex-direction: horizontal;">
  <img src="https://i.imgur.com/GeRxwVK.png" alt="screen" style="width: 50%; padding: 1em;">
  <img src="https://i.imgur.com/AyYAGIc.png" alt="screen" style="width: 50%; padding: 1em;">
</figure>

At the bottom you then press `CREATE` which spawns your VM instance back on the main screen.

## ssh keys

For brevity sake im going to assume you have `ssh` installed, after which the process here becomes mostly trivial.
- open whatever shell you use 
- type `ssh-keygen` 
- click through all the options (remember what your public key is called)
- type `cat ~/.ssh/yourpublickey` 
- copy the key to your clipboard 

Once you have the key in your clipboard its back to clicking through dashboards you want to 
- go back to your homepage 
- click on the instance name 
- click `EDIT` 
- scroll down to find the SSH key section 
- click `Add item` 
- paste the SSH key 
- click `Save`

Once again the visual overview of this is as follows 

<figure style="display: flex; align-items: center; flex-direction: column;">
  <img src="https://i.imgur.com/nLBe0Uv.png" alt="screen" style="width: 100%;">
</figure>

At this stage your VM is should be up and running 

# coding setup