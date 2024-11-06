import express, { Request, Response } from 'express';
import  Redis from "ioredis"
import { api } from './api';


const redis=new Redis({
    host: 'localhost',
    port:6379
})
redis.on("connect",()=>console.log("redis connected"))
redis.on("error",()=>console.log("not connect"))

const app = express();

app.use(express.json());

app.get('/',async(req:Request,res:Response)=>{

    
    let re=await redis.get("product")
    if (re) {
        re=JSON.parse(re)
        
        return res.json(re);
    }


   let data= await api()
   redis.set("product",JSON.stringify(data))

     return res.json(data)
})

app.get('/remove',async(req:Request,res:Response)=>{
   
    const key =`product:{id:${1}}`
   let obe= await redis.del(key)
   console.log(obe);
   

    let re = await redis.get("product")
    re = JSON.parse(re?re:"")
    res.json(re)
})

app.listen(8080,()=>{
    console.log("app listening on port 8080");
    
});