import { Route, Routes } from 'react-router-dom'
import './App.css'
import Welcome from './pages/Welcome/Welcome'
import CreateAccount from './pages/UserAuth/CreateAccount'
import Home from './pages/Home/Home'
import SignIn from './pages/UserAuth/SignIn'
import FavoriteTeam from './pages/FavoriteTeam/FavoriteTeam'
import Layout from './components/Layout/Layout'

function App() {

  return (
    <Routes>
      {/* <Route path="/" element={<Welcome />}/>

      <Route path="/create-account" element={<CreateAccount />}/>

      <Route path="/sign-in" element={<SignIn />}/>

      <Route path="/home" element={<Home />}/>

      <Route path="favorite-team" element={<FavoriteTeam />}/> */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />}/>
      </Route>
    </Routes>
  )
}

export default App