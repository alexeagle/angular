#!/usr/bin/env bash

set -e -o pipefail +b

cd `dirname $0`

if [ ! -d "rxjs/dist/es6" ]; then
  echo "You must run prepare_tests.sh before running tests"
  exit 1
fi

yarn=$(npm bin)/yarn

for testDir in $(ls | grep -v rxjs | grep -v node_modules) ; do
  [[ -d "$testDir" ]] || continue
  echo "#################################"
  echo "Running test integration/$testDir"
  echo "#################################"
  (
    cd $testDir
    # Workaround for https://github.com/yarnpkg/yarn/issues/2256
    rm -f yarn.lock
    $yarn
    $yarn link @angular/{core,common,compiler{,-cli},platform-{browser,browser-dynamic,server},http,router,upgrade,tsc-wrapped}
    $yarn test || exit 1
  )
done
