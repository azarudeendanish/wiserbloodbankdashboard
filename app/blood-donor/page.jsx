'use client'
import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Link from "next/link";

export default function Page() {
    const [isOpen, setIsOpen] = useState(false);
    const [apiData, setApiData] = useState([]);


    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    const router = useRouter();
    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        email: Yup.string().email("Invalid email").required("Email is required"),
        number: Yup.string().required("Number is required"),
        aadharnumber: Yup.string().min(12, 'aadhar number must be at least 12 characters').required("Aadhar number is required"),
        bloodgroup: Yup.string().required("Blood group is required"),
    });

    const handleSubmit = async (values) => {
        console.log(values);
        const { name, email, number, aadharnumber, bloodgroup } = values;

        try {
            const response = await fetch("/api/donors", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, number, aadharnumber, bloodgroup }),
            });
            console.log(response);

            if (response.status === 201) {
                toast.success("Donor Id added successful!");
                // console.log(response);
                closeModal()
                getUserData();
            } else {
                toast.error("Donor Id failed. Please try again.");
            }
        } catch (error) {
            toast.error("Donor Id failed. Please try again.");
            console.error("Error during Donor added:", error);
        }
    };

    const handleDelete = async (id) => {
        console.log(id);

        try {
            if (confirm("do you want to delete this item?")) {
                const response = await axios.delete(`/api/donors?id=${id}`);
                if (response.status === 200) {
                    toast.success("Data deleted successfully!");
                    getUserData()
                }
            }
        } catch (error) {
            toast.error("Failed to delete data.");
            console.error("Error during deletion:", error);
        }
    };
    const handleUpdate = async (id) => {
        console.log(id);
        router.push(`/blood-donor/editdonor/${id}`)

        // try {
        //     if (confirm("do you want to delete this item?")) {
        //         const response = await axios.delete(`/api/donors?id=${id}`);
        //         if (response.status === 200) {
        //             toast.success("Data deleted successfully!");
        //             getUserData()
        //         }
        //     }
        // } catch (error) {
        //     toast.error("Failed to delete data.");
        //     console.error("Error during deletion:", error);
        // }
    };

    const getUserData = async () => {
        try {
            const res = await axios.get('/api/donors');
            const data = await res?.data;
            console.log('donor user api data=>  ', res);
            console.log('donor user api data=>  ', data);
            if (data) {
                setApiData(data)
            }
            // setApiData(data)
        } catch (error) {
            alert(error)
        }
        // const res = await axios.get('/api/User');
        // setUsers(res.data.user);

    }

    useEffect(() => {
        getUserData();
    }, []);
    return <>
        <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="text-lg ">Blood Donor</div>
                <div className="text-end">
                    <button className="bg-blue-500 hover:bg-blue-800 btn text-white" onClick={openModal}>Add Donor</button>
                </div>
            </div>
            <div>
                <div className='mt-5 text-center'>
                    {apiData.length != 0 ?
                        <div className="overflow-x-auto">
                            <table className="min-w-full table-auto border-collapse">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="px-6 py-3 text-sm font-semibold text-gray-600">S.NO</th>
                                        <th className="px-6 py-3 text-sm font-semibold text-gray-600">Email</th>
                                        <th className="px-6 py-3 text-sm font-semibold text-gray-600">Number</th>
                                        <th className="px-6 py-3 text-sm font-semibold text-gray-600">Blood Group</th>
                                        <th className="px-6 py-3 text-sm font-semibold text-gray-600">Action</th>
                                        <th className="px-6 py-3 text-sm font-semibold text-gray-600">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {apiData && apiData.map((item, index) => (
                                        <tr key={item._id} className={`border-t ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                                            <td className="px-6 py-3 text-sm text-gray-700">{index + 1}</td>
                                            <td className="px-6 py-3 text-sm text-gray-700">{item.email}</td>
                                            <td className="px-6 py-3 text-sm text-gray-700">{item.number}</td>
                                            <td className="px-6 py-3 text-sm text-gray-700">{item.bloodgroup}</td>
                                            <td className="px-6 py-3 text-sm text-gray-700">
                                                <button
                                                    onClick={() => handleUpdate(item._id)}
                                                    className="bg-green-500 text-white py-1 px-3 rounded-lg hover:bg-blue-600"
                                                >
                                                    Edit
                                                </button>
                                            </td>
                                            <td className="px-6 py-3 text-sm text-gray-700">
                                                <button
                                                    onClick={() => handleDelete(item._id)}
                                                    className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-blue-600"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        :
                        <div>No Donors list</div>
                    }
                </div>
            </div>
        </div>
        {isOpen && (
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
                <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                    <div className='grid grid-cols-2'>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-start">Add Donor</h2>
                        <h2 className="mb-4 text-end">
                            <button
                                onClick={closeModal}
                                className="bg-gray-500 text-white py-2 px-6 rounded-lg hover:bg-gray-600"
                            >
                                X
                            </button>
                        </h2>
                    </div>


                    <Formik
                        initialValues={{
                            name: "",
                            number: "",
                            email: "",
                            bloodgroup: '',
                            aadharnumber: ''
                        }}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {() => (
                            <Form>
                                <div className="mb-4">
                                    <Field
                                        type="text"
                                        className="w-full px-4 py-2 border rounded-lg shadow-sm"
                                        id="name"
                                        name="name"
                                        placeholder="Enter Name"
                                    />
                                    <ErrorMessage
                                        name="name"
                                        component="div"
                                        className="text-red-500 mt-1"
                                    />
                                </div>
                                <div className="mb-4">
                                    <Field
                                        type="email"
                                        className="w-full px-4 py-2 border rounded-lg shadow-sm"
                                        id="email"
                                        name="email"
                                        placeholder="Enter Email"
                                    />
                                    <ErrorMessage
                                        name="email"
                                        component="div"
                                        className="text-red-500 mt-1"
                                    />
                                </div>
                                <div className="mb-4">
                                    <Field
                                        type="text"
                                        className="w-full px-4 py-2 border rounded-lg shadow-sm"
                                        id="number"
                                        name="number"
                                        placeholder="Enter Phone Number"
                                    />
                                    <ErrorMessage
                                        name="number"
                                        component="div"
                                        className="text-red-500 mt-1"
                                    />
                                </div>
                                <div className="mb-4">
                                    <Field
                                        type="text"
                                        className="w-full px-4 py-2 border rounded-lg shadow-sm"
                                        id="aadharnumber"
                                        name="aadharnumber"
                                        placeholder="Enter Aadhar Number"
                                    />
                                    <ErrorMessage
                                        name="aadharnumber"
                                        component="div"
                                        className="text-red-500 mt-1"
                                    />
                                </div>




                                <div className="mb-4">
                                    <Field
                                        type="text"
                                        className="w-full px-4 py-2 border rounded-lg shadow-sm"
                                        id="bloodgroup"
                                        name="bloodgroup"
                                        placeholder="Enter Bloodgroup"
                                    />
                                    <ErrorMessage
                                        name="bloodgroup"
                                        component="div"
                                        className="text-red-500 mt-1"
                                    />
                                </div>

                                <div className="space-y-4 mt-6">
                                    <button
                                        type="submit"
                                        className="w-full bg-green-500 text-white font-bold py-2 rounded-lg shadow-sm"
                                    >
                                        Submit Donor
                                    </button>


                                </div>
                            </Form>
                        )}
                    </Formik>
                    <ToastContainer
                        position="top-right"
                        autoClose={3000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                    />
                </div>
            </div>
        )}
    </>;
}