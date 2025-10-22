import axios from "axios";
import { useEffect, useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { MdAdminPanelSettings, MdArrowBack, MdEmail, MdPerson } from "react-icons/md";
import { VscLoading } from "react-icons/vsc";
import { useNavigate, useParams } from "react-router";
import { toast, ToastContainer } from "react-toastify";

export default function AddSupplement() {

    const [preview, setPreview] = useState("")
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: "",
        brand: "",
        amount: "",
        stock: "",
        image: ""
    });

    const navigate = useNavigate()
    let ADMIN_URL = import.meta.env.VITE_ADMIN_URL


    // const navigate = useNavigate();

    let { id } = useParams()

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true)
        let AddUserObj = new FormData(e.target)

        console.log("Form Submitted:", AddUserObj);



        // let AddUserObj = {
        //     name: formData.name,
        //     brand: formData.brand,
        //     amount: formData.amount,
        //     stock: formData.stock,
        //     image: formData.image
        // }

        // console.log(AddUserObj);


        if (id) {
            axios.put(`http://localhost:8000/admin/store/update/${id}`, AddUserObj)
                .then((res) => res.data)
                .then((finalData) => {
                    if (finalData.status) {
                        setLoading(false)
                        setTimeout(() => {
                            navigate("../view/store")
                        }, 1000)
                    } else {
                        toast.error(finalData.message || "Product Not Update")
                    }
                })
                .catch((error) => {
                    toast.error("Please try again.")
                })
        } else {
            axios.post(`${ADMIN_URL}/admin/store/add-product`, AddUserObj)
                .then((res) => res.data)
                .then((finalData) => {
                    if (finalData.status) {
                        setLoading(false)
                        setTimeout(() => {
                            navigate("../view/store")
                        }, 1000)
                    } else {
                        toast.error(finalData.message || "Product Not Saved")
                    }
                })
                .catch((error) => {
                    toast.error("Please try again.")
                })
        }
    };

    // console.log(id);


    useEffect(() => {
        setFormData({
            name: "",
            brand: "",
            amount: "",
            stock: "",
            image: ""
        })

        if (id) {
            axios.get(`http://localhost:8000/admin/store/view/${id}`)
                .then((res) => res.data)
                .then((finalData) => {
                    // setMembers(finalData.data)
                    setFormData({
                        name: finalData.data[0].name,
                        brand: finalData.data[0].brand,
                        amount: finalData.data[0].amount,
                        stock: finalData.data[0].stock
                        // amount: finalData.data[0].amount
                    })
                    setPreview(finalData.data[0].image)
                })
                .catch((error) => {
                    toast.error("Please try again.")
                })
        } else {
            setFormData({
                name: "",
                brand: "",
                amount: "",
                stock: "",
                image: ""
            })
        }
    }, [id])

    return (
        <>
            <ToastContainer hideProgressBar position="top-center" closeButton={false} autoClose={2000} />
            <div className="min-h-screen bg-gray-50 flex  justify-center p-4">
                <div className="w-full max-w-2xl">
                    {/* Card */}
                    <div className="bg-white shadow-xl rounded-2xl p-8">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-bold text-gray-800">Add New Member</h2>
                            {/* <button
                                onClick={() => navigate("/view/members")}
                                className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition shadow-sm"
                            >
                                <MdArrowBack className="text-lg" /> Back
                            </button> */}
                        </div>

                        {/* Form */}
                        {/* <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">
                                    Full Name
                                </label>
                                <div className="flex items-center border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-green-500">
                                    <span className="px-3 text-gray-400">
                                        <MdPerson />
                                    </span>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Enter member name"
                                        required
                                        className="w-full px-4 py-2 outline-none text-gray-700"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">
                                    Email Address
                                </label>
                                <div className="flex items-center border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-green-500">
                                    <span className="px-3 text-gray-400">
                                        <MdEmail />
                                    </span>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Enter member email"
                                        required
                                        className="w-full px-4 py-2 outline-none text-gray-700"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">
                                    Membership
                                </label>
                                <div className="flex items-center border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-green-500">
                                    <span className="px-3 text-gray-400">
                                        <MdAdminPanelSettings />
                                    </span>
                                    <select
                                        name="membership"
                                        value={formData.membership}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 outline-none text-gray-700 bg-white"
                                    >
                                        <option>Select Plan</option>
                                        <option value="Basic Plan">Basic Plan</option>
                                        <option value="Standard Plan">Standard Plan</option>
                                        <option value="Premium Plan">Premium Plan</option>
                                    </select>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full py-3 px-6 bg-green-500 text-white font-semibold rounded-lg shadow hover:bg-green-600 hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200"
                            >
                                {id ? "Update Member" : "Save Member"}
                            </button>
                        </form> */}
                        {/* <form className="grid grid-cols-1 md:grid-cols-2 gap-4"> */}
                        <form onSubmit={handleSubmit} className="">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Product Name"
                                    className="border rounded px-3 py-2 w-full"
                                />
                                <input
                                    type="text"
                                    name="brand"
                                    value={formData.brand}
                                    onChange={handleChange}
                                    placeholder="Brand Name"
                                    className="border rounded px-3 py-2 w-full"
                                />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
                                <input
                                    type="number"
                                    name="amount"
                                    value={formData.amount}
                                    onChange={handleChange}
                                    placeholder="Price"
                                    className="border rounded px-3 py-2 w-full"
                                />
                                <input
                                    type="number"
                                    name="stock"
                                    value={formData.stock}
                                    onChange={handleChange}
                                    placeholder="Stock Quantity"
                                    className="border rounded px-3 py-2 w-full"
                                />
                            </div>
                            {/* <input
                                type="text"
                                name="image"
                                // value={formData.image}
                                // onChange={handleChange}
                                placeholder="Image URL"
                                className="border rounded px-3 py-2 w-full md:col-span-2"
                            /> */}
                            {/* <div className="md:col-span-2 flex flex-col items-center border-2 border-dashed border-gray-300 rounded-lg p-4 cursor-pointer hover:border-blue-500">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={e => {
                                        const file = e.target.files[0];
                                        if (file) {
                                            const reader = new FileReader();
                                            reader.onloadend = () => setImageTarget(reader.result);
                                            reader.readAsDataURL(file);
                                        }
                                    }}
                                    className="hidden"
                                    id="imageInput"
                                />
                                <label htmlFor="imageInput" className="text-blue-600 font-semibold cursor-pointer">
                                    {preview ? "Change Image" : "Select Product Image"}
                                </label>
                                {preview && (
                                    <img
                                        src={preview}
                                        alt="Preview"
                                        className="w-32 h-32 object-cover rounded mt-3 shadow"
                                    />
                                )}
                            </div> */}
                            <div className='-full flex flex-col text-[#000] mb-4'>
                                <label htmlFor="" className='text-[18px] text-[#000000d8] mb-1'>Add Product Image</label>
                                <input
                                    type="file"
                                    name='image'
                                    id="image"
                                    accept="image/*"
                                    // required={updateData.length === 0}
                                    // value={imageTarget.LogoImage}
                                    onChange={e => {
                                        // let obj = { ...imageTarget }
                                        // obj['LogoImage'] = e.target.value
                                        // setAccountSItems(obj)
                                        const file = e.target.files[0];
                                        if (file) {
                                            const reader = new FileReader();
                                            reader.onloadend = () => setPreview(reader.result);
                                            reader.readAsDataURL(file);
                                        }
                                    }}
                                    className="hidden"
                                />
                                <label htmlFor="">
                                    <div>
                                        <div className='h-[200px] p-4 bg-[#F4F7FF] border-2 border-dashed border-[#666efb] rounded-2xl'>
                                            <div className='flex flex-col justify-center h-full items-center gap-4'>
                                                <h1 className='text-[30px] text-[#666efb] font-bold'>
                                                    {preview ? (
                                                        <img
                                                            src={preview}
                                                            alt="Logo Preview"
                                                            className="w-70 h-24 object-cover rounded-[5px] border border-[#00000019] mt-3"
                                                        />
                                                    ) : "Add Product Image"}
                                                </h1>
                                                <label htmlFor="image" className='px-10 py-2 bg-[#4A7CE8] text-[#fff] font-semibold rounded-[5px] hover:px-12 hover:py-2.5 transition-all duration-300 cursor-pointer'>
                                                    {preview ? "Change Image" : "Upload"}
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </label>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 cursor-pointer"
                            >
                                {loading ?
                                    <span className="flex justify-center text-2xl animate-spin">
                                        <VscLoading />
                                    </span>
                                    :
                                    id ? "Update Product" : "Add Product"
                                }

                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>

    );
}
