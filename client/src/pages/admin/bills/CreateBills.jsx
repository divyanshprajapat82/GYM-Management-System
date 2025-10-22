import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { MdDelete, MdDownload, MdEdit } from "react-icons/md";
import { Link } from "react-router";

export default function CreateBills() {
    const [bills, setBills] = useState([]);
    const [formData, setFormData] = useState({
        email: "",
        amount: "",
        date: "",
    });
    let ADMIN_URL = import.meta.env.VITE_ADMIN_URL


    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Add new bill

    const handleSubmit = (e) => {
        e.preventDefault();
        // if (!formData.email || !formData.amount || !formData.date) return;

        // setBills((prev) => [...prev, { ...formData, id: Date.now() }]);
        // setFormData({ email: "", amount: "", date: "" });

        axios.post(`${ADMIN_URL}/admin/bill/add-bill`, formData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("TOKEN")}`
            }
        })
            .then((res) => res.data)
            .then((finalData) => {
                if (finalData.status) {
                    toast.success("Bill Added")
                    setFormData({ email: "", amount: "", date: "" });
                    viewBills()
                } else {
                    toast.error(finalData.msg || "Invalid Email")
                }
            })
            .catch((error) => {
                toast.error("Please try again.")
                console.error("Login error:", error)
            })
    };

    let viewBills = () => {
        axios.get(`${ADMIN_URL}/admin/bill/view-bill`, formData)
            .then((res) => res.data)
            .then((finalData) => {
                setBills(finalData.data)
            })
    }

    let handleDelete = (e) => {
        axios.delete(`${ADMIN_URL}/admin/bill/delete/${e}`)
            .then((res) => res.data)
            .then((finalData) => {
                viewBills()
                if (finalData.status) {
                    toast.success("Bill Deleted")
                } else {
                    toast.error(finalData.msg || "Bill not Deleted")
                }
            })
    }

    useEffect(() => {
        viewBills()
    }, [])


    // Download bill as PDF
    // const handleDownload = (bill) => {
    //     const doc = new jsPDF();

    //     doc.setFontSize(18);
    //     doc.text("Gym Bill Receipt", 20, 20);

    //     doc.setFontSize(12);
    //     doc.text(`Customer Name: ${bill.email}`, 20, 40);
    //     doc.text(`Bill Amount: ${bill.amount}`, 20, 55);
    //     doc.text(`Date: ${bill.date}`, 20, 70);

    //     doc.text("------------------------------------", 20, 80);
    //     doc.text("Thank you for your business!", 20, 95);

    //     doc.save(`Bill_${bill.email}.pdf`);
    // };
    // import jsPDF from "jspdf";

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

        // Logo (optional)
        // doc.addImage(logoBase64, "PNG", 10, 5, 20, 20);

        // Main body box
        doc.setDrawColor(200, 200, 200);
        doc.setLineWidth(0.5);
        doc.rect(10, 40, 190, 100);

        // Customer details
        doc.setTextColor(...textColor);
        doc.setFontSize(12);
        doc.text("Customer Details", 15, 50);
        doc.line(15, 52, 60, 52);

        doc.setFontSize(11);
        doc.text(`Name / Email: ${bill.email}`, 15, 60);
        doc.text(`Date: ${bill.date}`, 15, 70);

        // Bill details
        doc.setFontSize(12);
        doc.text("Payment Summary", 15, 85);
        doc.line(15, 87, 65, 87);

        // doc.text(`Bill Amount: ${bill.amount} INR`, 15, 95, { align: "left" });


        doc.setFontSize(11);
        doc.setFont("helvetica", "normal")
        doc.text(`Bill Amount: ${bill.amount} INR`, 15, 95);
        doc.text(`Payment Method: ${bill.method || "Online"}`, 15, 105);
        doc.text(`Membership Type: ${bill.plan || "Monthly"}`, 15, 115);

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
        doc.text("Thank you for choosing our gym! Stay fit, stay strong", 105, 160, {
            align: "center",
        });


        // Save file
        doc.save(`Gym_Bill_${bill.email}.pdf`);
    };


    // console.log(ADMIN_URL);



    return (
        <>
            <ToastContainer hideProgressBar position="top-center" closeButton={false} autoClose={2000} />
            <div className="min-h-screen bg-gray-50 p-8 flex flex-col items-center">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Billing Dashboard</h1>

                {/* Bill Form */}
                <form
                    onSubmit={handleSubmit}
                    className="bg-white p-6 rounded-xl shadow-md flex flex-col gap-4 w-full max-w-md"
                >
                    <input
                        type="text"
                        name="email"
                        placeholder="Customer Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="border p-2 rounded-md outline-none focus:ring-2 focus:ring-green-400"
                    />

                    <input
                        type="number"
                        name="amount"
                        placeholder="Bill Amount"
                        value={formData.amount}
                        onChange={handleChange}
                        className="border p-2 rounded-md outline-none focus:ring-2 focus:ring-green-400"
                    />

                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="border p-2 rounded-md outline-none focus:ring-2 focus:ring-green-400"
                    />

                    <button
                        type="submit"
                        className="bg-green-500 text-white py-2 rounded-md hover:bg-green-600 hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200 cursor-pointer"
                    >
                        Add Bill
                    </button>
                </form>

                {/* Bill List */}
                {/* <div className="overflow-x-auto mt-6 w-full max-w-3xl">
                    {bills.length === 0 ? (
                        <p className="text-gray-500 mt-4 text-center">No bills available yet.</p>
                    ) : (
                        <table className="min-w-full border border-gray-300">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-4 py-2 text-left">Customer</th>
                                    <th className="px-4 py-2 text-left">Amount</th>
                                    <th className="px-4 py-2 text-left">Date</th>
                                    <th className="px-4 py-2 text-left">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bills.map((bill) => (
                                    <tr key={bill.id} className="border-t hover:bg-gray-50">
                                        <td className="px-4 py-2">{bill.email}</td>
                                        <td className="px-4 py-2">₹{bill.amount}</td>
                                        <td className="px-4 py-2">{bill.date}</td>
                                        <td className="px-4 py-2 flex ">
                                            <button
                                                onClick={() => handleDownload(bill)}
                                                className="bg-green-600 text-white sm:text-[16px] text-[13px] px-3 py-1 mr-2 rounded-md hover:bg-green-700 transition cursor-pointer"
                                            >
                                                Download PDF
                                            </button>
                                            <button
                                                onClick={() => handleDelete(bill._id)}
                                                className="bg-red-600 text-white sm:text-[16px] text-[13px] px-3 py-1.5 rounded-md hover:bg-red-700 transition cursor-pointer"
                                            >
                                                <MdDelete />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div> */}

                <div className="p-6">
                    {/* Header */}
                    {/* <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold text-gray-800">Dite Plan</h2>
                        <Link to={"../add/store"}>
                            <button
                                // onClick={handleAddMember}
                                className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white text-sm font-medium rounded-lg shadow hover:bg-green-600 hover:scale-105 transition duration-200 cursor-pointer"
                            >
                                <MdAdd className="text-lg" />
                                Add Member
                            </button>
                        </Link>
                    </div> */}

                    {/* Table */}
                    <div className="overflow-x-auto w-full rounded-lg shadow">
                        <table className="w-full text-sm text-left text-gray-600">
                            <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                                <tr>
                                    <th className="px-6 py-3">Customer</th>
                                    <th className="px-6 py-3">Amount</th>
                                    <th className="px-6 py-3">Date</th>
                                    <th className="px-6 py-3 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {bills.length > 0 ? (
                                    bills.map((items, index) => (
                                        <tr key={items.id} className="hover:bg-gray-50">
                                            {/* <td className="px-6 py-3">{index + 1}</td> */}
                                            {/* <td className="p-3 ">
                                                <img
                                                    src={items.image}
                                                    // alt={p.name}
                                                    className="w-16 h-16 object-cover rounded"
                                                />
                                            </td> */}
                                            <td className="px-6 py-3 font-medium text-gray-800">{items.email}</td>
                                            <td className="px-6 py-3">{items.amount}</td>
                                            <td className="px-6 py-3">{items.date}</td>
                                            {/* <td className="px-6 py-3">{items.stock}</td> */}
                                            <td className="px-6 py-3 text-center">
                                                <div className="flex items-center justify-center space-x-2">
                                                    <button
                                                        onClick={() => handleDownload(items)}

                                                        className="flex items-center gap-1 px-3 py-1.5 bg-blue-500 text-white rounded-full text-xs hover:bg-blue-600 hover:scale-105 transition duration-200 cursor-pointer"
                                                    >
                                                        <MdDownload />
                                                        Dounload PDF
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(items._id)}
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
                                            No Bills found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}
