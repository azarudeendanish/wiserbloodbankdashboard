"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Link from "next/link";
import * as Yup from "yup";
import { useRouter } from "next/navigation";



const Login = () => {
    const [apiData, setApiData] = useState([]);
    const router = useRouter();
    // const router = useRouter()

    useEffect(() => {
        getUserData();
    }, []);

    const getUserData = async () => {
        const response =  await fetch('/api/user');
        const data =  response?.json();
        console.log(data);
        if(data){
            console.log('api data=>  ',data);
            setApiData(data)
        }
    }

    const validationSchema = Yup.object().shape({
        email: Yup.string().email("Invalid email").required("Email is required"),
        password: Yup.string()
            .min(6, "Password must be at least 6 characters")
            .required("Password is required"),
    });

    const handleSubmit = (values, { resetForm }) => {
        console.log('entererd formik');

        const { email, password } = values;

        const user = apiData.find((item) => item.email === email);


        if (!user) {
            toast.error("Email not found. Please register first.");
            router.push("/signup");
            return
        }

        if (password !== user.password) {
            toast.warning("Incorrect password. Please try again.");
            resetForm()
            // router.refresh()
            return
        }
        console.log('user length->  ', user.email);

        if (user?.email) {
            toast.success("Login successful");
            // localStorage.setItem("userData", JSON.stringify(user));
            router.push("/");
        }

    };
    const handleDelete =  (id) => {
        console.log(id);
        if (confirm("do you want to delete this item?")) {
             axios.delete(`/api/user?id=${id}`)
                .then(() => {
                    getUserData()
                    router.refresh()
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }
    return (
        <>
                <div className="flex justify-center items-center min-h-screen">
                    <div className="w-full sm:w-3/4 md:w-1/2 lg:w-1/3">
                        <div className="bg-white shadow-lg rounded-lg p-6">
                            <div className="text-center mb-4">
                                <h2 className="font-bold text-green-500">Sign in</h2>
                            </div>

                            <Formik
                                initialValues={{ email: "", password: "" }}
                                validationSchema={validationSchema}
                                onSubmit={handleSubmit}
                            >
                                {({ isSubmitting }) => (
                                    <Form>
                                        <div className="mb-4">
                                            <Field
                                                type="email"
                                                className="form-control shadow-sm w-full p-2 border rounded-lg"
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
                                                type="password"
                                                className="form-control shadow-sm w-full p-2 border rounded-lg"
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

                                        <div className="mt-4">
                                            <button
                                                type="submit"
                                                className="w-full bg-green-500 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-green-600"
                                            >
                                                Sign in
                                            </button>
                                            <Link
                                                href="/signup"
                                                className="block text-center mt-4 py-2 px-4 border border-green-500 text-green-500 font-bold rounded-lg hover:bg-green-100"
                                            >
                                                Create Account
                                            </Link>
                                        </div>
                                    </Form>
                                )}
                            </Formik>

                            <div className="mt-6">
                                {apiData.length > 0 && apiData.map((item, index) => (
                                    <div key={index} className="flex justify-between items-center mb-2">
                                        <div>{item.email}</div>
                                        <div>
                                            <button
                                                onClick={() => handleDelete(item._id)}
                                                className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                ))
                             
                            }
                            </div>
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

export default Login;