// Connection dependencies
import mongoose from "mongoose";

export default async function connectToDatabase() {
  // Setup the MongoDB connection string
  let MONGODB_URI: string | undefined = process.env.MONGODB_URI;

  // For running integration tests only
  if (process.env.TEST === "true") {
    MONGODB_URI = process.env.TEST_MONGODB_URI;
  }

  // Check if it is already connected
  if (mongoose.connection.readyState === mongoose.STATES.connected) {
    return;
  }

  // Check if it is still trying to connect
  if (mongoose.connection.readyState === mongoose.STATES.connecting) {
    // Avoid duplicate attempts when trying to connect
    return;
  }

  // Setting the MongoDB connection via Mongoose
  mongoose.set("strictQuery", false);

  // If the MongoDB URI is present, connect to the database
  if (MONGODB_URI) {
    console.log("connecting to", MONGODB_URI);

    try {
      await mongoose.connect(MONGODB_URI);
      console.log("connected to MongoDB");
    } catch (err: unknown) {
      if (err instanceof Error) {
        throw new Error(`Failed to connect to MongoDB: ${err.message}`, {
          cause: err,
        });
      } else {
        const unknownError = new Error(String(err));
        throw new Error(
          `Failed to connect to MongoDB: ${unknownError.message}`,
          {
            cause: err,
          },
        );
      }
    }
  } else {
    throw new Error("Invalid MongoDB URI");
  }
}
