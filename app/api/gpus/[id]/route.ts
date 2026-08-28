import { NextResponse } from "next/server";

// Mongoose
import mongoose from "mongoose";
import Gpu from "@/lib/models/gpu";

// Helper functions
function validateId(id: string | undefined) {
  return mongoose.isValidObjectId(id);
}

// Fetch a single card by its id
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  // Check if the id is a valid MongoDB object id
  const checkId = validateId(id);

  if (!checkId) {
    return NextResponse.json({ error: "Invalid id format" }, { status: 400 });
  }

  // Find the card on the database
  const response = await Gpu.findById(id);

  // Return a proper error message if it was not found
  if (!response) {
    return NextResponse.json(null, { status: 404 });
  }

  // Return the graphics card data
  return NextResponse.json(response.toJSON());
}

// Update a graphics card data
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    // Get the id from the url
    const { id } = await params;

    // Check if the id is a valid MongoDB object id
    const checkId = validateId(id);

    if (!checkId) {
      return NextResponse.json({ error: "Invalid id format" }, { status: 400 });
    }

    // Get the request body data
    const body = await request.json();

    // Confirm the card exists on the database
    const gpuToUpdate = await Gpu.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    // Return a proper status code if the card does not exist
    if (!gpuToUpdate) {
      return new NextResponse(null, { status: 404 });
    }

    // Return the updated data
    return NextResponse.json(gpuToUpdate);
  } catch (err: unknown) {
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 400 });
    }
    return NextResponse.json({ error: String(err) });
  }
}

// Remove a graphics card from the database
export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    // Check if the id is a valid MongoDB object id
    const checkId = validateId(id);

    if (!checkId) {
      return NextResponse.json({ error: "Invalid id format" }, { status: 400 });
    }

    // Remove the card from the database
    const gpuToRemove = await Gpu.findByIdAndDelete(id);

    // Return a proper status code if the card does not exist
    if (!gpuToRemove) {
      return new NextResponse(null, { status: 404 });
    }

    return new NextResponse(null, { status: 204 });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 400 });
    }
    return NextResponse.json({ error: String(err) });
  }
}
