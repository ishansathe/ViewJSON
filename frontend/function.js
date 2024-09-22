"use-strict"

let action = () =>{
    console.log("Button has been clicked.")
    var ok = document.getElementById('fileInput').files[0]

    if(!ok) {
        alert("Please Input a file")
    }
    else{
        console.log(ok.name)
    }

    var ok1 = document.getElementById('contractInput').files[0]
    if(!ok1) {
        alert("Please input a file")
        return
    }
    else {
        console.log("File entered")
    }
}

