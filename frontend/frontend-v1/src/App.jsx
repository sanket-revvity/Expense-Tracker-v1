import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './components/Home/Home'
import Login from './components/Login/Login'
import { BrowserRouter} from 'react-router-dom'
import ReactDOM from 'react-dom'
import Sidebar, { SideBarItem } from './components/Sidebar/Sidebar'
import { LifeBuoy,Receipt,LogOut,CircleDollarSign,PiggyBank,CreditCard,LayoutDashboard,Settings } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Dashboard from './components/Dashboard/Dashboard'
import Income from './components/Income/Income'
import Layout from './components/Layout'
function App() {
 return (
    <>
    <Layout />
      {/* <Home /> */}
      {/* <Login /> */}
    </>
  )
}

export default App
