#!/bin/bash
set -e
set -x


################################################################################
# install packages
################################################################################

# Add postgres apt repo to get more recent postgres versions
echo 'deb http://apt.postgresql.org/pub/repos/apt/ jessie-pgdg main' > /etc/apt/sources.list.d/pgdg.list
wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | apt-key add -

apt-get update -qq
cat /tmp/apt-packages.txt | xargs apt-get -qq --yes --force-yes install


################################################################################
# cleaning
################################################################################

apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*


################################################################################
# create NODE symbolic links
################################################################################

ln -s /usr/local/bin/nodejs                            /usr/local/bin/node
ln -s /usr/local/lib/node_modules/npm/bin/npm-cli.js   /usr/local/bin/npm
ln -s /usr/local/lib/node_modules/npm/bin/npx-cli.js   /usr/local/bin/npx
