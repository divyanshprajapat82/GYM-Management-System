import axios from "axios";
import { useEffect, useState } from "react";
import { MdAdminPanelSettings, MdArrowBack, MdEmail, MdPerson } from "react-icons/md";
import { useNavigate, useParams } from "react-router";
import { toast, ToastContainer } from "react-toastify";

export default function AddMembers() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        role: "member",
        membership: ""
    });

    const navigate = useNavigate();
    let ADMIN_URL = import.meta.env.VITE_ADMIN_URL

    let { id } = useParams()

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Submitted:", formData);

        let AddUserObj = {
            userName: formData.name,
            userEmail: formData.email,
            userType: formData.role,
            membership: formData.membership
        }

        console.log(AddUserObj);


        if (id) {
            axios.put(`${ADMIN_URL}/admin/auth/update/${id}`, AddUserObj)
                .then((res) => res.data)
                .then((finalData) => {
                    if (finalData.status) {
                        toast.success("You Updates")
                    } else {
                        toast.error(finalData.message || "Invalid username or password")
                    }
                })
                .catch((error) => {
                    toast.error("Login failed. Please try again.")
                    console.error("Login error:", error)
                })
        } else {
            axios.post(`${ADMIN_URL}/admin/auth/add-user`, AddUserObj)
                .then((res) => res.data)
                .then((finalData) => {
                    if (finalData.status) {
                        toast.success("You logged In")
                        navigate('../view/members')
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

    console.log(id);


    useEffect(() => {
        setFormData({
            name: "",
            email: "",
            membership: ""
        })

        if (id) {
            axios.get(`http://localhost:8000/admin/auth/view/${id}`)
                .then((res) => res.data)
                .then((finalData) => {
                    // setMembers(finalData.data)
                    setFormData({
                        name: finalData.data[0].userName,
                        email: finalData.data[0].userEmail,
                        membership: finalData.data[0].membership
                    })
                })
                .catch((error) => {
                    toast.error("Login failed. Please try again.")
                    console.error("Login error:", error)
                })
        } else {
            setFormData({
                name: "",
                email: "",
                membership: ""
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
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Name */}
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

                            {/* Email */}
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

                            {/* Role */}
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

                            {/* Submit */}
                            <button
                                type="submit"
                                className="w-full py-3 px-6 bg-green-500 text-white font-semibold rounded-lg shadow hover:bg-green-600 hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200"
                            >
                                {id ? "Update Member" : "Save Member"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>

    );
}
