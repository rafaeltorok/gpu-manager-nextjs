import { NextResponse } from "next/server";

// Mongoose model
import Gpu from "@/lib/models/gpu";

// Fetch all graphics cards from the database
export async function GET() {
  const response = await Gpu.find();
  return NextResponse.json(response.map((g) => g.toJSON()));
}

// Add a new graphics card
export async function POST(request: Request) {
  try {
    // Get the data from the request body
    const body = await request.json();
    const inputData = { ...body };

    // Confirm the card is not present on the database
    const existingGpu = await Gpu.findOne({
      manufacturer: { $regex: new RegExp(`^${inputData.manufacturer}$`, "i") },
      gpuline: { $regex: new RegExp(`^${inputData.gpuline}$`, "i") },
      model: { $regex: new RegExp(`^${inputData.model}$`, "i") },
    });

    if (existingGpu) {
      return NextResponse.json(
        { error: "The graphics card has already been added to the list" },
        { status: 409 },
      );
    }

    // Create a new Mongoose object
    const newGpu = new Gpu({ ...inputData });

    // Store it on the MongoDB database
    const storedData = await newGpu.save();

    // Send the new graphics card
    return NextResponse.json(
      {
        data: storedData,
        receivedAt: new Date().toISOString(),
      },
      { status: 201 },
    );
  } catch (err: unknown) {
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 400 });
    }
    return NextResponse.json({ error: String(err) });
  }
}
