const fs = require('fs')
const path = require('path')

const mockBaseURL = 'https://note-server.hunger-valley.com'
const reaBaseURl = 'https://note-server.hunger-valley.com' 

exports.config  = function({isdev = true} = {isdev:true}){
    let filetext =`
    module.exports = {
        baseURL:"${isdev? mockBaseURL:reaBaseURl}"
    }
    `
    fs.writeFileSync(path.join(__dirname,'../src/helpers/config-baseURL.js'),filetext)
}