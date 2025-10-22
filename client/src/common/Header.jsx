import React, { useContext, useEffect, useState } from 'react'
import { FaDumbbell } from 'react-icons/fa'
import { Link, useLocation, useNavigate } from 'react-router'
import { loginContext } from '../context/MainContext'

export default function Header() {

    let { setUserRole, userRole, token, setToken } = useContext(loginContext)
    const [changeHeader, setChangeHeader] = useState(false)
    let pathlocation = useLocation()

    console.log(pathlocation);

    let navigate = useNavigate()
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setChangeHeader(true)
            } else {
                setChangeHeader(false)
            }
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // let token = localStorage.getItem("TOKEN")
    // const dashboardPath = userRole === 'admin' ? '/admin' : userRole === 'member' ? '/member' : '/'

    return (
        <>
            <div style={{
                backdropFilter: 'blur(5px)',
            }} className={`sticky ${changeHeader ? "bg-[#48505565] top-0" : "bg-[#485055] -top-80"} text-[#fff] transition-all duration-300 z-50`}>
                <div className='max-w-[1200px] m-auto p-4' >
                    <div className='flex items-center justify-between'>
                        <Link to={"/"}>
                            <h1 className='flex items-center gap-2 text-[25px] text-[#fff] font-bold'>
                                GYM
                                <span className='text-[#FD4C00] rotate-90 mt-0.5'>
                                    <FaDumbbell />
                                </span>
                            </h1>
                        </Link>
                        <div className='sm:block hidden'>
                            <ul className='flex items-center gap-8 text-[18px]'>
                                <Link to={"/"}> <li className={`${pathlocation.pathname == "/" && "text-[#ff8d5c] font-semibold"}`}>Home</li> </Link>
                                {token == "" && <Link to={"/pricing"}> <li>Pricing</li> </Link>}
                                <Link to={"/contact"}> <li className={`${pathlocation.pathname == "/contact" && "text-[#ff8d5c] font-semibold"}`}>Contact</li> </Link>
                                {/* {token && <Link to={dashboardPath}> <li>Deshboard</li> </Link>} */}
                                {token && userRole == "member" &&
                                    <>
                                        <Link to={"/member/store"}> <li className={`${pathlocation.pathname == "/member/store" && "text-[#ff8d5c] font-semibold"}`}>Store</li> </Link>
                                        <Link to={"/member/dite-plan"}> <li className={`${pathlocation.pathname == "/member/dite-plan" && "text-[#ff8d5c] font-semibold"}`}>Diet Plan</li> </Link>
                                    </>
                                }
                                {token && <Link to={userRole == "admin" ? "/admin" : "/member/bill-receipts"}> <li className={`${pathlocation.pathname == "/contact" || pathlocation.pathname == "/admin" || pathlocation.pathname == "/member/bill-receipts" && "text-[#ff8d5c] font-semibold"}`}>
                                    {userRole == "admin" ? "Deshboard" : "Bill Receipts"}
                                </li> </Link>}


                            </ul>
                        </div>
                        {!token ? (
                            <Link to={"/login"}> <button className='bg-[#FD4C00] hover:bg-[#fd4c00bb] font-bold  px-8 py-2 border-2 border-[#FD4C00] hover:border-[#fd4c00bb] rounded-[10px] cursor-pointer transition-all duration-300'>Login</button> </Link>
                        ) : (
                            <button onClick={() => {
                                setUserRole("")
                                // setToken(" ")
                                // localStorage.setItem("TOKEN", "")
                                // localStorage.removeItem("TOKEN");
                                navigate("/login")

                                setToken("")
                            }} className='bg-[#FD4C00] hover:bg-[#fd4c00bb] font-bold  px-8 py-2 border-2 border-[#FD4C00] hover:border-[#fd4c00bb] rounded-[10px] cursor-pointer transition-all duration-300'>LogOut</button>
                        )}
                    </div>
                </div>
            </div >
        </>
    )
}
