#!/usr/bin/env bash
set -e

export AWS_DEFAULT_REGION="eu-west-1"
export BRANCH="${TRAVIS_BRANCH}"
export DOCKER_REPO="387526361725.dkr.ecr.eu-west-1.amazonaws.com"
export APP="gather"

$(aws ecr get-login --no-include-email)

if [[ -n $TRAVIS_TAG ]]; then
  DOCKER_TAG=`cat ../VERSION`
else
  DOCKER_TAG=$TRAVIS_BRANCH
fi

# Build and push docker
docker-compose build $APP
docker tag $APP ${DOCKER_REPO}/${APP}:${DOCKER_TAG}
docker push ${DOCKER_REPO}/${APP}:${DOCKER_TAG}

# # Publish Helm package
# docker run -a STDOUT -a STDERR \
#  -e BRANCH=$TRAVIS_BRANCH -e RELEASE=$RELEASE \
#  -e AWS_DEFAULT_REGION=$AWS_DEFAULT_REGION \
#  -e APP=$APP \
#  -e AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID \
#  -e AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY \
#  ehealthafrica/deployer \
#  publish_helm
