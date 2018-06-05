'use strict'

const target = process.env.npm_lifecycle_event
if(target == 'test'){
    var confiObj = {
        NODE_ENV: '"production"',
        API_ROOT: '"http://octest.wechat.c.citic"'
    }
}else if(target == 'build'){
    var confiObj = {
        NODE_ENV: '"production"',
        API_ROOT: '"http://oc.wechat.c.citic"'
    }
}




module.exports = confiObj