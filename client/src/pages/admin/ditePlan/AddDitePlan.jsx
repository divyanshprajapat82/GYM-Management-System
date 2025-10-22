import axios from "axios";
import { useEffect, useState } from "react";
import { CiWheat } from "react-icons/ci";
import { FaFireFlameCurved } from "react-icons/fa6";
import { GiFoodChain, GiFruitBowl } from "react-icons/gi";
import { IoIosTime } from "react-icons/io";
import { IoWater } from "react-icons/io5";
import { MdAdminPanelSettings, MdArrowBack, MdEmail, MdPerson, MdScoreboard } from "react-icons/md";
import { VscLoading } from "react-icons/vsc";
import { useNavigate, useParams } from "react-router";
import { toast, ToastContainer } from "react-toastify";

export default function AddDitePlan() {
    const [preview, setPreview] = useState("")
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: "",
        healthScore: "",
        time: "",
        description: "",
        cal: "",
        carbs: "",
        protein: "",
        fats: "",
        image: "",
    });

    const navigate = useNavigate();
    let ADMIN_URL = import.meta.env.VITE_ADMIN_URL


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
        //     userName: formData.name,
        //     userEmail: formData.email,
        //     userType: formData.role,
        //     membership: formData.membership
        // }

        console.log(AddUserObj);


        if (id) {
            axios.put(`http://localhost:8000/admin/dite/update/${id}`, AddUserObj)
                .then((res) => res.data)
                .then((finalData) => {
                    if (finalData.status) {
                        setLoading(false)
                        setTimeout(() => {
                            navigate("../view/dite")
                        }, 1000)
                    } else {
                        toast.error(finalData.message || "Invalid username or password")
                    }
                })
                .catch((error) => {
                    toast.error("Login failed. Please try again.")
                    console.error("Login error:", error)
                })
        } else {
            axios.post(`${ADMIN_URL}/admin/dite/add-dite`, AddUserObj)
                .then((res) => res.data)
                .then((finalData) => {
                    if (finalData.status) {
                        setLoading(false)
                        setTimeout(() => {
                            navigate("../view/dite")
                        }, 1000)
                    } else {
                        toast.error(finalData.message || "Invalid username or password")
                    }
                })
                .catch((error) => {
                    toast.error("Login failed. Please try again.")
                    console.error("Login error:", error)
                })
        }
    };

    // console.log(id);


    useEffect(() => {
        setFormData({
            name: "",
            healthScore: "",
            time: "",
            description: "",
            cal: "",
            carbs: "",
            protein: "",
            fats: "",
        })

        if (id) {
            axios.get(`${ADMIN_URL}/admin/dite/view/${id}`)
                .then((res) => res.data)
                .then((finalData) => {
                    // setMembers(finalData.data)
                    setFormData({
                        name: finalData.data[0].name,
                        healthScore: finalData.data[0].healthScore,
                        time: finalData.data[0].time,
                        description: finalData.data[0].description,
                        cal: finalData.data[0].cal,
                        carbs: finalData.data[0].carbs,
                        protein: finalData.data[0].protein,
                        fats: finalData.data[0].fats,
                    })
                    setPreview(finalData.data[0].image)
                })
                .catch((error) => {
                    toast.error("Please try again.")
                })
        } else {
            setFormData({
                name: "",
                healthScore: "",
                time: "",
                description: "",
                cal: "",
                carbs: "",
                protein: "",
                fats: "",
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
                            <h2 className="text-2xl font-bold text-gray-800">Add Dite Plan</h2>
                            {/* <button
                                onClick={() => navigate("/view/members")}
                                className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition shadow-sm"
                            >
                                <MdArrowBack className="text-lg" /> Back
                            </button> */}
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">
                                    Dite Name
                                </label>
                                <div className="flex items-center border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-green-500">
                                    <span className="px-3 text-gray-400">
                                        {/* <MdPerson /> */}
                                        <GiFruitBowl />
                                    </span>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Enter Dite name"
                                        required
                                        className="w-full px-4 py-2 outline-none text-gray-700"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-1">
                                        Health Score
                                    </label>
                                    <div className="flex items-center border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-green-500">
                                        <span className="px-3 text-gray-400">
                                            {/* <MdPerson /> */}
                                            <MdScoreboard />
                                        </span>
                                        <input
                                            type="number"
                                            name="healthScore"
                                            min={0}
                                            max={100}
                                            value={formData.healthScore}
                                            onChange={handleChange}
                                            placeholder="Enter Health Score"
                                            required
                                            className="w-full px-4 py-2 outline-none text-gray-700"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-1">
                                        Dite time
                                    </label>
                                    <div className="flex items-center border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-green-500">
                                        <span className="px-3 text-gray-400">
                                            {/* <MdAdminPanelSettings /> */}
                                            <IoIosTime />
                                        </span>
                                        <select
                                            name="time"
                                            value={formData.time}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 outline-none text-gray-700 bg-white"
                                        >
                                            <option>Select Dite Time</option>
                                            <option value="Breakfast">Breakfast</option>
                                            <option value="Lunch">Lunch</option>
                                            <option value="Dinner">Dinner</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Email */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-1">
                                        Calories
                                    </label>
                                    <div className="flex items-center border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-green-500">
                                        <span className="px-3 text-gray-400">
                                            {/* <MdPerson /> */}
                                            <FaFireFlameCurved />
                                        </span>
                                        <input
                                            type="number"
                                            name="cal"
                                            value={formData.cal}
                                            onChange={handleChange}
                                            placeholder="Enter Calories"
                                            required
                                            className="w-full px-4 py-2 outline-none text-gray-700"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-1">
                                        Carbs
                                    </label>
                                    <div className="flex items-center border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-green-500">
                                        <span className="px-3 text-gray-400">
                                            {/* <MdPerson /> */}
                                            <CiWheat />
                                        </span>
                                        <input
                                            type="number"
                                            name="carbs"
                                            value={formData.carbs}
                                            onChange={handleChange}
                                            placeholder="Enter Carbs"
                                            required
                                            className="w-full px-4 py-2 outline-none text-gray-700"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-1">
                                        Protein
                                    </label>
                                    <div className="flex items-center border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-green-500">
                                        <span className="px-3 text-gray-400">
                                            {/* <MdPerson /> */}
                                            <GiFoodChain />
                                        </span>
                                        <input
                                            type="number"
                                            name="protein"
                                            value={formData.protein}
                                            onChange={handleChange}
                                            placeholder="Enter Protein"
                                            required
                                            className="w-full px-4 py-2 outline-none text-gray-700"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-1">
                                        Fats
                                    </label>
                                    <div className="flex items-center border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-green-500">
                                        <span className="px-3 text-gray-400">
                                            {/* <MdPerson /> */}
                                            <IoWater />
                                        </span>
                                        <input
                                            type="number"
                                            name="fats"
                                            value={formData.fats}
                                            onChange={handleChange}
                                            placeholder="Enter Fats"
                                            required
                                            className="w-full px-4 py-2 outline-none text-gray-700"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Role */}
                            {/* <div>
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
                            </div> */}
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">
                                    Protein
                                </label>
                                <div className="flex items-center border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-green-500">
                                    {/* <span className="px-3 text-gray-400"> */}
                                    {/* <MdPerson /> */}
                                    {/* </span> */}
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        rows={5}
                                        className="w-full px-4 py-2 outline-none text-gray-700"
                                        placeholder="Enter Description"
                                        required
                                    ></textarea>
                                </div>
                            </div>

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
                                        <div className='h-[200px] p-4 bg-[#F4F7FF] border-2 border-dashed border-green-500 rounded-2xl'>
                                            <div className='flex flex-col justify-center h-full items-center gap-4'>
                                                <h1 className='text-[30px] text-green-500 font-bold'>
                                                    {preview ? (
                                                        <img
                                                            src={preview}
                                                            alt="Logo Preview"
                                                            className="w-70 h-24 object-cover rounded-[5px] border border-[#00000019] mt-3"
                                                        />
                                                    ) : "Add Dite Image"}
                                                </h1>
                                                <label htmlFor="image" className='px-10 py-2 bg-green-500 text-[#fff] font-semibold rounded-[5px] hover:px-12 hover:py-2.5 transition-all duration-300 cursor-pointer'>
                                                    {preview ? "Change Image" : "Upload"}
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </label>
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                className="w-full py-3 px-6 bg-green-500 text-white font-semibold rounded-lg shadow hover:bg-green-600 hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200 cursor-pointer"
                            >
                                {loading ?
                                    <span className="flex justify-center text-2xl animate-spin cursor-progress">
                                        <VscLoading />
                                    </span>
                                    :
                                    id ? "Update Dite" : "Add Dite"
                                }
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>

    );
}
