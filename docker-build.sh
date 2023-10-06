#!/usr/bin/env bash
rm -fr dist
rm -fr node_modules
npm install
npm run build


LOCAL_IMAGE_NAME=prism/adc-white-paper
ECR_REPO=207675869076.dkr.ecr.us-east-1.amazonaws.com/adc-white-paper

aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 207675869076.dkr.ecr.us-east-1.amazonaws.com
docker build --platform=linux/amd64 -t $LOCAL_IMAGE_NAME .
docker tag $LOCAL_IMAGE_NAME $ECR_REPO
#docker push $ECR_REPO
