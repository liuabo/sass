'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
    NODE_ENV: '"production"',
    VN_CONFIG: '"dev"',
    API_ROOT: '"http://h5941.m.c.citic"'
})