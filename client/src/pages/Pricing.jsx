import React from 'react'
import { TbCheckbox } from 'react-icons/tb'
import { Link } from 'react-router'

export default function Pricing() {
    return (
        <>
            <div className='bg-[#1D2429] text-[#fff]'>
                <div className='max-w-[1200px] m-auto p-4'>
                    <div>
                        <h1 className='text-[50px]/[60px] font-bold mb-2'>
                            SIMPLE,
                            <br />
                            <span className='text-[#FD4C00]'> TRANSPARANT PRICING </span>
                        </h1>
                        <p>Choose the plan that fits your fitness journey. From beginner to advanced, our flexible pricing options give you access to expert trainers, modern equipment, and a motivating workout environment.</p>
                    </div>
                </div>
                <hr className='my-8 mx-20' />
                <div className='max-w-[900px] m-auto px-4 py-8'>
                    {/* <div className='grid grid-cols-3'> */}
                    <div className='flex items-center'>
                        <div className='w-full bg-[#2E363C] p-4 rounded-2xl'>
                            <h4 className='uppercase'>Basic Plan</h4>
                            <hr className='my-2' />
                            <div>
                                <h2 className='text-[45px] text-center'>₹999
                                    <span className='text-[20px] text-[#FD4C00]'> / Month</span>
                                </h2>
                                <p className='text-[#ffffffd6] text-[15px] text-center'>Start your fitness journey with essential gym access.</p>
                            </div>
                            <div className='mt-8'>
                                <ul className='grid space-y-2'>
                                    <li className='flex items-center gap-2 text-[#ffffffd6]'><TbCheckbox className='text-[#FD4C00]' /> Access to gym equipment</li>
                                    <li className='flex items-center gap-2 text-[#ffffffd6]'><TbCheckbox className='text-[#FD4C00]' /> Locker & shower facility</li>
                                    <li className='flex items-center gap-2 text-[#ffffffd6]'><TbCheckbox className='text-[#FD4C00]' /> Free fitness assessment</li>
                                    <li className='flex items-center gap-2 text-[#ffffffd6]'><TbCheckbox className='text-[#FD4C00]' /> Perfect for beginners</li>
                                </ul>
                            </div>
                            <div className='mt-4'>
                                <Link to={""}> <button className='w-full px-5 py-2 hover:bg-[#fd4c00bb] font-bold  border-2 border-[#fd4c00bb] hover:border-[#fd4c00bb] rounded-[10px] cursor-pointer transition-all duration-300'>Learn More</button> </Link>
                            </div>

                        </div>
                        <div className='w-full bg-[#FD4C00] p-4 rounded-2xl'>
                            <h4 className='uppercase text-[20px]'>Standard Plan</h4>
                            <hr className='my-2' />
                            <div>
                                <h2 className='text-[50px] text-center'>₹1,999
                                    <span className='text-[25px]'> / Month</span>
                                </h2>
                                <p className='text-[#ffffffd6] text-[15px] text-center'>Gym + group workouts and nutrition support.</p>
                            </div>
                            <div className='mt-8'>
                                <ul className='grid space-y-3 text-[18px]'>
                                    <li className='flex items-center gap-2 text-[#ffffffd6]'><TbCheckbox className='text-[#fff]' /> All Basic Plan benefits</li>
                                    <li className='flex items-center gap-2 text-[#ffffffd6]'><TbCheckbox className='text-[#fff]' /> Group workout sessions</li>
                                    <li className='flex items-center gap-2 text-[#ffffffd6]'><TbCheckbox className='text-[#fff]' /> Diet & nutrition guidance</li>
                                    <li className='flex items-center gap-2 text-[#ffffffd6]'><TbCheckbox className='text-[#fff]' /> Ideal for steady progress</li>
                                </ul>
                            </div>
                            <div className='mt-4'>
                                <Link to={""}> <button className='w-full px-5 py-2 hover:bg-[#fff] hover:text-[#000] font-bold  border-2 border-[#fff] rounded-[10px] cursor-pointer transition-all duration-300'>Learn More</button> </Link>
                            </div>

                        </div>
                        <div className='w-full bg-[#2E363C] p-4 rounded-2xl'>
                            <h4 className='uppercase'>Premium Plan</h4>
                            <hr className='my-2' />
                            <div>
                                <h2 className='text-[45px] text-center'>₹2,999
                                    <span className='text-[20px] text-[#FD4C00]'> / Month</span>
                                </h2>
                                <p className='text-[#ffffffd6] text-[15px] text-center'>Full access with personal training & custom plans.</p>
                            </div>
                            <div className='mt-8'>
                                <ul className='grid space-y-2'>
                                    <li className='flex items-center gap-2 text-[#ffffffd6]'><TbCheckbox className='text-[#FD4C00]' /> All Standard Plan benefits</li>
                                    <li className='flex items-center gap-2 text-[#ffffffd6]'><TbCheckbox className='text-[#FD4C00]' /> Personal trainer sessions</li>
                                    <li className='flex items-center gap-2 text-[#ffffffd6]'><TbCheckbox className='text-[#FD4C00]' /> Customized workout plan</li>
                                    <li className='flex items-center gap-2 text-[#ffffffd6]'><TbCheckbox className='text-[#FD4C00]' /> Best for serious transformation</li>
                                </ul>
                            </div>
                            <div className='mt-4'>
                                <Link to={""}> <button className='w-full px-5 py-2 hover:bg-[#fd4c00bb] font-bold  border-2 border-[#fd4c00bb] hover:border-[#fd4c00bb] rounded-[10px] cursor-pointer transition-all duration-300'>Learn More</button> </Link>
                            </div>

                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}
