'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
const path = require('path')
require('dotenv').config({
  path: path.resolve(__dirname, '../.env')
})
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_BASE_URL : JSON.stringify(process.env.API_BASE_URL)
})
