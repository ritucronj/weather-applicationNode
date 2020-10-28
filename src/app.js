const path=require('path');
const express=require('express');
const hbs=require('hbs');
const geocode=require('./utils/geocode');
const forecast=require('./utils/forecast');

const app=express();
const port=process.env.PORT || 3000
console.log(__dirname);
console.log(__filename);
console.log(path.join(__dirname,'../public'))
//Paths
const publicDirectoryPath=path.join(__dirname,'../public');
const viewPath= path.join(__dirname, '../templates/views');
const partialsPath=path.join(__dirname,'../templates/partials')

app.use(express.static(publicDirectoryPath))


app.set('views',viewPath);
hbs.registerPartials(partialsPath)

app.set('view engine','hbs')


app.get('',(req,res)=>{
    res.render('index',{
       title:'Weather',
       name:'Ritu Verma' 
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        name:'Ritu Verma' 
     })
})

app.get('/help',(req,res)=>{
    res.render('help',{
       message:"This is Help Page!",
       title:"Help",
       name:"Ritu Verma"
     })
})




app.get('/weather',(req,res)=>{
   if(!req.query.address){
       return res.send({
           error:'You must provide with a address'
       })
   }

   const address=req.query.address;
   geocode(address,(error,{latitude,longitude,location}={})=>{

    if(error){
       return   res.send({Error:error});
    }
   forecast(latitude,longitude, (error, forecastdata) => {
     if(error){
        return   res.send({Error:error});
     }
    res.send({location:location,forecast:forecastdata,address:address},
        );
  
  })

})

})


app.get('/products',(req,res)=>{

    if(!req.query.search){
      return  res.send({
            error:'You must provide a search term'
        })
    }
    

    console.log(req.query);
    res.send({
        products:[]
    })
})




app.get("/help/*",(req,res)=>{
    res.render('error404',{
        message:"Help Article Not Found!",
        name:"Ritu Verma"
    
      })
})

app.get('*',(req,res)=>{
    res.render('error404',{
        message:"Error-404(Page Not Found)!",
        name:"Ritu Verma"
    
      })
})







app.listen(port,()=>{
    console.log("Server is up on Port",port)
});

