#!/bin/bash
set -euo pipefail

# change the directory to where script is hosted
cd "$(dirname "$0")"

echo '▸ Installing dependencies...';

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
echo '  ▸ Checking yarn...'
if ! command -v yarn > /dev/null; then
  echo 'ERROR: please install yarn before continuing';
  exit 1;
fi

echo '▸ Finished installing dependencies.';
