import UserModel from '@/Models/userModel'
import connectDB from "@/app/lib/connectDB";
import { NextResponse } from "next/server";

export async function POST(request) {
    // console.log(request.json());
    // console.log('user api');
    try {
        const { name, email, password, num, hcode } = await request.json();
        console.log("Received data:", { name, email, password, num, hcode });
        await connectDB();
        await UserModel.create({ name, email, num, password, hcode })
        // await Product.create({ password, num, email });
        return NextResponse.json({ message: "User Created" }, { status: 201 });
    } catch (error) {
        console.error("Error during POST request:", error);
        return NextResponse.json(
            { message: "Server error", error: error.message },
            { status: 500 }
        );
    }
}

