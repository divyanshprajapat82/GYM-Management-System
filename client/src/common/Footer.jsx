import React, { useContext } from 'react'
import { FaDumbbell } from 'react-icons/fa'
import { Link } from 'react-router'
import { loginContext } from '../context/MainContext'

export default function Footer() {
    let { setUserRole, userRole, token, setToken } = useContext(loginContext)

    return (
        <>
            <div className='bg-[#485055] text-[#fff]'>
                <div className='max-w-[1200px] m-auto px-4 py-8'>
                    <div className='grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 items-center gap-8'>
                        <div className=''>
                            <h1 className='flex items-center gap-2 text-[25px] text-[#fff] font-bold'>
                                GYM
                                <span className='text-[#FD4C00] rotate-90 mt-0.5'>
                                    <FaDumbbell />
                                </span>
                            </h1>
                            <p className='text-[#fffc] text-justify'>Shape Your Body is where fitness meets motivation. We provide the right guidance, equipment, and environment to help you stay strong, confident, and healthy.</p>
                        </div>
                        <div className='flex flex-col sm:items-center items-start'>
                            <h1 className='text-[#fff] font-bold'>Explore</h1>
                            <ul className='text-[#fffc]'>
                                <Link to={"/"}><li className='hover:text-[#fff]'>Home</li></Link>
                                <Link to={"/pricing"}><li className='hover:text-[#fff]'>Pricing</li></Link>
                                <Link to={"/contact"}><li className='hover:text-[#fff]'>Contact</li></Link>
                            </ul>
                        </div>
                        <div>
                            <div className='grid w-full gap-5'>
                                {/* <Link to={"/login"}> <button className='w-full bg-[#FD4C00] hover:bg-[#fd4c00bb] font-bold  px-5 py-2 border-2 border-[#FD4C00] hover:border-[#fd4c00bb] rounded-[10px] cursor-pointer transition-all duration-300'>{ } Login</button> </Link> */}
                                {!token ? (
                                    <Link to={"/login"}> <button className='bg-[#FD4C00] w-full hover:bg-[#fd4c00bb] font-bold px-8 py-2 border-2 border-[#FD4C00] hover:border-[#fd4c00bb] rounded-[10px] cursor-pointer transition-all duration-300'>Login</button> </Link>
                                ) : (
                                    <button onClick={() => {
                                        setUserRole("")
                                        // setToken(" ")
                                        // localStorage.setItem("TOKEN", "")
                                        setToken("")
                                    }} className='bg-[#FD4C00] hover:bg-[#fd4c00bb] font-bold  px-8 py-2 border-2 border-[#FD4C00] hover:border-[#fd4c00bb] rounded-[10px] cursor-pointer transition-all duration-300'>LogOut</button>
                                )}
                                <Link to={"/contact"}> <button className='w-full px-5 py-2 hover:bg-[#fd4c00bb] font-bold  border-2 border-[#FD4C00] hover:border-[#fd4c00bb] rounded-[10px] cursor-pointer transition-all duration-300'>Contect Us</button> </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
