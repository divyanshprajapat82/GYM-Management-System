import React, { useContext, useEffect, useState } from 'react'
import { loginContext } from '../../context/MainContext'
import { useNavigate } from 'react-router'
import axios from 'axios';
import { FaFireFlameCurved } from 'react-icons/fa6';
import { CiWheat } from 'react-icons/ci';
import { GiFoodChain } from 'react-icons/gi';
import { IoWater } from 'react-icons/io5';

export default function DitePlan() {
    const { token } = useContext(loginContext)
    const [plans, setPlans] = useState([]);


    let navigate = useNavigate()
    let ADMIN_URL = import.meta.env.VITE_ADMIN_URL

    useEffect(() => {
        // Check if user is authenticated
        if (!token || token === "") {
            navigate("/login")
        }
    }, [token, navigate])

    // Show loading or redirect if not authenticated
    if (!token || token === "") {
        return <div>Redirecting...</div>
    }

    let viewPlans = () => {
        axios.get(`${ADMIN_URL}/admin/dite/view-dite`)
            .then((res) => res.data)
            .then((finalData) => {
                // if (finalData.status) {
                // } else {
                //     toast.error(finalData.message || "Invalid username or password")
                // }
                setPlans(finalData.data)
            })
            .catch((error) => {
                toast.error("Please try again.")
            })
    }

    useEffect(() => {
        viewPlans()
    }, [])

    return (
        <>
            <div className='max-w-[1100px] m-auto p-2'>
                <div className='grid gap-4'>
                    {plans.map((items, index) => {
                        return (

                            // <div className="flex flex-row bg-white rounded-xl shadow p-6 gap-6 items-center">
                            //     {/* Image Section */}
                            //     <div>
                            //         <img
                            //             src={items.image}
                            //             alt="Lean & Green Dinner"
                            //             className="rounded-xl w-40 h-40 object-cover" />
                            //     </div>

                            //     {/* Info Section */}
                            //     <div className="flex flex-col flex-1 justify-between gap-2">
                            //         <div className="flex items-center mb-2">
                            //             <h2 className="text-2xl font-semibold text-gray-900 mb-1">
                            //                 {items.name}
                            //             </h2>
                            //         </div>
                            // <p className="text-gray-700 mb-1">{items.description}</p>
                            // <div className="text-gray-500 mb-2">Health Score: {items.healthScore}/100</div>
                            //         {/* Health Score Bar */}
                            // <div className="flex gap-1 mb-2">
                            //     {[...Array(10)].map((_, i) => (
                            //         <span
                            //             key={i}
                            //             className={`inline-block w-4 h-4 rounded-full ${i < Math.round(items.healthScore / 10) ? "bg-yellow-400" : "bg-gray-200"}`} />
                            //     ))}
                            // </div>
                            //     </div>

                            //     {/* Nutritional Info section */}
                            //     <div className="flex flex-col gap-3 bg-gray-50 p-6 rounded-xl min-w-[140px]" >
                            // <div className="flex items-center gap-2 text-gray-800 text-lg">
                            //     <span><FaFireFlameCurved /></span>
                            //     <span>{items.cal} Cal</span>
                            // </div>
                            // <div className="flex items-center gap-2 text-gray-800 text-lg">
                            //     <span> <CiWheat /></span>
                            //     <span>{items.carbs}g Carbs</span>
                            // </div>
                            // <div className="flex items-center gap-2 text-gray-800 text-lg">
                            //     <span><GiFoodChain /></span>
                            //     <span>{items.protein}g Protein</span>
                            // </div>
                            // <div className="flex items-center gap-2 text-gray-800 text-lg">
                            //     <span><IoWater /></span>
                            //     <span>{items.fats}g Fats</span>
                            // </div>
                            //     </div>
                            // </div>

                            <div className="flex flex-col md:flex-row bg-white rounded-xl shadow p-4 md:p-6 gap-4 md:gap-6 items-center md:items-stretch">
                                {/* Image Section */}
                                <div className="flex-shrink-0 mb-4 md:mb-0">
                                    <img
                                        src={items.image}
                                        alt="Lean & Green Dinner"
                                        className="rounded-xl w-32 h-32 md:w-40 md:h-40 object-cover mx-auto md:mx-0"
                                    />
                                </div>

                                {/* Info Section */}
                                <div className="flex flex-col flex-1 justify-between gap-2">
                                    <div className="flex flex-wrap items-center mb-2 gap-2">
                                        <span className={`${items.time == "Dinner" ? "bg-pink-100 text-pink-700" : items.time == "Breakfast" ? "bg-[#D3EAFD] text-[#389DF3]" : "bg-[#FDF1DB] text-[#fb8632]"}  px-3 py-1 rounded-xl text-sm font-medium`}>
                                            {items.time}
                                        </span>
                                    </div>
                                    <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-1">
                                        {items.name}
                                    </h2>
                                    <p className="text-gray-700 mb-1">{items.description}</p>
                                    <div className="text-gray-500 mb-2 text-sm md:text-base">Health Score: 85/100</div>
                                    {/* Health Score Bar */}
                                    <div className="flex gap-1 mb-2">
                                        {[...Array(10)].map((_, i) => (
                                            <span
                                                key={i}
                                                className={`inline-block w-4 h-4 rounded-full ${i < Math.round(items.healthScore / 10) ? "bg-yellow-400" : "bg-gray-200"}`} />
                                        ))}
                                    </div>
                                </div>

                                {/* Nutritional Info section */}
                                <div className="flex flex-col gap-3 bg-gray-50 p-4 md:p-6 rounded-xl min-w-[120px] md:min-w-[140px] w-full md:w-auto mt-4 md:mt-0">
                                    <div className="flex items-center gap-2 text-gray-800 text-base md:text-lg">
                                        <span><FaFireFlameCurved /></span>
                                        <span>{items.cal} Cal</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-800 text-base md:text-lg">
                                        <span> <CiWheat /></span>
                                        <span>{items.carbs}g Carbs</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-800 text-base md:text-lg">
                                        <span><GiFoodChain /></span>
                                        <span>{items.protein}g Protein</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-800 text-base md:text-lg">
                                        <span><IoWater /></span>
                                        <span>{items.fats}g Fats</span>
                                    </div>
                                </div>
                            </div>




                        );
                    })}
                </div >
            </div >
        </>
    )
}
