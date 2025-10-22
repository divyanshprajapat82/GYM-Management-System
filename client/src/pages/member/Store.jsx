import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import { loginContext } from '../../context/MainContext';

export default function Store() {
    const { token } = useContext(loginContext)
    const [products, setProducts] = useState([]);
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


    let viewProduct = () => {
        axios.get(`${ADMIN_URL}/admin/store/view-product`)
            .then((res) => res.data)
            .then((finalData) => {
                setProducts(finalData.data)
            })
    }

    useEffect(() => {
        viewProduct()
    }, [])

    return (
        <>
            <div className='p-6'>
                <section className="md:col-span-3">
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="text-xl font-semibold">Products</h2>
                        <p className="text-sm text-gray-500">Showing {products.length} results</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {products.map((items, index) => (
                            <article key={items.id} className="bg-white rounded-2xl shadow p-4 hover:shadow-lg transition">
                                <div className="relative w-full flex justify-center">
                                    <img src={items.image} alt={items.name} className="h-50 rounded-xl" />
                                    {/* <div className="absolute top-3 left-3 bg-white/80 px-2 py-1 rounded-full text-xs font-medium">{p.size}</div> */}
                                </div>

                                <div className="mt-3">
                                    <h3 className="font-medium text-sm truncate">{items.name}</h3>
                                    <p className="text-xs text-gray-500">{items.brand} • {items.stock}</p>

                                    <div className="mt-3 flex items-center justify-between">
                                        <div>
                                            <div className="text-lg font-semibold">₹ {items.amount}</div>
                                            {/* <div className="text-xs text-gray-500">{items.rating} ★</div> */}
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <button
                                                // onClick={() => addToCart(p)} 
                                                className="px-3 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium shadow hover:bg-indigo-700 cursor-pointer">
                                                Buy
                                            </button>
                                            {/* <button className="px-3 py-2 rounded-lg border text-sm">Details</button> */}
                                        </div>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>

                    {/* empty state */}
                    {products.length === 0 && (
                        <div className="mt-8 bg-white p-6 rounded-xl text-center shadow">
                            <h4 className="text-lg font-medium">No products found</h4>
                            <p className="text-sm text-gray-500 mt-2">Try clearing filters or searching for something else.</p>
                        </div>
                    )}
                </section>
            </div>
        </>
    )
}
