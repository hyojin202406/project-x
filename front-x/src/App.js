import { Route, Routes } from 'react-router-dom'

import './App.css'
import Authentication from './Components/Authentication/Authentication'
import HomePage from './Components/Hompage/HomePage'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserProfile } from './Components/Store/Auth/Action'

function App() {
  const jwt = localStorage.getItem('jwt')
  const { auth } = useSelector((store) => store)
  const dispatch = useDispatch()

  useEffect(() => {
    if (jwt) {
      dispatch(getUserProfile(jwt))
    }
  }, [auth.jwt])

  return (
    <div className="">
      <Routes>
        <Route
          path="/*"
          element={auth.user ? <HomePage /> : <Authentication />}
        ></Route>
      </Routes>
    </div>
  )
}

export default App
