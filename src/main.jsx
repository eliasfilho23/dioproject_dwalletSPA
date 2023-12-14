import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom"
import Signin from './pages/signin.jsx'
import Signup from './pages/Signup.jsx'
import Home from './pages/Home.jsx'
import NewTransaction from './pages/NewTransaction.jsx'
import ErrorPage from './pages/ErrorPage.jsx'
import Profile from './pages/Profile.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage /> 
  },
  {
    path: "/profile",
    element: <Profile />
  },
  {
    path: "/signin",
    element: <Signin />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/transaction/:type",
    element: <NewTransaction />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
)
