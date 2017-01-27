#!/usr/bin/env bash
# This script prepares for running integration tests. It should be run once.

set -e -o pipefail

cd `dirname $0`
readonly yarn=$(npm bin)/yarn
readonly dist=../dist/packages-dist-es2015

# Tell yarn how to link the @angular packages later.
# see https://yarnpkg.com/en/docs/cli/link
# Clean up any existing links (they are globally registered in ~/.config/yarn/link)
for pkg in {core,common,compiler{,-cli},platform-{browser,browser-dynamic,server},http,router,upgrade}; do
  ( cd $dist/$pkg; $yarn unlink 2>/dev/null || true )
done
( cd ../dist/tools/@angular/tsc-wrapped; $yarn unlink || true )

# To make relative imports between them work, they must be linked following the dependency graph
( cd $dist/core; $yarn link )
( cd $dist/common; $yarn link @angular/core; $yarn link )
( cd $dist/compiler; $yarn link @angular/core; $yarn link )
( cd $dist/platform-browser; $yarn link @angular/{core,common}; $yarn link )
( cd $dist/router; $yarn link @angular/{core,common,platform-browser}; $yarn link )
( cd ../dist/tools/@angular/tsc-wrapped; $yarn link )
( cd $dist/compiler-cli; $yarn link @angular/{compiler,core,tsc-wrapped}; $yarn link )
( cd $dist/http; $yarn link @angular/{core,platform-browser}; $yarn link )
( cd $dist/platform-server; $yarn link @angular/{core,common,platform-browser}; $yarn link )
( cd $dist/platform-browser-dynamic; $yarn link @angular/{core,common,platform-browser}; $yarn link )
( cd $dist/upgrade; $yarn link @angular/{core,common,platform-browser{,-dynamic}}; $yarn link )

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
