---
title: A minimal modern deep learning cloud setup
description: During my machine learning course I realized how critical it can be to have a stable performant machine learning setup from the get-go, so this is just an overview of how my workflow was in the end.
date: '2024-3-20'
categories:
  - ml
published: true
github: null
post_type: 3
---


# Overview

This is a setup guide aimed at people new to GCP and a general cloud workflow with GPUs.

### Table of contents

---

# GCP VM setup 
## login and basics
For this we are going to use GCP compute engine VMs specifically with GPUs, starting off [here](https://cloud.google.com/products/compute?hl=en) and activate the compute engine API. 

> You might have to input your payment information but you will most likely get around 300$ in credits which equates to roughly 300 hours of VM usage, so assuming this is your first time using GCP you shouldn't be too worried. 

Once you set up everything you should be greeted with a screen similar to this. 

<figure style="display: flex; align-items: center; flex-direction: column;">
  <img src="https://i.imgur.com/6gF0oKh.png" alt="screen" style="width: 100%;">
</figure>

It's a bit overwhelming but the two most important things for now are **CREATE INSTANCE** and the *External IP* ( which you use to connect to the VM ). 

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

> I've seen some varying response times here, they officially say 2 days but for small requests it seems to just be automated and often happens immediately. You will very likely get this approved, it's only for more expensive GPUs where they decline you and you (I believe) have to appeal and talk to an actual service agent.

## instance creation

Then you edit the following settings 

|                    | settings you should edit                                                                                                                                                                                      |
|--------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **region**         | Now GPUs are quite popular especially in US regions so trying to pick a higher tier GPU there is hard, I've had luck with certain EU regions but it's more or less just hoping you pick an okay region. |
| **gpu**            | This is going to depend a lot on your workflow, Nvidia L4 should suffice for most moderately intense models, it's not going to be the fastest but it gets the job done.                                 |
| **boot disk**      | Here you want to pick any VM with CUDA, later versions generally have patches that fix certain bugs so >12 is a good thing to go with unless you need older versions.                                  |
| **boot disk size** | This again depends mainly on the model and data you are working with, but anything between 50 - 100GB should be okay.                                                                                  |

Visually the most important parts look like this 

<figure style="display: flex; align-items: center; flex-direction: horizontal;">
  <img src="https://i.imgur.com/GeRxwVK.png" alt="screen" style="width: 50%; padding: 1em;">
  <img src="https://i.imgur.com/AyYAGIc.png" alt="screen" style="width: 50%; padding: 1em;">
</figure>

At the bottom, you then press `CREATE` which spawns your VM instance back on the main screen.

## ssh keys

For brevity's sake I'm going to assume you have `ssh` installed, after which the process here becomes mostly trivial.
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

At this stage, your VM should be up and running 

---

# coding setup

## vscode

For the editor, we are going to use VSCode since it can attach to remote instances via the `Remote - SSH` extension. So first things first 
- Install [`Remote - SSH`](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-ssh)
- Press `CTRL + P` and type "Connect to Host" 
- This should bring up a menu, you want to likely configure SSH Hosts, since this makes the entire process alot easier 
- Clicking on this should bring up your SSH `config` files, you want to paste the following 

```
Host <external IP> 
  HostName <external IP>  
  IdentityFile ~\\.ssh\\<privkey>
  User <ssh-user>
```

Here 
- The external IP is the one on the main dashboard page 
- The Identity file is the private ssh key you generated using `ssh-keygen` 
- The user is the user account associated with that `SSH` key, if you are confused about what this is look at the ending string of the generated key 

Once you have this setup VSCode should work its magic and install the vscode server on the remote machine. 

## working GPU 

This can be one of the most annoying steps, first things first make sure to install the Nvidia driver, you *should* be prompted to do this, if not then run the following command 
```bash
sudo /opt/deeplearning/install-driver.sh
```
> If you're GPU is suddenly not being detected after you stop and start the VM, then re-running this command can fix that problem potentially

## poetry 

For dependency management, we are going to use poetry. 
> It doesn't matter to much what you use here, the rough idea is usually the same. I quite like poetry because I think it's always pretty simple and clean to use, but you can just as well use something like [conda](https://www.anaconda.com/download) which is a bit more popular for scientific computing.

Run the following commands 
```bash
curl -sSL https://install.python-poetry.org | python -
export PATH=$PATH:/home/<user>/.local/bin
```
Where 
- `<user>` is the user you are logged on with


## project setup 

To create the project simply run 

```bash
mkdir proj-name 
cd proj-name 
poetry init 
poetry add tensorflow[and-cuda]
```

## final test 

To then test to see if TensorFlow can detect the GPU run 
- `poetry shell` so we enter the venv 
- `python` 
- then paste the following 

```python
import os
os.environ["TF_CPP_MAX_VLOG_LEVEL"] = "3"
import tensorflow as tf
print(tf.config.experimental.list_physical_devices('GPU'))
```

If the last line looks like this 
```
...
[PhysicalDevice(name='/physical_device:GPU:0', device_type='GPU')]
``` 
Then everything is ready for you to start your regular ML workflow. If not then you might have to do some debugging.

## GitHub actions 

If you are working with a group of people a source of annoying merge conflicts can be notebooks that don't have all the cell outputs cleared, luckily someone already thought of this as a potential issue and created a GitHub actions workflow that fails if notebook outputs aren't cleared, so a good strategy is. 
- Add a branch protection rule to `main` 
- Run `mkdir -p .github/workflows`
- Create the following workflow in the folder `.github/workflows` 
```yml
name: Lint Jupyter Notebooks

on:
  push:
    paths:
      - '**.ipynb'
  pull_request:
    paths:
      - '**.ipynb'

jobs:
  lint-notebooks:
    runs-on: ubuntu-latest
    steps:
      - name: Check out code
        uses: actions/checkout@v2
      
      - name: Ensure Clean Jupyter Notebooks
        uses: ResearchSoftwareActions/EnsureCleanNotebooksAction@1.1
```
- Enforce this as a status check for PRs

This forces any contributor to have clear their notebook cells and avoids annoying merge conflicts. 

            

---
# Final Notes 

- Remember to stop your VM if you aren't using it, this essentially just shuts things down, it does not affect your drive in any way
- An acknowledgment to [a friend](https://github.com/RedKinda) has to be made for helping me debug a bunch of issues 
- If you want to see an example of this type of setup check out [this project](https://github.com/KaiErikNiermann/vu-ml-project)

---

# Debugging 

Things can sometimes go wrong, here are some general debugging tips 
- remember `sudo /opt/deeplearning/install-driver.sh` in case the GPU is suddenly not being detected 
- `os.environ["TF_CPP_MAX_VLOG_LEVEL"] = "3"` dumps a bunch of debug information about what tensorflow does when it's being imported, if at any point something fails it should show up here, the most important thing happening here is that TensorFlow is loading all the cuda related stuff, for this it uses `$LD_LIBRARY_PATH` 
- check `$LD_LIBRARY_PATH`, `echo $LD_LIBRARY_PATH` should show something like this 
- the command `nvidia-smi` is useful for seeing if the GPU is being detected by the system in general, if you want to monitor your GPU during training you can do `watch -n0.1 nvidia-smi` which is nice to have open in a second terminal

```
/usr/local/cuda/lib64:/usr/local/nccl2/lib:/usr/local/cuda/extras/CUPTI/lib64
```

