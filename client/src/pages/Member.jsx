import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { loginContext } from '../context/MainContext'
import axios from 'axios'
import { MdDownload } from 'react-icons/md'
import jsPDF from 'jspdf'
// import jsPDF from "jspdf";


export default function Member() {
    const { token } = useContext(loginContext)
    const [bills, setBills] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        // Check if user is authenticated
        if (!token || token === "") {
            navigate("/login")
        }
    }, [token, navigate])

    // Show loading or redirect if not authenticated
    if (!token || token === "") {
        return <div>Redirecting...</div>
    }

    // let userView = () => {
    //     axios.get("http://localhost:8000/admin/auth/view",
    //         {
    //             headers: {
    //                 Authorization: `Bearer ${localStorage.getItem("TOKEN")}`
    //             }
    //         }
    //     )
    //         .then((res) => res.data)
    //         .then((finalData) => {
    //             if (finalData.status) {
    //             } else {
    //                 toast.error(finalData.message || "Invalid username or password")
    //             }
    //         })
    //         .catch((error) => {
    //             toast.error("Login failed. Please try again.")
    //             console.error("Login error:", error)
    //         })
    // }

    let ADMIN_URL = import.meta.env.VITE_ADMIN_URL


    let viewPlans = () => {
        axios.get(`${ADMIN_URL}/admin/bill/member-View`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("TOKEN")}`
                }
            }
        )
            .then((res) => res.data)
            .then((finalData) => {
                setBills(finalData.data)
                console.log(finalData);

            })
            .catch((error) => {
                // toast.error("Please try again.")
            })
    }

    useEffect(() => {
        viewPlans()
    }, [])

    //     const doc = new jsPDF();

    //     // Colors
    //     const primaryColor = [40, 116, 240]; // blue
    //     const textColor = [33, 33, 33];

    //     // Header background
    //     doc.setFillColor(...primaryColor);
    //     doc.rect(0, 0, 210, 30, "F");

    //     // Header title
    //     doc.setFontSize(20);
    //     doc.setTextColor(255, 255, 255);
    //     doc.text("GYM", 105, 20, { align: "center" });

    //     // Logo (optional)
    //     // doc.addImage(logoBase64, "PNG", 10, 5, 20, 20);

    //     // Main body box
    //     doc.setDrawColor(200, 200, 200);
    //     doc.setLineWidth(0.5);
    //     doc.rect(10, 40, 190, 100);

    //     // Customer details
    //     doc.setTextColor(...textColor);
    //     doc.setFontSize(12);
    //     doc.text("Customer Details", 15, 50);
    //     doc.line(15, 52, 60, 52);

    //     doc.setFontSize(11);
    //     doc.text(`Name: ${bill.userId.userName}`, 15, 60);
    //     doc.text(`Email: ${bill.email}`, 15, 60);
    //     doc.text(`Date: ${bill.date}`, 15, 70);

    //     // Bill details
    //     doc.setFontSize(12);
    //     doc.text("Payment Summary", 15, 85);
    //     doc.line(15, 87, 65, 87);

    //     // doc.text(`Bill Amount: ${bill.amount} INR`, 15, 95, { align: "left" });


    //     doc.setFontSize(11);
    //     doc.setFont("helvetica", "normal")
    //     doc.text(`Bill Amount: ${bill.amount} INR`, 15, 95);
    //     doc.text(`Payment Method: ${bill.method || "Online"}`, 15, 105);
    //     doc.text(`Membership Type: ${bill.plan || "Monthly"}`, 15, 115);

    //     // Footer line
    //     doc.setDrawColor(...primaryColor);
    //     doc.setLineWidth(0.8);
    //     doc.line(10, 150, 200, 150);


    //     // Signature line
    //     doc.setTextColor(0);
    //     doc.line(150, 130, 190, 130);
    //     doc.text("Authorized Signature", 170, 135, { align: "center" });

    //     // Footer message
    //     doc.setTextColor(100);
    //     doc.setFontSize(11);
    //     doc.text("Thank you for choosing our gym! Stay fit, stay strong", 105, 160, {
    //         align: "center",
    //     });


    //     // Save file
    //     doc.save(`Gym_Bill_${bill.email}.pdf`);
    // };

    const handleDownload = (bill) => {
        const doc = new jsPDF();

        // Colors
        const primaryColor = [40, 116, 240]; // blue
        const textColor = [33, 33, 33];

        // Header background
        doc.setFillColor(...primaryColor);
        doc.rect(0, 0, 210, 30, "F");

        // Header title
        doc.setFontSize(20);
        doc.setTextColor(255, 255, 255);
        doc.text("GYM", 105, 20, { align: "center" });

        // Main body box
        doc.setDrawColor(200, 200, 200);
        doc.setLineWidth(0.5);
        doc.rect(10, 40, 190, 100);

        // Customer details
        doc.setTextColor(...textColor);
        doc.setFontSize(12);
        doc.text("Customer Details", 15, 50);
        doc.setLineWidth(0.5);
        doc.line(15, 52, 60, 52);

        // Info start position
        let startY = 60;
        let lineGap = 10;

        doc.setFontSize(11);
        doc.text(`Name: ${bill.userId.userName}`, 15, startY);
        doc.text(`Email: ${bill.email}`, 15, startY + lineGap);
        doc.text(`Date: ${bill.date}`, 15, startY + lineGap * 2);

        // Bill details
        doc.setFontSize(12);
        doc.text("Payment Summary", 15, startY + lineGap * 4);
        doc.line(15, startY + lineGap * 4 + 2, 65, startY + lineGap * 4 + 2);

        doc.setFontSize(11);
        doc.text(`Bill Amount: ${bill.amount} INR`, 15, startY + lineGap * 5 + 5);
        doc.text(`Payment Method: ${bill.method || "Online"}`, 15, startY + lineGap * 6 + 5);
        doc.text(`Membership Type: ${bill.plan || "Monthly"}`, 15, startY + lineGap * 7 + 5);

        // Footer line
        doc.setDrawColor(...primaryColor);
        doc.setLineWidth(0.8);
        doc.line(10, 150, 200, 150);

        // Signature line
        doc.setTextColor(0);
        doc.line(150, 130, 190, 130);
        doc.text("Authorized Signature", 170, 135, { align: "center" });

        // Footer message
        doc.setTextColor(100);
        doc.setFontSize(11);
        doc.text(
            "Thank you for choosing our gym! Stay fit, stay strong",
            105,
            160,
            { align: "center" }
        );

        // Save file
        doc.save(`Gym_Bill_${bill.email}.pdf`);
    };


    return (
        // <div>Member</div>
        <>
            <div className='p-8'>
                <div className="hidden lg:block bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                // onClick={() => handleSort('id')}
                                >
                                    {/* Receipt ID */}
                                    NO.
                                    {/* {sortField === 'id' && (sortDirection === 'asc' ? '↑' : '↓')} */}
                                </th>
                                <th
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                // onClick={() => handleSort('date')}
                                >
                                    Date
                                    {/* {sortField === 'date' && (sortDirection === 'asc' ? '↑' : '↓')} */}
                                </th>
                                <th
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                // onClick={() => handleSort('customer_name')}
                                >
                                    Customer
                                    {/* {sortField === 'customer_name' && (sortDirection === 'asc' ? '↑' : '↓')} */}
                                </th>
                                <th
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                // onClick={() => handleSort('amount')}
                                >
                                    Amount
                                    {/* {sortField === 'amount' && (sortDirection === 'asc' ? '↑' : '↓')} */}
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        {bills.length >= 1 ?
                            <tbody className="bg-white divide-y divide-gray-200">

                                {bills.map((items, index) => (
                                    <tr
                                        key={items._id}
                                        className="hover:bg-gray-50 cursor-pointer transition-colors"
                                    // onClick={() => handleReceiptClick(receipt)}
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                                            {index + 1}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {/* {new Date(receipt.date).toLocaleDateString()}
                                date */}
                                            {items.date}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {/* {items.} */}
                                            {items.userId.userName}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            ₹ {items.amount}
                                        </td>
                                        <td className="flex px-6 py-4 whitespace-nowrap">
                                            {/* <StatusBadge status={receipt.status} />
                                paid */}
                                            <div className='px-2 bg-green-100 text-green-800 border border-green-200 rounded-2xl'>
                                                Paid
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {/* <div className="flex gap-2">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleReceiptClick(receipt);
                                            }}
                                            className="text-blue-600 hover:text-blue-800 transition-colors"
                                            title="View"
                                        >
                                            👁
                                        </button>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDownload(receipt);
                                            }}
                                            className="text-green-600 hover:text-green-800 transition-colors"
                                            title="Download"
                                        >
                                            ⬇
                                        </button>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDeleteReceipt(receipt.id);
                                            }}
                                            className="text-red-600 hover:text-red-800 transition-colors"
                                            title="Delete"
                                        >
                                            🗑
                                        </button>
                                    </div> */}
                                            <button
                                                onClick={() => handleDownload(items)}

                                                className="flex items-center gap-1 px-3 py-1.5 bg-blue-500 text-white text-[16px] rounded-full text-xs hover:bg-blue-600 hover:scale-105 transition duration-200 cursor-pointer"
                                            >
                                                <MdDownload />
                                                Dounload PDF
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                            :
                            <tbody>
                                <tr>
                                    <td colSpan={6} className="text-center py-4 text-gray-500">
                                        No Data Found
                                    </td>
                                </tr>
                            </tbody>
                        }
                    </table>
                </div>

                <div className="lg:hidden space-y-4">
                    {bills.length >= 1 ?
                        bills.map((items, index) => (
                            <div
                                key={items._id}
                                className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 cursor-pointer hover:shadow-md transition-shadow"
                            // onClick={() => handleReceiptClick(receipt)}
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-semibold text-blue-600">{index + 1}</h3>
                                    {/* <StatusBadge status={receipt.status} /> */}
                                    <div className='px-2 bg-green-100 text-green-800 border border-green-200 rounded-2xl'>
                                        Paid
                                    </div>
                                </div>
                                <p className="text-gray-900 font-medium">{items.userId.userName}</p>
                                <p className="text-sm text-gray-500 mb-2">{items.date}</p>
                                <div className="flex justify-between items-center">
                                    <span className="text-lg font-semibold">₹{items.amount}</span>
                                    {/* <div className="flex gap-2">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleReceiptClick(receipt);
                                    }}
                                    className="text-blue-600 hover:text-blue-800 transition-colors p-1"
                                >
                                    👁
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDownload(receipt);
                                    }}
                                    className="text-green-600 hover:text-green-800 transition-colors p-1"
                                >
                                    ⬇
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDeleteReceipt(receipt.id);
                                    }}
                                    className="text-red-600 hover:text-red-800 transition-colors p-1"
                                >
                                    🗑
                                </button>
                            </div> */}
                                    <button
                                        onClick={() => handleDownload(items)}

                                        className="flex items-center gap-1 px-3 py-1.5 bg-blue-500 text-white rounded-full text-xs hover:bg-blue-600 hover:scale-105 transition duration-200 cursor-pointer"
                                    >
                                        <MdDownload />
                                        Dounload PDF
                                    </button>
                                </div>
                            </div>
                        )) :
                        <div
                            className="bg-white text-center rounded-lg shadow-sm border border-gray-200 p-4 cursor-pointer hover:shadow-md transition-shadow"
                        // onClick={() => handleReceiptClick(receipt)}
                        >
                            No Data Found
                        </div>
                    }
                </div>

            </div>
        </>

    )
}
