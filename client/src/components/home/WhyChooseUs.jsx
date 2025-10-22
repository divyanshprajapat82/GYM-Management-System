import React from 'react'
import { TbCheckbox } from 'react-icons/tb'
import { Link } from 'react-router'

export default function WhyChooseUs() {
    return (
        <>
            <div className='bg-[#1D2429]'>
                <div className='max-w-[1200px] lg:h-[calc(100vh-75px)] m-auto px-4 md:py-0 py-8 relative overflow-hidden'>
                    <div className='flex items-center h-full justify-between gap-8'>

                        <div className='grid space-y-6 sm:w-full md:z-0 z-10'>
                            <h1 className='text-[60px]/[60px] text-[#fff] font-bold uppercase'>
                                WHY CHOOSE
                                <br />
                                US ?
                            </h1>
                            {/* <p className='sm:w-[80%] text-justify'> */}
                            <ul className='text-[17px]'>
                                <li className='flex items-center gap-2 text-[#ffffffd6]'><TbCheckbox className='text-[#FD4C00]' /> Have a Personal Trainer</li>
                                <li className='flex items-center gap-2 text-[#ffffffd6]'><TbCheckbox className='text-[#FD4C00]' /> Free Personal Trainer for New Members</li>
                                <li className='flex items-center gap-2 text-[#ffffffd6]'><TbCheckbox className='text-[#FD4C00]' /> Free Supplements for Every New Member</li>
                                <li className='flex items-center gap-2 text-[#ffffffd6]'><TbCheckbox className='text-[#FD4C00]' /> Open 24 Hours</li>
                            </ul>
                            {/* </p> */}
                            <div className='flex'>
                                <Link to={""}> <button className='px-5 py-2 hover:bg-[#fd4c00bb] font-bold  border-2 border-[#fff] hover:border-[#fd4c00bb] rounded-[10px] cursor-pointer transition-all duration-300'>Learn More</button> </Link>
                            </div>
                        </div>
                        <div className='w-full md:relative absolute md:opacity-100 opacity-25'>
                            <img src="/images/wcu.png" alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
