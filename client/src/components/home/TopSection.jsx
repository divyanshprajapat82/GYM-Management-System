import React, { useContext } from 'react'
import { Link } from 'react-router'
import { loginContext } from '../../context/MainContext'

export default function TopSection() {
    let { setUserRole, userRole, token, setToken } = useContext(loginContext)

    return (
        <>
            <div className=''>
                <div className='max-w-[1200px] lg:h-[calc(100vh-75px)] m-auto px-4 md:py-0 py-8 relative overflow-hidden'>
                    <div className='flex items-center h-full justify-between'>
                        <div className='grid space-y-4 md:z-0 z-10'>
                            <h1 className='lg:text-[80px]/[90px] text-[60px]/[70px] font-bold uppercase'>
                                Shape Your
                                <br />
                                <span className='text-[#FD4C00]'>Body</span>
                            </h1>
                            <p className='w-[80%] lg:text-[16px] text-[14px] text-justify'>Shape Your Body is more than just a workout—it’s a lifestyle. Build strength, burn fat, and unlock your full potential with expert training and a motivating environment. Stay committed, stay strong, and transform into the best version of yourself.</p>
                            <div className='flex gap-5'>
                                {/* <Link to={""}> <button className='bg-[#FD4C00] hover:bg-[#fd4c00bb] font-bold  px-5 py-2 border-2 border-[#FD4C00] hover:border-[#fd4c00bb] rounded-[10px] cursor-pointer transition-all duration-300'>Buy Package</button> </Link> */}
                                {/* {token && <Link to={userRole == "admin" ? "/admin" : userRole == "member" ? "/member/bill-receipts" : "/pricing"}>
                                    <button className='bg-[#FD4C00] hover:bg-[#fd4c00bb] font-bold  px-5 py-2 border-2 border-[#FD4C00] hover:border-[#fd4c00bb] rounded-[10px] cursor-pointer transition-all duration-300'>{userRole == "admin" ? "Deshboard" : userRole == "member" ? "Bill Receipts" : "Buy Package"}</button>

                                </Link>} */}
                                {/* {token && ( */}
                                <Link
                                    to={{
                                        admin: "/admin",
                                        member: "/member/bill-receipts",
                                    }[userRole] || "/pricing"}
                                >
                                    <button className="bg-[#FD4C00] hover:bg-[#fd4c00bb] font-bold px-5 py-2 border-2 border-[#FD4C00] hover:border-[#fd4c00bb] rounded-[10px] cursor-pointer transition-all duration-300">
                                        {{
                                            admin: "Dashboard",
                                            member: "Bill Receipts",
                                        }[userRole] || "Buy Package"}
                                    </button>
                                </Link>
                                {/* )} */}

                                <Link to={""}> <button className='px-5 py-2 hover:bg-[#fd4c00bb] font-bold  border-2 border-[#FD4C00] hover:border-[#fd4c00bb] rounded-[10px] cursor-pointer transition-all duration-300'>Learn More</button> </Link>
                            </div>
                        </div>
                        <div className='lg:mt-32 md:relative absolute w-full md:opacity-100 opacity-25'>
                            <img src="/images/top.png" alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
