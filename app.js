const express = require('express');
const fs = require('fs');
const app = express();
const fileUpload = require('express-fileupload');

const port = 3001

app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
}));
app.get("/",function(req,res){
    res.send(`
        <form method="POST" enctype="multipart/form-data" action="/upload" onchange="this.submit()" >
            <input type="file" name="file" multiple />
        </form>
    `)
});
app.post("/upload",(req,res)=>{
    if(!fs.existsSync("./uploaded-files")){
        fs.mkdirSync("./uploaded-files");
    }
    if(req.files && req.files.file){
        let files = !Array.isArray(req.files.file) ? [req.files.file] : req.files.file;
        files.forEach( file => {
            fs.writeFileSync('./uploaded-files/'+file.name,file.data);
        })
    }
    console.log(req.files);
    res.redirect("/");
})

app.listen(port, () => console.log("HTTP Upload Server running on " + port));