import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { IoSearch } from 'react-icons/io5'
import { MdAdd, MdDelete, MdEdit } from 'react-icons/md'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { Link } from 'react-router'
import { ToastContainer } from 'react-toastify'

export default function ViewSupplement() {

    // const [products, setProducts] = useState([
    //     {
    //         id: 1,
    //         name: "Whey Protein",
    //         brand: "MuscleTech",
    //         price: 2499,
    //         stock: 12,
    //         image: "https://images.unsplash.com/photo-1598970434795-0c54fe7c0642?w=800&q=80",
    //     },
    //     {
    //         id: 2,
    //         name: "Creatine Monohydrate",
    //         brand: "Optimum Nutrition",
    //         price: 999,
    //         stock: 20,
    //         image: "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?w=800&q=80",
    //     },
    // ]);
    const [products, setProducts] = useState([]);
    let ADMIN_URL = import.meta.env.VITE_ADMIN_URL


    let viewProduct = () => {
        axios.get(`${ADMIN_URL}/admin/store/view-product`)
            .then((res) => res.data)
            .then((finalData) => {
                setProducts(finalData.data)
            })
    }

    let deleteProduct = (e) => {
        // e.preventDefault()
        // if (e) {
        axios.delete(`${ADMIN_URL}/admin/store/delete/${e}`)
            .then((res) => res.data)
            .then((finalData) => {
                if (finalData.status) {
                    viewProduct()
                    toast.success("Product Deleted")
                } else {
                    toast.error(finalData.message || "Product Not Deleted")
                }
                // setMembers(finalData.data)
            })
            .catch((error) => {
                toast.error("Please try again.")
                console.error("Login error:", error)
            })
        // }
    }

    useEffect(() => {
        viewProduct()
    }, [])
    return (
        <>
            <ToastContainer hideProgressBar position="top-center" closeButton={false} autoClose={2000} />




            <div className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-gray-800">Dite Plan</h2>
                    <Link to={"../add/store"}>
                        <button
                            // onClick={handleAddMember}
                            className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white text-sm font-medium rounded-lg shadow hover:bg-green-600 hover:scale-105 transition duration-200 cursor-pointer"
                        >
                            <MdAdd className="text-lg" />
                            Add Member
                        </button>
                    </Link>
                </div>

                {/* Table */}
                <div className="overflow-x-auto rounded-lg shadow">
                    <table className="w-full text-sm text-left text-gray-600">
                        <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                            <tr>
                                <th className="px-6 py-3">Image</th>
                                <th className="px-6 py-3">Name</th>
                                <th className="px-6 py-3">brand</th>
                                <th className="px-6 py-3">amount</th>
                                <th className="px-6 py-3">stock</th>
                                <th className="px-6 py-3 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {products.length > 0 ? (
                                products.map((items, index) => (
                                    <tr key={items.id} className="hover:bg-gray-50">
                                        {/* <td className="px-6 py-3">{index + 1}</td> */}
                                        <td className="p-3 ">
                                            <img
                                                src={items.image}
                                                // alt={p.name}
                                                className="w-16 h-16 object-cover rounded"
                                            />
                                        </td>
                                        <td className="px-6 py-3 font-medium text-gray-800">{items.name}</td>
                                        <td className="px-6 py-3">{items.brand}</td>
                                        <td className="px-6 py-3">{items.amount}</td>
                                        <td className="px-6 py-3">{items.stock}</td>
                                        <td className="px-6 py-3 text-center">
                                            <div className="flex items-center justify-center space-x-2">
                                                <Link to={`../add/store/${items._id}`}>
                                                    <button
                                                        className="flex items-center gap-1 px-3 py-1.5 bg-blue-500 text-white rounded-full text-xs hover:bg-blue-600 hover:scale-105 transition duration-200 cursor-pointer"
                                                    >
                                                        <MdEdit />
                                                        Edit
                                                    </button>
                                                </Link>
                                                <button
                                                    onClick={() => deleteProduct(items._id)}
                                                    className="flex items-center gap-1 px-3 py-1.5 bg-red-500 text-white rounded-full text-xs hover:bg-red-600 hover:scale-105 transition duration-200 cursor-pointer"
                                                >
                                                    <MdDelete />
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                                        No product found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

        </>
    )
}
