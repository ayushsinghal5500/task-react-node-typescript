import axios from "axios";
import { encryptData } from "../utils/crypto";

// Create Axios instance
const API = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
    "x-api-key": import.meta.env.VITE_CLIENT_KEY,
  },
});

// 🔹 Register student (encrypt only password)
export const registerStudent = (studentData: Record<string, string>) => {
  const finalData: Record<string, string> = { ...studentData };

  if (finalData.password) {
    finalData.password = encryptData(finalData.password);
  }

  return API.post("/register", finalData);
};

// 🔹 Get all students
export const getStudents = () => {
  return API.get("/students");
};

// 🔹 Delete a student by ID
export const deleteStudent = (id: string) => {
  return API.delete(`/student/${id}`);
};

// 🔹 Update a student by ID
export const updateStudent = (id: string, studentData: Record<string, string>) => {
  const finalData: Record<string, string> = { ...studentData };

  // Agar password update kar rahe ho toh encrypt karke bhejna
  if (finalData.password) {
    finalData.password = encryptData(finalData.password);
  }

  return API.put(`/student/${id}`, finalData);
};
