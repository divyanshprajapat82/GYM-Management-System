import React, { useContext, useEffect } from 'react'
import { loginContext } from '../context/MainContext'
import { useNavigate, Routes, Route, Navigate } from 'react-router'
import axios from 'axios'
import { ToastContainer } from 'react-toastify'
import SideBar from '../components/admin/SideBar'
import RightPreview from '../components/admin/RightPreview'
import AdminDashboard from './admin/AdminDashboard'
import ViewMembers from './admin/Members/ViewMembers'
import AddMembers from './admin/Members/AddMembers'
import CreateBills from './admin/bills/CreateBills'
import ViewSupplement from './admin/SupplementStore/ViewSupplement'
import AddSupplement from './admin/SupplementStore/AddSupplement'
import AddDitePlan from './admin/ditePlan/AddDitePlan'
import ViewDitePlan from './admin/ditePlan/ViewDitePlan'

export default function Admin() {
    const { token } = useContext(loginContext)
    const navigate = useNavigate()
    let ADMIN_URL = import.meta.env.VITE_ADMIN_URL

    useEffect(() => {
        if (!token || token === "") {
            navigate("/login")
        }
    }, [token, navigate])

    if (!token || token === "") {
        return <div>Redirecting...</div>
    }

    let userView = () => {
        axios.get(`${ADMIN_URL}/admin/auth/view`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("TOKEN")}`
                }
            }
        )
            .then((res) => res.data)
            .then((finalData) => {
                if (finalData.status) {
                } else {
                    toast.error(finalData.message || "Invalid username or password")
                }
            })
            .catch((error) => {
                toast.error("Login failed. Please try again.")
                console.error("Login error:", error)
            })
    }
    return (
        <>
            <div className='max-w-[1200px] m-auto px-4 py-8'>
                {/* <div className='flex-1'>
                    <div className='bg-[#f7f7f7] rounded-[12px] p-5 shadow-sm'>
                        <h2 className='text-[22px] font-semibold mb-2'>Admin Dashboard</h2>
                    </div>
                </div> */}
                {/* <div className='flex flex-col md:flex-row gap-4'>
                    <SideBar />
                    <RightPreview />
                </div> */}
                {/* <Routes>
                    <Route path='dashboard' element={<AdminDashboard />} />
                    <Route path='members' element={<div className='pl-4'>Members Page</div>} />
                    <Route path='bills' element={<div className='pl-4'>Create Bills Page</div>} />
                    <Route path='store' element={<div className='pl-4'>Supplement Store Page</div>} />
                    <Route path='settings' element={<div className='pl-4'>Settings Page</div>} />
                    <Route index element={<Navigate to='dashboard' replace />} />
                </Routes> */}
                <Routes>
                    <Route path='/' element={<RightPreview />} >
                        <Route index element={<Navigate to='dashboard' replace />} />
                        <Route path='dashboard' element={<AdminDashboard />} />
                        <Route path='view/members' element={<ViewMembers />} />
                        <Route path='add/members' element={<AddMembers />} />
                        <Route path='add/members/:id' element={<AddMembers />} />
                        <Route path='bills' element={<CreateBills />} />
                        <Route path='view/store' element={<ViewSupplement />} />
                        <Route path='add/store' element={<AddSupplement />} />
                        <Route path='add/store/:id' element={<AddSupplement />} />
                        <Route path='view/dite' element={<ViewDitePlan />} />
                        <Route path='add/dite' element={<AddDitePlan />} />
                        <Route path='add/dite/:id' element={<AddDitePlan />} />
                        {/* <Route path='settings' element={<div className='pl-4'>Settings Page</div>} /> */}
                    </Route>
                    <Route path="*" element={<div className="p-6 text-red-500">Page not found</div>} />
                </Routes>
            </div>

        </>
    )
}
