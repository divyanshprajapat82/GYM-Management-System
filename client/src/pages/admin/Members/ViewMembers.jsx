import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdAdd, MdDelete, MdEdit } from "react-icons/md";
import { Link } from "react-router";
import { toast, ToastContainer } from "react-toastify";

export default function ViewMembers() {
    const [members, setMembers] = useState([]);
    let ADMIN_URL = import.meta.env.VITE_ADMIN_URL


    // Simulate fetching data from an API
    // useEffect(() => {
    //     // Replace this with an actual API call
    //     const fetchMembers = async () => {
    //         const data = [
    //             {
    //                 id: 1,
    //                 name: "John Doe",
    //                 email: "john@example.com",
    //                 membership: "Gold",
    //             },
    //             {
    //                 id: 2,
    //                 name: "Jane Smith",
    //                 email: "jane@example.com",
    //                 membership: "Silver",
    //             },
    //         ];
    //         setMembers(data);
    //     };

    //     fetchMembers();
    // }, []);

    let viewMember = () => {
        axios.get("http://localhost:8000/admin/auth/view")
            .then((res) => res.data)
            .then((finalData) => {
                // if (finalData.status) {
                // } else {
                //     toast.error(finalData.message || "Invalid username or password")
                // }
                setMembers(finalData.data)
            })
            .catch((error) => {
                toast.error("Login failed. Please try again.")
                console.error("Login error:", error)
            })
    }

    let deleteMember = (e) => {
        // e.preventDefault()
        // if (e) {
        axios.delete(`${ADMIN_URL}/admin/auth/delete/${e}`)
            .then((res) => res.data)
            .then((finalData) => {
                if (finalData.status) {
                    viewMember()
                    toast.success("User Deleted")
                } else {
                    toast.error(finalData.message || "User Not Deleted")
                }
                // setMembers(finalData.data)
            })
            .catch((error) => {
                toast.error("Login failed. Please try again.")
            })
        // }
    }

    // let singleView = () => {
    //     axios.get(`http://localhost:8000/admin/auth/view/`)
    //         .then((res) => res.data)
    //         .then((finalData) => {
    //             setMembers(finalData.data)
    //         })
    //         .catch((error) => {
    //             toast.error("Login failed. Please try again.")
    //             console.error("Login error:", error)
    //         })
    // }

    useEffect(() => {
        viewMember()
        // deleteMember()
        // singleView()
    }, [])


    // Placeholder for delete functionality
    // const handleDelete = (id) => {
    //     const updatedMembers = members.filter((member) => member.id !== id);
    //     setMembers(updatedMembers);
    //     alert(`Member with ID ${id} deleted.`);
    // };

    // // Placeholder for edit functionality
    // const handleEdit = (id) => {
    //     alert(`Edit functionality for Member ID ${id} is not implemented yet.`);
    // };

    return (
        <>
            {/* <div className="bg-[#f7f7f7] rounded-[12px] p-5 shadow-sm">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-[22px] font-semibold">Admin Dashboard</h2>
          <span className="text-sm text-gray-500">Overview</span>
        </div> */}
            {/* <div className="bg-gray-100 rounded-lg p-6 shadow-md">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">Admin Dashboard</h2>
                    <button
                        className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white text-sm font-medium rounded-lg shadow hover:bg-green-600 hover:scale-105 transition duration-200 cursor"
                    >
                        <MdAdd className="text-lg" />
                        Add Member
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse bg-white rounded-lg shadow-md">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="px-4 py-2 border text-left text-sm font-medium text-gray-600">
                                    ID
                                </th>
                                <th className="px-4 py-2 border text-left text-sm font-medium text-gray-600">
                                    Name
                                </th>
                                <th className="px-4 py-2 border text-left text-sm font-medium text-gray-600">
                                    Email
                                </th>
                                <th className="px-4 py-2 border text-left text-sm font-medium text-gray-600">
                                    Membership
                                </th>
                                <th className="px-4 py-2 border text-left text-sm font-medium text-gray-600">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {members.map((member) => (
                                <tr key={member.id} className="hover:bg-gray-100">
                                    <td className="px-4 py-3 border text-sm text-gray-700">
                                        {member.id}
                                    </td>
                                    <td className="px-4 py-3 border text-sm text-gray-700">
                                        {member.name}
                                    </td>
                                    <td className="px-4 py-3 border text-sm text-gray-700">
                                        {member.email}
                                    </td>
                                    <td className="px-4 py-3 border text-sm text-gray-700">
                                        {member.membership}
                                    </td>
                                    <td className="px-4 py-3 border text-sm text-gray-700">
                                        <div className="flex space-x-1">
                                            <button
                                                onClick={() => handleEdit(member.id)}
                                                className="px-3 py-2 bg-blue-500 text-white text-sm font-medium rounded-full shadow hover:bg-blue-600 hover:scale-105 transition duration-200 cursor-pointer"
                                            >
                                                <MdEdit className="text-lg" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(member.id)}
                                                className="px-3 py-2 bg-red-500 text-white text-sm font-medium rounded-full shadow hover:bg-red-600 hover:scale-105 transition duration-200 cursor-pointer"
                                            >
                                                <MdDelete className="text-lg" />
                                            </button>
                                        </div>
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div> */}
            <ToastContainer hideProgressBar position="top-center" closeButton={false} autoClose={2000} />


            <div className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-gray-800">Members</h2>
                    <Link to={"../add/members"}>
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
                                <th className="px-6 py-3">#</th>
                                <th className="px-6 py-3">Name</th>
                                <th className="px-6 py-3">Email</th>
                                <th className="px-6 py-3">membership</th>
                                <th className="px-6 py-3 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {members.length > 0 ? (
                                members.map((items, index) => (
                                    <tr key={items.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-3">{index + 1}</td>
                                        <td className="px-6 py-3 font-medium text-gray-800">{items.userName}</td>
                                        <td className="px-6 py-3">{items.userEmail}</td>
                                        <td className="px-6 py-3">{items.membership}</td>
                                        <td className="px-6 py-3 text-center">
                                            <div className="flex items-center justify-center space-x-2">
                                                <Link to={`../add/members/${items._id}`}>
                                                    <button
                                                        className="flex items-center gap-1 px-3 py-1.5 bg-blue-500 text-white rounded-full text-xs hover:bg-blue-600 hover:scale-105 transition duration-200 cursor-pointer"
                                                    >
                                                        <MdEdit />
                                                        Edit
                                                    </button>
                                                </Link>
                                                <button
                                                    onClick={() => deleteMember(items._id)}
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
                                        No members found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            {/* </div> */}
        </>
    );
}
