#!/bin/sh

set -e

pnpm run build

cd ..

npm publish --access public
cd -

echo "Publish completed"
