import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaCheckCircle, FaDollarSign, FaExclamationCircle, FaUsers } from 'react-icons/fa'
import { Link } from 'react-router'

export default function AdminDashboard() {

    const [userData, setUserData] = useState([])
    const [bills, setBills] = useState([]);

    let ADMIN_URL = import.meta.env.VITE_ADMIN_URL


    useEffect(() => {
        axios.get(`${ADMIN_URL}/admin/auth/view`)
            .then((res) => res.data)
            .then((finalData) => {
                setUserData(finalData.data);
            })

        axios.get(`${ADMIN_URL}/admin/bill/view-bill`)
            .then((res) => res.data)
            .then((finalData) => {
                setBills(finalData.data.reduce((total, items) => total + items.amount, 0))
                // setBills(finalData.data)
            })
    }, [])

    return (
        <>
            <div className='flex-1'>
                <div className='bg-[#f7f7f7] rounded-[12px] p-5 shadow-sm'>
                    <div className='flex items-center justify-between mb-5'>
                        <h2 className='text-[22px] font-semibold'>Admin Dashboard</h2>
                        <span className='text-sm text-gray-500'>Overview</span>
                    </div>

                    {/* Stats Cards */}
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6'>
                        <div className='bg-white rounded-[10px] p-4 shadow-sm border border-gray-100'>
                            <div className='flex items-center gap-3'>
                                <div className='text-[#FD4C00] text-xl'>
                                    <FaUsers />
                                </div>
                                <div>
                                    <p className='text-sm text-gray-500'>Total Members</p>
                                    <p className='text-xl font-semibold'>{userData.length}</p>
                                </div>
                            </div>
                        </div>

                        <div className='bg-white rounded-[10px] p-4 shadow-sm border border-gray-100'>
                            <div className='flex items-center gap-3'>
                                <div className='text-green-600 text-xl'>
                                    <FaCheckCircle />
                                </div>
                                <div>
                                    <p className='text-sm text-gray-500'>Active Memberships</p>
                                    <p className='text-xl font-semibold'>{userData.length}</p>
                                </div>
                            </div>
                        </div>

                        <div className='bg-white rounded-[10px] p-4 shadow-sm border border-gray-100'>
                            <div className='flex items-center gap-3'>
                                <div className='text-emerald-600 text-xl'>
                                    <FaDollarSign />
                                </div>
                                <div>
                                    <p className='text-sm text-gray-500'>Revenue</p>
                                    <p className='text-xl font-semibold'>₹{bills.toLocaleString()}</p>
                                    {/* <p className='text-xl font-semibold'>$18,420</p> */}
                                </div>
                            </div>
                        </div>

                        <div className='bg-white rounded-[10px] p-4 shadow-sm border border-gray-100'>
                            <div className='flex items-center gap-3'>
                                <div className='text-amber-600 text-xl'>
                                    <FaExclamationCircle />
                                </div>
                                <div>
                                    <p className='text-sm text-gray-500'>Pending Payments</p>
                                    <p className='text-xl font-semibold'>0</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Recent Activity */}
                    <div className='bg-white rounded-[10px] p-4 shadow-sm border border-gray-100'>
                        <div className='flex items-center justify-between mb-3'>
                            <h3 className='text-[18px] font-semibold'>Recent Activity</h3>
                            <button className='text-sm text-[#FD4C00] hover:underline'>View all</button>
                        </div>
                        <div className='overflow-x-auto'>
                            <table className='w-full text-left text-sm'>
                                <thead>
                                    <tr className='text-gray-500'>
                                        <th className='py-2 pr-4'>Member</th>
                                        <th className='py-2 pr-4'>Action</th>
                                        <th className='py-2 pr-4'>Plan</th>
                                        <th className='py-2 pr-4'>Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* {userData.slice(0, 3).map((items, index) => (
                                        <tr className='border-t'>
                                            <td className='py-2 pr-4'>{items.userName}</td>
                                            <td className='py-2 pr-4'>{items.userEmail}</td>
                                            <td className='py-2 pr-4'>{items.membership}</td>
                                            <td className='py-2 pr-4'>{new Date(items.createdAt).toLocaleDateString()}</td>
                                        </tr>
                                    ))} */}

                                    {/* <tr className='border-t'>
                                        <td className='py-2 pr-4'>Ava Smith</td>
                                        <td className='py-2 pr-4'>New registration</td>
                                        <td className='py-2 pr-4'>Silver</td>
                                        <td className='py-2 pr-4'>Sep 30, 2025</td>
                                    </tr>
                                    <tr className='border-t'>
                                        <td className='py-2 pr-4'>Liam Brown</td>
                                        <td className='py-2 pr-4'>Payment pending</td>
                                        <td className='py-2 pr-4'>Platinum</td>
                                        <td className='py-2 pr-4'>Sep 29, 2025</td>
                                    </tr> */}
                                </tbody>
                            </table>
                            {userData.length <= 5 &&
                                <div className="text-center py-8">
                                    <p className="text-blue-600 mb-4">
                                        You haven't created any Member yet.
                                    </p>
                                    <Link to={'../add/members'}>
                                        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow transition-all duration-200 cursor-pointer">
                                            Add Members
                                        </button>
                                    </Link>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
