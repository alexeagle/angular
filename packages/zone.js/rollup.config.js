const banner = `/**
* @license Angular v0.0.0-PLACEHOLDER
* (c) 2010-2019 Google LLC. https://angular.io/
* License: MIT
*/`;

module.exports = {
    external: ['electron'],
    globals: { 
        electron: 'electron' 
    },
    output: {
        banner
    },
}
