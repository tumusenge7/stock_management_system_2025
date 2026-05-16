import React from 'react'
import Register from './pages/Register'
import Login from './pages/Login'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Stock from './components/Stock'
import Update from './components/Update'
import StockIn from './components/StockIn'
function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/stock' element={<Stock />} />
        <Route path='/update' element={<Update />} />
        <Route path='/stockin' element={<StockIn />} />

      </Routes>
    </div>
  )
}

export default App