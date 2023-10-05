import { Connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

Connect();

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    // Parse the JSON request body
    const reqBody = await req.json();

    // Extract all fields from the request body based on the schema
    const {
      name,
      schoolName,
      subject,
      noOfClassesPerWeek,
      tutorMode,
      class: userClass,
      genderRestriction,
      whatsappNumber,
      classRequiredFrom,
      email,
      note,
    } = reqBody;
    console.log(reqBody);

    // Check if any required fields are missing (you can add more validation)
    if (
      !name ||
      !schoolName ||
      !subject ||
      !userClass ||
      !genderRestriction ||
      !whatsappNumber ||
      !classRequiredFrom ||
      !email
    ) {
      return NextResponse.json(
        {
          error: "All required fields must be provided.",
        },
        { status: 400 }
      ); // Bad Request
    }


    // Create a new user instance based on the schema
    const newUser = new User({
      name,
      schoolName,
      subject,
      noOfClassesPerWeek,
      tutorMode,
      class: userClass,
      genderRestriction,
      whatsappNumber,
      classRequiredFrom,
      email,
      note,
    });

    // Save the user to the database
    const saveUser = await newUser.save();
    console.log(saveUser);

    // Respond with a success message or any relevant data
    return NextResponse.json({ message: "User created successfully." ,success: true,saveUser: saveUser});
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 }); // Internal Server Error
  }
}
