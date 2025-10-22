import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let loginContext = createContext()

export function MainContext({ children }) {
    // const [adminID, setAdminID] = useState(localStorage.getItem("ADMINID") ?? "")
    // const [token, setToken] = useState(localStorage.getItem("USER") ?? "")
    const [userRole, setUserRole] = useState(localStorage.getItem("USERROLE") ?? "")
    const [token, setToken] = useState(localStorage.getItem("TOKEN") ?? "")
    const [userData, setUserData] = useState([])
    // let token = localStorage.getItem("TOKEN")

    const [role, setRole] = useState("")

    // console.log(token);


    useEffect(() => {
        if (userRole) {
            localStorage.setItem("USERROLE", userRole)
        } else {
            localStorage.removeItem("USERROLE")
        }
    }, [userRole])
    useEffect(() => {
        if (token) {
            localStorage.setItem("TOKEN", token)
        } else {
            localStorage.removeItem("TOKEN")
        }
    }, [token])

    // Function to clear admin data (for logout)
    // const clearAdminData = () => {
    //     setAdminID("")
    //     localStorage.removeItem("ADMINID")
    // }

    // useEffect(() => {
    //     axios.get("http://localhost:8000/admin/auth/view"
    //         // , 
    //         // obj,
    //         // {
    //         //     headers: {
    //         //         Authorization: `Bearer ${localStorage.getItem("TOKEN")}`
    //         //     }
    //         // }
    //     )
    //         .then((res) => res.data)
    //         .then((finalData) => {
    //             // if (finalData.status) {
    //             // } else {
    //             //     toast.error(finalData.message || "Invalid username or password")
    //             // }
    //             // console.log("Data");

    //         })
    //         .catch((error) => {
    //             // toast.error("Login failed. Please try again.")
    //             // console.error("Login error:", error)
    //         })
    // }, [])

    useEffect(() => {
        axios.get("http://localhost:8000/admin/auth/profile-View",
            {
                headers: {
                    // Authorization: `Bearer ${localStorage.getItem("TOKEN")}`
                    Authorization: `Bearer ${token}`
                }
            }
        )
            .then((res) => res.data)
            .then((finalData) => {
                // if (finalData.status) {
                // } else {
                //     toast.error(finalData.message || "Invalid username or password")
                // }
                // console.log("Global Api Data", finalData.data);
                // SetUserData(finalData.data)

                if (finalData.status) {
                    setUserData(finalData.data);
                } else {
                    // toast.error(finalData.msg || "Failed to load profile");
                }

            })
            .catch((error) => {
                // toast.error("Login failed. Please try again.")
                // console.error("Login error:", error)
            })
    }, [])

    let obj = {
        userRole, setUserRole,
        // clearAdminData,
        role, setRole,
        token, setToken,
        userData
    }
    return (
        <loginContext.Provider value={obj}>
            {children}
        </loginContext.Provider>
    )
}
