import axios from "axios";
import { encryptData } from "../utils/crypto";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
    "x-api-key": import.meta.env.VITE_CLIENT_KEY,
  },
});

// 🔹 Register student
export const registerStudent = (studentData: Record<string, string>) => {
  const finalData = { ...studentData };
  if (finalData.password) {
    finalData.password = encryptData(finalData.password);
  }
  return API.post("/register", finalData);
};

// 🔹 Get all students
export const getStudents = () => API.get("/students");

// 🔹 Get single student by ID
export const getStudentById = (id: string) => API.get(`/student/${id}`);

// 🔹 Delete a student
export const deleteStudent = (id: string) => API.delete(`/student/${id}`);

// 🔹 Update a student
export const updateStudent = (
  id: string,
  studentData: Record<string, string>
) => {
  const finalData = { ...studentData };
  if (finalData.password) {
    finalData.password = encryptData(finalData.password);
  }
  return API.put(`/student/${id}`, finalData);
};

// 🔹 Login user
export const loginUser = (credentials: Record<string, string>) => {
  const finalData = { ...credentials };
  if (finalData.password) {
    finalData.password = encryptData(finalData.password);
  }
  return API.post("/login", finalData);
};
