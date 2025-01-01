import userModel from '@/Models/userModel';
import connectDB from "@/app/lib/connectDB";
import { NextResponse } from "next/server";

export async function POST(request) {
    // console.log(request.json());
    // console.log('user api');
    try {
        const { name, email, password, num, hcode } = await request.json();
        console.log("Received data:", { name, email, password, num, hcode });
        await connectDB();
        
        await userModel.create({ name, email, num, password, hcode })
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

export async function GET() {
    try {
        console.log('get method');
        await connectDB();
        const userData = await userModel.find({ })
        console.log(userData);
        return NextResponse.json(userData, { status: 201 });
    } catch (error) {
        console.error("Error during POST request:", error);
        return NextResponse.json(
            { message: "Server error", error: error.message },
            { status: 500 }
        );
    }
}


export async function DELETE(request) {
    await connectDB();
    const id = request.nextUrl.searchParams.get('id')
    await userModel.findByIdAndDelete(id)
    return NextResponse.json(
        {
            success: true,
            message: "record deleted"
        },
        {
            status: 200
        }
    )
}