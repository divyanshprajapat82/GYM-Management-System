import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { loginContext } from '../context/MainContext'

export default function MembersDeshboard() {
  const { adminID } = useContext(loginContext)
  const navigate = useNavigate()

  useEffect(() => {
    // Check if user is authenticated
    if (!adminID || adminID === "") {
      navigate("/login")
    }
  }, [adminID, navigate])

  // Show loading or redirect if not authenticated
  if (!adminID || adminID === "") {
    return <div>Redirecting...</div>
  }

  return (
    <div>
      <h1>Members Dashboard</h1>
      <p>Welcome, Member! Your ID: {adminID}</p>
    </div>
  )
}
