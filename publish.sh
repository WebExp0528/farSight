#!/bin/bash
set -e
#Note to newbies: Hashes are comments. 

#log docker into AWS ECR -- note in linux region is set inline, this is different from the way it is done in powershell.
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 538092687847.dkr.ecr.us-east-1.amazonaws.com
#build the Dockerfile in this folder
docker build -t far-sight-repo .

#prepare the new docker image for deployment to ECR 
docker tag far-sight-repo:latest 538092687847.dkr.ecr.us-east-1.amazonaws.com/far-sight-repo:latest

#deliver the docker image to ECR
docker push 538092687847.dkr.ecr.us-east-1.amazonaws.com/far-sight-repo:latest

#To trigger AWS EB to pull the docker image from ECR we must issue an environment update command.   Here we just set the version-label to the same value to trigger the update. 
#AWS CLI command to update the elastic beanstalk developer environment.
aws elasticbeanstalk update-environment --application-name FarSight --environment-name Farsight-develop --version-label farsight-source-14
