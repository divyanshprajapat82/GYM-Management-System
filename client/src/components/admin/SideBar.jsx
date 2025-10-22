import React, { useContext } from 'react'
import { NavLink } from 'react-router'
import { FaTachometerAlt, FaUsers, FaDollarSign, FaCog, FaDumbbell, FaUser } from 'react-icons/fa'
import { loginContext } from '../../context/MainContext'

export default function SideBar() {

    let { userData } = useContext(loginContext)

    // console.log("Api Data", userData);


    return (
        // <aside className='w-full sm:w-[280px] shrink-0'>
        <div className='md:sticky md:top-[100px] relative w-[100%] md:max-w-[230px] h-[500px]'>
            <div className=' bg-[#485055] text-white shadow-md rounded-[12px] overflow-hidden'>
                {/* <div className=''> */}
                <div className='h-full'>
                    <div className='px-4 py-4 flex items-center justify-between'>
                        <h3 className='text-[18px] font-semibold flex items-center gap-2'>
                            <span className='text-[#FD4C00] rotate-90 mt-0.5'>
                                <FaDumbbell />
                            </span>
                            Admin Panel
                        </h3>
                    </div>
                    <div className='flex flex-col justify-between'>
                        <nav className='p-2'>
                            <ul className='flex flex-col'>
                                <li>
                                    <NavLink to={'dashboard'} className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-[10px] transition-all ${isActive ? 'bg-[#40484f]' : 'hover:bg-[#40484f]'}`}>
                                        <FaTachometerAlt className='text-[#FD4C00]' />
                                        <span>Dashboard</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to={'view/members'} className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-[10px] transition-all ${isActive ? 'bg-[#40484f]' : 'hover:bg-[#40484f]'}`}>
                                        <FaUsers className='text-[#FD4C00]' />
                                        <span>Members</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to={'bills'} className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-[10px] transition-all ${isActive ? 'bg-[#40484f]' : 'hover:bg-[#40484f]'}`}>
                                        <FaDollarSign className='text-[#FD4C00]' />
                                        <span>Create Bills</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to={'view/store'} className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-[10px] transition-all ${isActive ? 'bg-[#40484f]' : 'hover:bg-[#40484f]'}`}>
                                        <FaDollarSign className='text-[#FD4C00]' />
                                        <span>Supplement store</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to={'view/dite'} className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-[10px] transition-all ${isActive ? 'bg-[#40484f]' : 'hover:bg-[#40484f]'}`}>
                                        <FaDollarSign className='text-[#FD4C00]' />
                                        <span>Diet Plan</span>
                                    </NavLink>
                                </li>
                                {/* <li>
                                    <NavLink to={'settings'} className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-[10px] transition-all ${isActive ? 'bg-[#40484f]' : 'hover:bg-[#40484f]'}`}>
                                        <FaCog className='text-[#FD4C00]' />
                                        <span>Settings</span>
                                    </NavLink>
                                </li> */}
                            </ul>
                        </nav>
                        <div className='p-4 mt-4 flex items-end-safe gap-2'>
                            <div className='flex items-center gap-2'>
                                {/* <h1 className='text-[20px]'>ashdk</h1> */}
                                <div className='border rounded-full p-3'>
                                    <FaUser />
                                </div>
                                <div className=''>
                                    {/* <h1 className='-mb-0.5 font-semibold truncate w-35'>ujjahdj@dsdnj.com</h1> */}
                                    <h1 className='-mb-0.5 font-semibold truncate w-35'>{userData.userEmail}</h1>
                                    <p className='text-[#ffffffd4]'>{userData.userType}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* </div> */}
            </div>
        </div>
        // </aside>
    )
}
