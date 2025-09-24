import axios from "axios";
import { encryptData, decryptData } from "../utils/crypto";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
    "x-api-key": import.meta.env.VITE_CLIENT_KEY,
  },
});

// 🔹 Helper: Decrypt every field in an object
const decryptObject = (obj: Record<string, any>) => {
  const finalData: Record<string, any> = {};
  Object.keys(obj).forEach((key) => {
    try {
      finalData[key] = decryptData(obj[key]);
    } catch {
      finalData[key] = obj[key]; // agar plain text ho to waise hi rakhna
    }
  });
  return finalData;
};

// 🔹 Register student (encrypt all fields)
export const registerStudent = (studentData: Record<string, string>) => {
  const finalData: Record<string, string> = {};
  Object.keys(studentData).forEach((key) => {
    finalData[key] = encryptData(studentData[key]);
  });
  return API.post("/register", finalData);
};

// 🔹 Get all students (decrypt each)
export const getStudents = async () => {
  const res = await API.get("/students");
  return res.data.map((student: Record<string, any>) => decryptObject(student));
};

// 🔹 Get single student by ID (decrypt)
export const getStudentById = async (id: string) => {
  const res = await API.get(`/student/${id}`);
  return decryptObject(res.data);
};

// 🔹 Delete a student (no encryption needed)
export const deleteStudent = (id: string) => API.delete(`/student/${id}`);

// 🔹 Update a student (encrypt all fields like register)
export const updateStudent = (
  id: string,
  studentData: Record<string, string>
) => {
  const finalData: Record<string, string> = {};
  Object.keys(studentData).forEach((key) => {
    finalData[key] = encryptData(studentData[key]);
  });
  return API.put(`/student/${id}`, finalData);
};

// 🔹 Login user (encrypt password only)
export const loginUser = (credentials: Record<string, string>) => {
  const finalData = { ...credentials };
  if (finalData.password) {
    finalData.password = encryptData(finalData.password);
  }
  return API.post("/login", finalData);
};

// 🔹 Send student invite (email usually plain)
export const sendStudentInvite = (email: string) => {
  return API.post("/student/invite", { email });
};

// 🔹 Change password (encrypt both old/new)
export const changePassword = (data: { oldPassword: string; newPassword: string }) => {
  const finalData = { ...data };
  if (finalData.oldPassword) {
    finalData.oldPassword = encryptData(finalData.oldPassword);
  }
  if (finalData.newPassword) {
    finalData.newPassword = encryptData(finalData.newPassword);
  }
  return API.post("/change-password", finalData);
};

// 🔹 Request password reset (plain email)
export const requestPasswordReset = (email: string) => {
  return API.post("/forgot-password", { email });
};

// 🔹 Reset password (encrypt new password)
export const resetPassword = (data: { token: string; newPassword: string }) => {
  const finalData = { ...data };
  if (finalData.newPassword) {
    finalData.newPassword = encryptData(finalData.newPassword);
  }
  return API.post("/reset-password", finalData);
};
