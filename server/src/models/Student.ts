import { Schema, model, Document } from "mongoose";

export interface IStudent extends Document {
  fullName: string;
  email: string;
  phone: string;
  dob: string;
  gender: string;
  address: string;
  course: string;
  password: string;
}

const studentSchema = new Schema<IStudent>({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  dob: { type: String, required: true },
  gender: { type: String, required: true },
  address: { type: String, required: true },
  course: { type: String, required: true },
  password: { type: String, required: true }
});

export default model<IStudent>("Student", studentSchema);
