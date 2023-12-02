const fs = require('fs')

function GenerateMongoString(username,password,url,db){
    let connectionString;
    try{
        connectionString = "mongodb+srv://" + username + ":" + password + "@" + url + "/" + db
    }
    catch(error){
        connectionString = none
        console.error("DB STRING GENERATION FAILED")
    }
    return connectionString
}

function ReadValues(filePath){
    try{
        const values = fs.readFileSync(filePath,'utf-8').split(' ')
        return values
    }
    catch(error){
        console.error(error)
    }
}
module.exports = {GenerateMongoString,ReadValues}