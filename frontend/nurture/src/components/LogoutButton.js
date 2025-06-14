"use client"

import { useNavigate } from "react-router-dom"

const LogoutButton = ({ className, children }) => {
  const navigate = useNavigate()

  const handleLogout = () => {
    // Clear user data
    localStorage.removeItem("jwtToken")
    localStorage.removeItem("username")

    // Navigate to home page
    navigate("/")

    // Optional: Add visual feedback
    console.log("Logged out successfully")
  }

  return (
    <button className={className || "dropdown-item dropdown-item-logout"} onClick={handleLogout} type="button">
      {children || "🚪 Logout"}
    </button>
  )
}

export default LogoutButton
