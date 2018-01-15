#!/usr/bin/env bash
set -e

containers=( core odk-importer couchdb-sync ui )

DC_TEST="docker-compose -f docker-compose-test.yml"

docker-compose kill
$DC_TEST kill

# create the common module
echo "_____________________________________________ Building gather2.common module"
$DC_TEST build common-test
$DC_TEST run   common-test build
$DC_TEST kill
PCK_FILE=gather2.common-0.0.0-py2.py3-none-any.whl

for container in "${containers[@]}"
do
  :

  # copy the new common module into the container dependencies
  echo "_____________________________________________ Copying gather2.common module in $container"
  cp -r ./gather2-common/dist/$PCK_FILE ./gather2-$container/conf/pip/dependencies/

  # replace `requirements.txt` file with `primary-requirements.txt` file
  cp ./gather2-$container/conf/pip/primary-requirements.txt ./gather2-$container/conf/pip/requirements.txt

  echo "_____________________________________________ Building $container"
  # rebuild container
  docker-compose build $container

  # upgrade pip dependencies
  echo "_____________________________________________ Updating $container"
  docker-compose run $container pip_freeze
  echo "_____________________________________________ $container updated!"
done

docker-compose kill
