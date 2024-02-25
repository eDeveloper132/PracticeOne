import express from "express";
import path from "path";
const app = express();
const PORT = 8080;

const __dirname = path.resolve();

app.use((request,response,next)=>
{
    next();
})

app.listen(PORT,()=>
{
    console.log("Server is running on port",PORT);
})

app.use(express.static(path.resolve(__dirname,"public")));

app.get("/",(request,response)=>
response.status(200).send(
    {
        message: "index loaded"
    }
))

app.get("/app",(request,response)=>
response.status(200).send(
    {
        message: "EveryThing is Fine"
    }
)
)
app.get("/about",(req,res)=>
{
    res.sendfile(path.join(__dirname,"/public/wrong.html"));
})
app.use("*",(req,res)=>
{
    res.sendfile(path.join(__dirname,"/public/wrong.html"));
})