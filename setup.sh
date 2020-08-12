#!/bin/bash
set -euo pipefail

# change the directory to where script is hosted
cd "$(dirname "$0")"

echo '▸ Installing dependencies...';

echo '  ▸ Checking MongoDB...'
if ! command -v mongod > /dev/null; then
  echo 'ERROR: please install mongodb before continuing';
  exit 1;
fi

if ! command -v mongo > /dev/null; then
  echo 'ERROR: please install mongodb before continuing';
  exit 1;
fi

echo '  ▸ Checking Redis...'
if ! command -v redis-server > /dev/null; then
  echo 'ERROR: please install redis before continuing';
  exit 1;
fi

# verify docker
echo '  ▸ Checking Docker...'
if ! command -v docker > /dev/null; then
  echo 'ERROR: please install Docker before continuing';
  exit 1;
fi

# verify node
echo '  ▸ Checking Node.js...'
if ! command -v node > /dev/null; then
  echo 'ERROR: please install node.js before continuing';
  exit 1;
fi

# verify yarn
echo '  ▸ Checking Yarn...'
if ! command -v yarn > /dev/null; then
  echo 'ERROR: please install yarn before continuing';
  exit 1;
fi

echo '▸ Finished installing dependencies.';
