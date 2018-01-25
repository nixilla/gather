#!/usr/bin/env bash
set -e

export AWS_DEFAULT_REGION="eu-west-1"
COMMIT="${TRAVIS_COMMIT}"
BRANCH="${TRAVIS_BRANCH}"
IMAGE_REPO="387526361725.dkr.ecr.eu-west-1.amazonaws.com"

if [ "${BRANCH}" == "gather-on-aether" ]; then
  export APPS=( gather )
  export CLUSTER_NAME="ehealth-africa"
  export ENV="prod"
  export PREFIX="gather2"
fi


$(aws ecr get-login --region="${AWS_DEFAULT_REGION}" --no-include-email)

for PREFIX in "${PREFIX[@]}"
do
  for APP in "${APPS[@]}"
  do
    GATHER2_APP="${PREFIX}-${APP}"
    docker-compose build $APP
    # build nginx containers
    docker build -t "${IMAGE_REPO}/${GATHER2_APP}-nginx-${ENV}:latest" "gather2-${APP}/nginx"
    docker push "${IMAGE_REPO}/${GATHER2_APP}-nginx-${ENV}:latest"

    echo "Building Docker image ${IMAGE_REPO}/${GATHER2_APP}-${ENV}:${BRANCH}"
    docker tag $APP "${IMAGE_REPO}/${GATHER2_APP}-${ENV}:${BRANCH}"
    docker tag $APP "${IMAGE_REPO}/${GATHER2_APP}-${ENV}:${COMMIT}"
    docker tag $APP "${IMAGE_REPO}/${GATHER2_APP}-${ENV}:latest"

    echo "Pushing Docker image ${IMAGE_REPO}/${GATHER2_APP}-${ENV}:${BRANCH}"
    docker push "${IMAGE_REPO}/${GATHER2_APP}-${ENV}:${BRANCH}"
    docker push "${IMAGE_REPO}/${GATHER2_APP}-${ENV}:${COMMIT}"
    docker push "${IMAGE_REPO}/${GATHER2_APP}-${ENV}:latest"

    echo "Deploying ${APP} to ${ENV}"
    ecs deploy --timeout 600 $CLUSTER_NAME-$ENV $GATHER2_APP -i $APP "${IMAGE_REPO}/${GATHER2_APP}-${ENV}:${COMMIT}"
  done
done
