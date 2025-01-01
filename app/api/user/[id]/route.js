
// import connectDB from "@/app/lib/connectDB";
// import userModel from "@/Models/userModel";
// import { NextResponse } from "next/server";

// export async function POST(request) {
//     try {
//         const { name, email, password, num, hcode } = await request.json();
//         console.log("Received data:", { name, email, password, num, hcode });
//         await connectDB();
//         await UserModel.create({ name, email, num, password, hcode })
//         return NextResponse.json({ message: "User Created" }, { status: 201 });
//     } catch (error) {
//         console.error("Error during POST request:", error);
//         return NextResponse.json(
//             { message: "Server error", error: error.message },
//             { status: 500 }
//         );
//     }
// }

// export async function GET() {
//     try {
//         console.log('get method');
//         await connectDB();
//         const userData = await UserModel.find({ })
//         console.log(userData);
//         return NextResponse.json(userData, { status: 201 });
//     } catch (error) {
//         console.error("Error during POST request:", error);
//         return NextResponse.json(
//             { message: "Server error", error: error.message },
//             { status: 500 }
//         );
//     }
// }
