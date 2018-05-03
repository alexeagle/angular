This repo is the demo/seed for bunding an Angular application with Google Closure Compiler.
It contains a minimal Hello World application with a single component.

See https://github.com/angular/angular/issues/8550 for more context.

The sources live in the Angular monorepo, at
https://github.com/angular/angular/tree/master/integration/closure_demo
and are synced to https://github.com/angular/closure-demo on each green build.

# Try it

First, install [brotli], which is a more modern compression algorithm than gzip.
It gives a 13% smaller JS file, no work required!
The commands below use it, but you don't have to.

On Mac, `brew install brotli`.

``` shell
$ yarn install
$ yarn run build
$ yarn run serve
```

[brotli]: https://github.com/google/brotli

## Where does the size come from?

``` shell
$ yarn run explore
```

# Notes

Requires Node >= 6.x since the `ngc` tool (and its deps) are now shipped as ES6 as well.

Requires Java installed to run the Closure Compiler. We recommend installing http://zulu.org/download-dev/.
