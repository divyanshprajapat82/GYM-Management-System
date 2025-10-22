import React from 'react'
import TopSection from '../components/home/TopSection'
import Program from '../components/home/Program'
import AboutUs from '../components/home/AboutUs'
import WhyChooseUs from '../components/home/WhyChooseUs'

export default function Home() {
    return (
        <>
            <div className='bg-[#485055] text-[#fff]'>
                <TopSection />
                <Program />
                <AboutUs />
                <WhyChooseUs />
            </div>
        </>
    )
}
