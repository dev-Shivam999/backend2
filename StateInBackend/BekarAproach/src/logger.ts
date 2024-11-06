import {  GameManager } from "./store";



export function LoggerFn() {

    setInterval(()=>{
        console.log(GameManager.getInstance().getGame());
         
    },5000);
}