const express=require("express");
const hbs=require("hbs");
const path=require("path");
const app=express();
const weatherdata=require("./util/weatherdata");
const publicpath=path.join(__dirname,"./public");
const viewpath=path.join(__dirname,"./templates/views");
const partialpath=path.join(__dirname,"./templates/partials");

app.set("view engine","hbs");
app.set("views",viewpath);
hbs.registerPartials(partialpath);
app.use(express.static(publicpath));


const port=process.env.PORT|| 3000;
app.get("/",(req,res)=>{
    res.render("index");
   // res.send("Hello the Shiv Ji");
})


app.get('/weather',(req,res)=>{
   
    if(!req.query.address){
        return res.send("Required");
    }
    weatherdata(req.query.address,(error,result)=>{
       
        if(error){
            return res.send(error);
        }
      res.send(result);
    });
   
});

app.get("*",(req,res)=>{
    res.render("404",{title:"Page Not Found"});
   // res.send("This route does not exist");
});
app.listen(port,()=>{console.log("Server")
});