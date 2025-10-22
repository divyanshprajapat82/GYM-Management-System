import React from 'react'
import { Link } from 'react-router'

export default function AboutUs() {
    return (
        <>
            <div className='bg-[#1D2429]'>
                <div className='max-w-[1200px] lg:h-[calc(100vh-75px)] m-auto px-4 md:py-0 py-8 relative overflow-hidden'>
                    <div className='flex items-center h-full justify-between gap-8'>
                        <div className='w-full md:relative absolute md:opacity-100 opacity-25'>
                            <img src="/images/about.png" alt="" />
                        </div>
                        <div className='grid space-y-6 md:z-0 z-10'>
                            <h1 className='text-[60px]/[60px] text-[#FD4C00] font-bold uppercase'>
                                About Us
                            </h1>
                            <p className='sm:w-[80%] text-justify'>At Shape Your Body, we help you achieve your fitness goals with expert training, modern equipment, and a motivating environment. Our mission is simple—build strength, boost confidence, and shape a healthier you.</p>
                            <div className='flex'>
                                <Link to={""}> <button className='px-5 py-2 hover:bg-[#fd4c00bb] font-bold  border-2 border-[#fff] hover:border-[#fd4c00bb] rounded-[10px] cursor-pointer transition-all duration-300'>Learn More</button> </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
