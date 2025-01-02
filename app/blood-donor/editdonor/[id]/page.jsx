"use client"
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useEffect, use, useState } from 'react'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Link from "next/link";

export default function Page({ params }) {
    const [apiData, setApiData] = useState(null)
    let { id } = use(params)
    const router = useRouter()

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        email: Yup.string().email("Invalid email").required("Email is required"),
        number: Yup.string().required("Number is required"),
        aadharnumber: Yup.string().min(12, 'aadhar number must be at least 12 characters').required("Aadhar number is required"),
        bloodgroup: Yup.string().required("Blood group is required"),
    });


    const handleUpdateDonor = async (values) => {
        console.log(id);

         
            if (confirm("do you want to update this item?")) {
                await axios.put(`/api/donors/${id}`, values)
                .then((res) => {
                    toast.success("your data updated")
                    router.push('/blood-donor');
                })
                .catch((err) => {
                    toast.error("Failed to update data.");
                    console.error("Error during update:", err);
                })
            }
        

       
        }
    const getDonorApi = async () => {
        await axios.get(`/api/donors/${id}`)
            .then((res) => {
                if (res.data.success) {
                    setApiData(res.data.donor)
                }
            }).catch((err) => {
                console.log(err)
            })

    }
    useEffect(() => {
        getDonorApi()
    }, [])
    console.log(apiData);

    return (
        <>
            <div className="flex justify-center items-center">
                <div className="w-full sm:w-3/4 md:w-1/2 lg:w-1/3">
                    <div className="bg-white shadow-lg rounded-lg p-6">
                        <div className="text-center mb-4">
                            <h2 className="font-bold text-green-500">Update Donor</h2>
                        </div>
                        <Formik
                            initialValues={{
                                name: apiData && apiData.name || '',
                                number: apiData && apiData.number || '',
                                email: apiData && apiData.email || '',
                                bloodgroup: apiData && apiData.bloodgroup || '',
                                aadharnumber: apiData && apiData.aadharnumber || ''
                            }}
                            validationSchema={validationSchema}
                            onSubmit={handleUpdateDonor}
                            enableReinitialize={true} 
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
                                            Update Donor
                                        </button>


                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </>
    )
}