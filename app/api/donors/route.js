import connectDB from '@/app/lib/connectDB';
import donorModel from '@/Models/donorModel';
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const { name, email, number, aadharnumber, bloodgroup } = await request.json();
        console.log("Received data:", { name, email, number, aadharnumber, bloodgroup });
        await connectDB();
        
        
        await donorModel.create({ name, email, number, aadharnumber, bloodgroup })
        // await Product.create({ password, num, email });
        return NextResponse.json({ message: "Donor Id Created" }, { status: 201 });
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
        const donorData = await donorModel.find({ })
        console.log(donorData);
        return NextResponse.json(donorData, { status: 201 });
    } catch (error) {
        console.error("Error during GET request:", error);
        return NextResponse.json(
            { message: "Server error", error: error.message },
            { status: 500 }
        );
    }
}


export async function DELETE(request) {
    await connectDB();
    const id = request.nextUrl.searchParams.get('id')
    console.log('searchParams=> ',id);
    await donorModel.findByIdAndDelete(id)
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