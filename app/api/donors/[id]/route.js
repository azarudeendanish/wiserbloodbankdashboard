import connectDB from "@/app/lib/connectDB";
import donorModel from "@/Models/donorModel";
import { NextResponse } from "next/server";


export async function PUT(request, { params }) {
    const { id } = params;
    console.log("id...................")
    console.log(id)
    connectDB()
    const { name, email, number, aadharnumber, bloodgroup } = await request.json()
    await donorModel.findByIdAndUpdate(id, {
        name, email, number, aadharnumber, bloodgroup
    })
    return NextResponse.json(
        {
            success: true,
            message: "record has been updated!"
        },
        {
            status: 200
        }
    )
}

export async function GET(_, { params }) {
    const { id } = params;
    connectDB
    const donor = await donorModel.findById(id)
    return NextResponse.json(
        {
            success: true,
            donor
        },
        {
            status: 200
        }
    )
}