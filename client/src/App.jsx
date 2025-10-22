import React from 'react'
import Home from './pages/Home'
import { BrowserRouter, Route, Routes } from 'react-router'
import MainLayout from './common/MainLayout'
import Pricing from './pages/Pricing'
import Contact from './pages/Contact'
import Login from './common/Login'
// import AdminDeshboard from './admin/AdminDeshboard'
import Register from './common/Register'
// import MembersDeshboard from './members/MembersDeshboard'
import Admin from './pages/Admin'
import Member from './pages/Member'
import AdminDashboard from './pages/admin/AdminDashboard'
import Store from './pages/member/Store'
import DitePlan from './pages/member/DitePlan'

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/' element={<MainLayout />}>
            {/* User */}
            <Route index element={<Home />} />
            <Route path='pricing' element={<Pricing />} />
            <Route path='contact' element={<Contact />} />

            {/* Admin */}
            <Route path='/admin/*' element={<Admin />} />

            {/* Member */}
            <Route path='/member/bill-receipts' element={<Member />} />
            <Route path='/member/store' element={<Store />} />
            <Route path='/member/dite-plan' element={<DitePlan />} />
          </Route>
        </Routes>
      </BrowserRouter>

    </>
  )
}

