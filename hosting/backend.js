const express = require('express')
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
app.use(express.static('./frontend'))
app.get('/', homePage)