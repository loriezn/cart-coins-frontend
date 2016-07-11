'use strict';
/**
 * Cart coins
 *
 * @author Josh
 */

require('es6-promise').polyfill();

var gulp = require('gulp');
var wrench = require('wrench');

wrench.readdirSyncRecursive('./gulp').filter(function(file) {
    return (/\.(js|coffee)$/i).test(file);
}).map(function(file) {
    require('./gulp/' + file);
});