import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import Footer from './Footer'
import { FaDumbbell, FaRegEye, FaRegEyeSlash } from 'react-icons/fa'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function Register() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        // phone: '',
        password: '',
        confirmPassword: ''
    })
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    let navigate = useNavigate()

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        // Validate passwords match
        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match")
            return
        }

        // Validate password length
        if (formData.password.length < 6) {
            toast.error("Password must be at least 6 characters long")
            return
        }

        let obj = {
            userName: formData.firstName + " " + formData.lastName,
            // firstName: formData.firstName,
            // lastName: formData.lastName,
            userEmail: formData.email,
            // userPhone: formData.phone,
            userPassword: formData.password
        }

        console.log(obj);


        axios.post("http://localhost:8000/admin/auth/register", obj)
            .then((res) => res.data)
            .then((finalData) => {
                if (finalData.status) {
                    toast.success("Registration successful! Please login.")
                    navigate("/login")
                } else {
                    toast.error(finalData.message || "Registration failed")
                }
            })
            .catch((error) => {
                toast.error("Registration failed. Please try again.")
                console.error("Registration error:", error)
            })
    }

    return (
        <>
            <ToastContainer hideProgressBar position="top-center" closeButton={false} autoClose={2000} />
            <div className='bg-[#121417] text-[#fff] px-4 py-5'>
                <Link to={"/"}>
                    <h1 className='flex items-center gap-2 text-[25px] text-[#fff] font-bold'>
                        GYM
                        <span className='text-[#FD4C00] rotate-90 mt-0.5'>
                            <FaDumbbell />
                        </span>
                    </h1>
                </Link>
                <div className=" flex items-center justify-center py-5">
                    <div className="w-full max-w-[420px] bg-[#1b1f24] border border-[#2a2f36] rounded-[14px] px-6 py-8 shadow-xl">
                        <h2 className="text-[28px] font-bold mb-1">Create Account</h2>
                        <p className="text-[#b8c0cc] mb-6">Join our gym and start your fitness journey</p>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block mb-2 text-[14px] text-[#b8c0cc]">First Name</label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        placeholder="John"
                                        className="w-full bg-[#111418] border border-[#2a2f36] rounded-[10px] px-4 py-3 outline-none focus:border-[#FD4C00] transition-colors"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block mb-2 text-[14px] text-[#b8c0cc]">Last Name</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        placeholder="Doe"
                                        className="w-full bg-[#111418] border border-[#2a2f36] rounded-[10px] px-4 py-3 outline-none focus:border-[#FD4C00] transition-colors"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block mb-2 text-[14px] text-[#b8c0cc]">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="you@example.com"
                                    className="w-full bg-[#111418] border border-[#2a2f36] rounded-[10px] px-4 py-3 outline-none focus:border-[#FD4C00] transition-colors"
                                    required
                                />
                            </div>

                            {/* <div>
                            <label className="block mb-2 text-[14px] text-[#b8c0cc]">Phone Number</label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="+1 (555) 123-4567"
                                className="w-full bg-[#111418] border border-[#2a2f36] rounded-[10px] px-4 py-3 outline-none focus:border-[#FD4C00] transition-colors"
                                required
                            />
                        </div> */}

                            <div>
                                <label className="block mb-2 text-[14px] text-[#b8c0cc]">Password</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="Enter your password"
                                        className="w-full bg-[#111418] border border-[#2a2f36] rounded-[10px] px-4 py-3 pr-12 outline-none focus:border-[#FD4C00] transition-colors"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-2/6 -translate-y-1/2 text-[18px] text-[#b8c0cc] hover:text-[#fff] cursor-pointer"
                                    >
                                        {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label className="block mb-2 text-[14px] text-[#b8c0cc]">Confirm Password</label>
                                <div className="relative">
                                    <input
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        placeholder="Confirm your password"
                                        className="w-full bg-[#111418] border border-[#2a2f36] rounded-[10px] px-4 py-3 pr-12 outline-none focus:border-[#FD4C00] transition-colors"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-4 top-2/6 -translate-y-1/2 text-[18px] text-[#b8c0cc] hover:text-[#fff] cursor-pointer"
                                    >
                                        {showConfirmPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-[#FD4C00] hover:bg-[#fd4c00bb] font-bold px-4 py-3 rounded-[10px] border-2 border-[#FD4C00] hover:border-[#fd4c00bb] transition-colors cursor-pointer"
                            >
                                Create Account
                            </button>
                        </form>

                        <div className="mt-6 text-center">
                            <p className="text-[#b8c0cc] text-[14px]">
                                Already have an account?{' '}
                                <Link to="/login" className="text-[#FD4C00] hover:text-[#fd4c00bb] font-medium">
                                    Sign in
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    )
}
