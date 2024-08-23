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
    res.sendFile('C:\\Users\\ACER\\Documents\\github\\ViewJSON\\frontend\\HomePage.html')
    // Sincerely, this makes life much easier.
    // I guess readFile comes in handy when we want to include it as a component in another thing.
}


let dataParser = (req, res, next) => {
    let fileLocation, contractCode, contractAST

    const form = formidable({allowEmptyFiles:true, minFileSize: 0})
    form.parse(req, (err, fields, files) => {
        if(err){
            next(err)
            return
        }
        else {

            // If file has been uploaded
            if(files.sourcefile){
                fileLocation =  files.sourcefile[0].filepath
                contractCode = fs.readFileSync(fileLocation, 'utf-8')
                contractAST = contractparser.parse(contractCode)
            }

            // If the source code has been uploaded in the text area
            if(fields.contractcode) {
                contractCode = fields.contractcode[0]
                // I'm not quite sure why there is an array for this field. It's just a text area
                contractAST = contractparser.parse(contractCode)
            }
            res.json({contractAST})
        }
    })
}

app.use(express.static('./frontend'))
app.get('/', homePage)
app.post('/json', dataParser)