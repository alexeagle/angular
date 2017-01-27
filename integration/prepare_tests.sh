#!/usr/bin/env bash
# This script prepares for running integration tests. It should be run once.

set -e -o pipefail

cd `dirname $0`

# Tell yarn how to link the @angular packages later.
# see https://yarnpkg.com/en/docs/cli/link
yarn=$(npm bin)/yarn
for pkg in {core,common,compiler{,-cli},platform-{browser,browser-dynamic,server},http,router,upgrade}; do
  (
    cd ../dist/packages-dist-es2015/$pkg
    $yarn link
  )
done
(
  cd ../dist/tools/@angular/tsc-wrapped
  $yarn link
)

# npm install sets the permission, but yarn does not
chmod u+x ../dist/packages-dist-es2015/compiler-cli/src/main.js

# Build rxjs from source, with an ES6 target, and with tsickle turned on.
# We need to do this until we work with the RxJS team to get a distribution that works
# with Closure Compiler.
# Note that in nodejs, we still run the standard RxJS distribution. This one is only
# used for the bundle that targets a browser runtime.
# TODO(alexeagle): discuss with Jay Phelps once we have a recommendation

rm -rf rxjs
git clone https://github.com/ReactiveX/rxjs.git --depth=200
git -C rxjs/ checkout 5.0.3
cp rxjs.tsconfig.json rxjs/
TSC="node --max-old-space-size=3000 ../dist/tools/@angular/tsc-wrapped/src/main"
$TSC -p rxjs/rxjs.tsconfig.json
