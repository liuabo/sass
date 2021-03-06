'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_ROOT: '"http://h5941.m.c.citic"' // 开发环境接口地址(这里是增加的内容)
})
