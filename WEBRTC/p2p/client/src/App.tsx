
import './App.css'
import { Route,  Routes, Link } from 'react-router-dom'
import { Sender } from './components/Sender'
import { Receiver } from './components/Receiver'
import Home from './components/Home'


function App() {
  return (
  <>
  <nav>
    <Link to={'/sender'}>sender</Link>
    <Link to={'/receiver'}>Receiver</Link>
  </nav>

        <Routes>

          <Route path="/" element={<Home/>} />
          <Route path="/sender" element={<Sender />} />
          <Route path="/receiver" element={<Receiver />} />
        </Routes>
  </>
  )
}

export default App