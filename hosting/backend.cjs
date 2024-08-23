const express = require('express')
const {formidable} = require('formidable')
const contractparser = require('@solidity-parser/parser')
const fs = require('fs')
const app = express()
const PORT = 3504

app.listen(PORT, () => {
    console.log("Listening at port " + PORT)
})

let homePage = (req, res, next) => {
    fs.readFile('./frontend/HomePage.html', 'utf-8', (err, data) => {
        if(err){
            console.log(err)
        }
        else 
            res.send(data)
    })
}


let dataParser = (req, res, next) => {
    let fileLocation, contractCode, contractAST

    const form = formidable({})
    form.parse(req, (err, fields, files) => {
        if(err){
            next(err)
            return
        }
        else {
            fileLocation =  files.contractcode[0].filepath
            contractCode = fs.readFileSync(fileLocation, 'utf-8')
            contractAST = contractparser.parse(String(contractCode))
            res.json({contractAST})
        }
    })
}

app.use(express.static('./frontend'))
app.get('/', homePage)
app.post('/json', dataParser)