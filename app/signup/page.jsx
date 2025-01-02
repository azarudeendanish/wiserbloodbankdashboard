"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Link from "next/link";

const Signup = () => {
    const router = useRouter();
    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        email: Yup.string().email("Invalid email").required("Email is required"),
        num: Yup.string().required("Number is required"),
        hcode: Yup.string().required("Hospital code is required"),
        password: Yup.string()
            .min(6, "Password must be at least 6 characters")
            .required("Password is required"),
        repassword: Yup.string()
            .oneOf([Yup.ref("password")], "Passwords must match")
            .required("Confirm Password is required"),
    });

    const handleSubmit = async (values) => {
        console.log(values);
        const { name, email, password, num, hcode } = values;
        console.log(name, email, password, num, hcode);

        try {
            const response = await fetch("/api/user", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password, num, hcode }),
            });
            console.log(response);

            if (response.status === 201) {
                toast.success("Sign up successful!");
                console.log(response);
                router.push('/login')
            } else {
                toast.error("Sign up failed. Please try again.");
            }
        } catch (error) {
            toast.error("Sign up failed. Please try again.");
            console.error("Error during signup:", error);
        }
    };

    const deleteData = async (id) => {
        try {
            const response = await axios.delete(`/api/delete/${id}`);
            if (response.status === 200) {
                toast.success("Data deleted successfully!");
            }
        } catch (error) {
            toast.error("Failed to delete data.");
            console.error("Error during deletion:", error);
        }
    };

    return (
        <>
            
            <div className="flex justify-center items-center min-h-screen">
                <div className="w-full sm:w-1/2 lg:w-1/3">
                    <div className="bg-white shadow-lg rounded-lg p-6">
                        <div className="text-center">
                            <h2 className="font-bold text-red-500 mb-4">Sign Up</h2>
                        </div>
                        <Formik
                            initialValues={{
                                name: "",
                                num: "",
                                email: "",
                                password: "",
                                repassword: "",
                                hcode: "",
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
                                            id="num"
                                            name="num"
                                            placeholder="Enter Phone Number"
                                        />
                                        <ErrorMessage
                                            name="num"
                                            component="div"
                                            className="text-red-500 mt-1"
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <Field
                                            type="password"
                                            className="w-full px-4 py-2 border rounded-lg shadow-sm"
                                            id="password"
                                            name="password"
                                            placeholder="Enter Password"
                                        />
                                        <ErrorMessage
                                            name="password"
                                            component="div"
                                            className="text-red-500 mt-1"
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <Field
                                            type="password"
                                            placeholder="Re-Enter Password"
                                            className="w-full px-4 py-2 border rounded-lg shadow-sm"
                                            id="repassword"
                                            name="repassword"
                                        />
                                        <ErrorMessage
                                            name="repassword"
                                            component="div"
                                            className="text-red-500 mt-1"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <Field
                                            type="text"
                                            className="w-full px-4 py-2 border rounded-lg shadow-sm"
                                            id="hcode"
                                            name="hcode"
                                            placeholder="Enter hospital code"
                                        />
                                        <ErrorMessage
                                            name="hcode"
                                            component="div"
                                            className="text-red-500 mt-1"
                                        />
                                    </div>

                                    <div className="space-y-4 mt-6">
                                        <button
                                            type="submit"
                                            className="w-full bg-green-500 text-white font-bold py-2 rounded-lg shadow-sm"
                                        >
                                            Sign Up
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => deleteData(1)}
                                            className="w-full bg-red-500 text-white font-bold py-2 rounded-lg shadow-sm"
                                        >
                                            Delete
                                        </button>
                                        <Link href='/login' className='btn w-full text-center bg-transparent border border-red-500 text-red-500 font-bold py-2 rounded-lg shadow-sm'>
                                            Login
                                        </Link>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
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
        </>
    );
};

export default Signup;