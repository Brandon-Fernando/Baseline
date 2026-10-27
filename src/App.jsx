import { Route, Routes } from 'react-router-dom'
import './App.css'
import Welcome from './pages/Welcome/Welcome'
import CreateAccount from './pages/UserAuth/CreateAccount'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Welcome />}/>

      <Route path="/create-account" element={<CreateAccount />}/>
    </Routes>
  )
}

export default App