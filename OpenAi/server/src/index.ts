import express, { Request, Response } from "express";
import { opne } from './open'

const app = express();
app.use(express.json());
import swaggerUi from 'swagger-ui-express';




const user=[{name: 'John', email: 'sinch@gmail.com'}, {name:"alice", email:"alice@gmail.com"}]

app.get('/user',(req:Request,res:Response)=>{
    const {name}=req.query
    
    if ( typeof name=="string") {
        
        const re=user.filter(p=>p.name.toLowerCase().trim().includes(name.toLowerCase()))
        
        res.json({re})
    }
})
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(opne));

app.listen(3000,()=>{
    console.log("server listening on 3000");
    
});