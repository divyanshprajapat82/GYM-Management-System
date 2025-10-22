import React from 'react'

export default function Contact() {
    return (
        <>
            <div className='bg-[#485055] text-[#fff]'>
                <div className='max-w-[1200px] m-auto px-4 py-16'>
                    <div className='text-center'>
                        <h1 className='text-[34px] sm:text-[40px] font-extrabold'>Contact Us</h1>
                        <p className='text-[#fffc] max-w-[650px] m-auto'>
                            Have questions about memberships, classes, or personal training? We’re here to help you
                            stay consistent, strong, and motivated.
                        </p>
                    </div>
                </div>
            </div>

            <div className='max-w-[1200px] m-auto px-4 py-12'>
                <div className='grid lg:grid-cols-3 grid-cols-1 gap-8 items-start'>
                    <div className='col-span-1 bg-[#485055] text-[#fff] rounded-[12px] p-6 h-full'>
                        <h2 className='text-[22px] font-bold mb-4'>Get in touch</h2>
                        <ul className='grid gap-4 text-[#fffc]'>
                            <li>
                                <span className='text-[#fff] font-semibold'>Address:</span>
                                <div>123 Fitness Street, Shape City, 10001</div>
                            </li>
                            <li>
                                <span className='text-[#fff] font-semibold'>Phone:</span>
                                <div>+1 (555) 123-4567</div>
                            </li>
                            <li>
                                <span className='text-[#fff] font-semibold'>Email:</span>
                                <div>support@gymshape.com</div>
                            </li>
                            <li>
                                <span className='text-[#fff] font-semibold'>Hours:</span>
                                <div>Mon - Sat: 6:00 AM - 10:00 PM</div>
                            </li>
                        </ul>
                    </div>

                    <div className='lg:col-span-2 col-span-1'>
                        <div className='rounded-[12px] border border-[#e5e7eb] shadow-sm p-6'>
                            <h2 className='text-[22px] font-bold mb-6'>Send us a message</h2>
                            <div className='grid gap-5'>
                                <div className='grid sm:grid-cols-2 grid-cols-1 gap-5'>
                                    <div>
                                        <label className='block text-[14px] font-semibold mb-1'>Full Name</label>
                                        <input
                                            type='text'
                                            placeholder='Enter your full name'
                                            className='w-full px-4 py-2 rounded-[8px] border border-[#d1d5db] outline-none focus:ring-2 focus:ring-[#FD4C00]'
                                        />
                                    </div>
                                    <div>
                                        <label className='block text-[14px] font-semibold mb-1'>Email</label>
                                        <input
                                            type='email'
                                            placeholder='you@example.com'
                                            className='w-full px-4 py-2 rounded-[8px] border border-[#d1d5db] outline-none focus:ring-2 focus:ring-[#FD4C00]'
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className='block text-[14px] font-semibold mb-1'>Subject</label>
                                    <input
                                        type='text'
                                        placeholder='How can we help you?'
                                        className='w-full px-4 py-2 rounded-[8px] border border-[#d1d5db] outline-none focus:ring-2 focus:ring-[#FD4C00]'
                                    />
                                </div>

                                <div>
                                    <label className='block text-[14px] font-semibold mb-1'>Message</label>
                                    <textarea
                                        rows={5}
                                        placeholder='Write your message...'
                                        className='w-full px-4 py-2 rounded-[8px] border border-[#d1d5db] outline-none focus:ring-2 focus:ring-[#FD4C00]'
                                    />
                                </div>

                                <div>
                                    <button
                                        type='button'
                                        className='bg-[#FD4C00] hover:bg-[#fd4c00bb] text-[#fff] font-bold px-8 py-2 border-2 border-[#FD4C00] hover:border-[#fd4c00bb] rounded-[10px] cursor-pointer transition-all duration-300'
                                    >
                                        Send Message
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
