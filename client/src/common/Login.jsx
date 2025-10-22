import React, { useContext, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router'
import Footer from './Footer'
import { FaDumbbell, FaRegEye, FaRegEyeSlash } from 'react-icons/fa'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { loginContext } from '../context/MainContext'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    let { setUserRole, setToken, token } = useContext(loginContext)


    let navigate = useNavigate()

    useEffect(() => {
        if (token) {
            navigate("/")
        }
    }, [token, navigate])

    //   let navigate = useNavigate()

    // Check if user is already logged in, redirect to appropriate dashboard
    // useEffect(() => {
    //     // if (adminID !== "") {
    //     //     // User is already logged in, redirect to admin dashboard

    //     //     navigate("/admin/deshboard")
    //     // }
    // if (adminID == "admin") {
    //     navigate("/admin")
    // }
    // if (adminID == "member") {
    //     navigate("/member")
    // }
    // else {
    //     navigate("/")
    // }
    // if (adminID == "admin") {
    //     navigate("/admin/deshboard")
    // } else if (adminID == "member") {
    //     navigate("/members/deshboard")
    // } else {
    //     navigate("/")
    // }

    // }, [adminID, navigate])

    const handleSubmit = (e) => {
        e.preventDefault()

        let obj = {
            userEmail: email,
            userPassword: password
        }

        axios.post("http://localhost:8000/admin/auth/login", obj)
            .then((res) => res.data)
            .then((finalData) => {
                if (finalData.status) {
                    setToken(finalData.token)
                    toast.success("You logged In")
                    setUserRole(finalData.role[0].userType)
                    setTimeout(() => {
                        window.location.reload();
                    }, 1000);
                } else {
                    toast.error(finalData.message || "Invalid username or password")
                }
            })
            .catch((error) => {
                toast.error("Login failed. Please try again.")
                console.error("Login error:", error)
            })
    }

    // setAdminID(finalData.role[0].userType)

    // const userType = finalData.role?.[0]?.userType
    // setUserRole(finalData.role?.[0]?.userType)
    // if (userType === 'admin') {
    //     navigate('/admin')
    // } else if (userType === 'member') {
    //     navigate('/member')
    // } else {
    //     navigate('/')
    // }


    // console.log(finalData.token);


    // Store user ID in context and localStorage for authentication
    // setAdminID(finalData.role[0]._id || finalData.role[0].id)

    // navigate("/")

    // Navigate based on user type
    // if (finalData.role[0].userType == "admin") {
    //     navigate("/admin")
    // } else if (finalData.role[0].userType == "member") {
    //     navigate("/members")
    // } else if (finalData.role[0].userType == "user") {
    //     navigate("/")
    // }

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
                        <h2 className="text-[28px] font-bold mb-1">Welcome back</h2>
                        <p className="text-[#b8c0cc] mb-6">Log in to manage your gym membership</p>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block mb-2 text-[14px] text-[#b8c0cc]">Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="you@example.com"
                                    className="w-full bg-[#111418] border border-[#2a2f36] rounded-[10px] px-4 py-3 outline-none focus:border-[#FD4C00] transition-colors"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-[14px] text-[#b8c0cc]">Password</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Enter your password"
                                        className="w-full bg-[#111418] border border-[#2a2f36] rounded-[10px] px-4 py-3 pr-12 outline-none focus:border-[#FD4C00] transition-colors"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-6 -translate-y-1/2 text-[18px] text-[#b8c0cc] hover:text-[#fff] cursor-pointer"
                                    >
                                        {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-[#FD4C00] hover:bg-[#fd4c00bb] font-bold px-4 py-3 rounded-[10px] border-2 border-[#FD4C00] hover:border-[#fd4c00bb] transition-colors cursor-pointer"
                            >
                                Login
                            </button>
                        </form>

                        <div className="mt-6 text-center">
                            <p className="text-[#b8c0cc] text-[14px]">
                                Don't have an account?{' '}
                                <Link to="/register" className="text-[#FD4C00] hover:text-[#fd4c00bb] font-medium">
                                    Sign up
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
