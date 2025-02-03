import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Home from './components/Home/Home.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router'
import Login from './components/Login/Login.jsx'
import Signup from './components/Signup/Signup.jsx'
import Sidebar from './components/Sidebar/Sidebar.jsx'
import Expense from './components/Expense/Expense.jsx'
import Income from './components/Income/Income.jsx'
import Dashboard from './components/Dashboard/Dashboard.jsx'
import Layout from './components/Layout.jsx'
const router = createBrowserRouter([
  { path: "/", element: <Home /> }, 
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  {
    path: "/dashboard", 
    element: <Layout />,
    children: [
      { index: true, element: <Dashboard /> }, 
      { path: "income", element: <Income /> },
      { path: "expense", element: <Expense /> }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)

