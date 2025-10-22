import React from 'react'
import { Link } from 'react-router'

export default function Program() {
    return (
        <>
            <div className='relative bg-[#1D2429] '>
                <div className='absolute w-[50%] h-full bg-linear-to-b from-[#FD4C00] to-transparent md:py-0 py-8'></div>
                <div className='relative max-w-[1200px] m-auto px-4 py-6 overflow-hidden'>
                    <div className='flex items-center h-full justify-between'>
                        <div className='grid space-y-6 md:z-0 z-10'>
                            <h1 className='text-[50px]/[50px] font-bold uppercase'>
                                Ready to <br /> Leavel up <br /> Your Body
                                {/* <br />
                                <span className='text-[#FD4C00]'>Body</span> */}
                            </h1>
                            <p className='w-[80%] text-justify'>Push past your limits and take your fitness to the next level. With the right workouts, guidance, and consistency, you’ll build strength, sculpt your body, and boost your energy like never before. Get ready—it’s time to level up your body and your lifestyle.</p>
                            <div className='flex'>
                                <Link to={""}> <button className='px-5 py-2 hover:bg-[#fd4c00bb] font-bold  border-2 border-[#fff] hover:border-[#fd4c00bb] rounded-[10px] cursor-pointer transition-all duration-300'>Learn More</button> </Link>
                            </div>
                        </div>
                        <div className='w-full md:relative absolute md:opacity-100 opacity-25'>
                            <img src="/images/leavelUp.png" alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
