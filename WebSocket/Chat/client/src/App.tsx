import { useEffect, useMemo, useState} from 'react'
import './App.css'

function App() {
  const socket = useMemo(() => { return new WebSocket("ws://localhost:8000")},[])
  const [vale,setvalue]=useState("")
  const [Id,SetId]=useState<String>("")
  const [user,SetUser]=useState([])
  const [ch,setmessage]=useState<String[]>([])
useEffect(()=>{
  socket.onopen=()=>{
    socket.send(JSON.stringify({event:"connection" }))
  }
  socket.onmessage = (message:{data:string}) => {
    console.log('Message received:', message.data);
    if (message.data != "userConnect")setmessage(ch=>[...ch,message.data])

  }
  return () => socket.close();
},[socket])

useEffect(()=>{
  fetch("http://localhost:8000/user").then((response)=>response.json()).then((response)=>SetUser(response.user)).catch((error)=>console.log(error))
},[])
console.log(user);

  return (
   <>
   <div>
    {
      user.length > 0 &&user.map((p:{name:String,id:String})=><li onClick={()=>SetId(p.id)}>{p.name}</li>)
    }
   </div>
   <div>
  {ch.map(p=><li>{p}</li>)}
    <div>
      <input type="text" onChange={(e)=>setvalue(e.target.value)} />
          <button onClick={() => socket.send(JSON.stringify({event:"chat", targetId:Id,content:vale}))}>click</button>
    </div>
   </div>
   </>
  )
}

export default App
