import { useEffect, useMemo, useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const socket = useMemo(() => { return new WebSocket("ws://localhost:8000") }, [])
  const [vale, setvalue] = useState("")
  const [Id, SetId] = useState<String>("")
  const [user, SetUser] = useState([])
  const [ch, setmessage] = useState<String[]>([])
  useEffect(() => {
    socket.onopen = () => {
      socket.send(JSON.stringify({ event: "history" }))
      socket.send(JSON.stringify({ event: "connection" }))
    }
    socket.onmessage = (message) => {
      const dom=JSON.parse(message.data)
      console.log(dom);
      
      if (dom?.event != "userConnect"&&dom?.event!="userId" ) setmessage(ch => [...ch, message.data])

    }
    return () => socket.close();
  }, [socket])

  useEffect(() => {
    fetch("http://localhost:8000/user").then((response) => response.json()).then((response) => SetUser(response.user)).catch((error) => console.log(error))
  }, [])

  const [login, setLogin] = useState("")
  const L = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const res = await axios.post("http://localhost:8000/Login",{login: login},{
      withCredentials:true
    })
    console.log(res);


  }

  return (
    <>
      <div>
        login
        <form onSubmit={(e) => L(e)} >
          <input type="text" onChange={(e) => setLogin(e.target.value)} />

        </form>   </div>
      <div>
        {
          user.length > 0 && user.map((p: { name: String, id: String }) => <li onClick={() => SetId(p.id)}>{p.name}</li>)
        }
      </div>
      <div>
        {ch.map(p => <li>{p}</li>)}
        <div>
          <input type="text" onChange={(e) => setvalue(e.target.value)} />
          <button onClick={() => socket.send(JSON.stringify({ event: "chat", targetId: Id, content: vale }))}>click</button>
        </div>
      </div>
    </>
  )
}

export default App
