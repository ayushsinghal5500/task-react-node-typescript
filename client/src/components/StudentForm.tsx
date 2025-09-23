// client/src/components/StudentRegistrationForm.tsx
import React, { useState } from "react";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  Phone,
  Calendar,
  MapPin,
  BookOpen,
} from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { registerStudent } from "../api/Api"; // <-- your API import
import { useNavigate } from "react-router-dom";

// ✅ Validation schema
const studentSchema = z
  .object({
    fullName: z.string().min(2, "Full name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    phoneNumber: z.string().min(10, "Please enter a valid phone number"),
    dateOfBirth: z.string().min(1, "Date of birth is required"),
    gender: z.string().min(1, "Please select a gender"),
    address: z.string().min(5, "Address must be at least 5 characters"),
    courseEnrolled: z.string().min(1, "Please select a course"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type StudentFormData = z.infer<typeof studentSchema>;

const StudentRegistrationForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<StudentFormData>({
    resolver: zodResolver(studentSchema),
  });

  // ✅ Submit function with detailed logging
  const onSubmit = async (data: StudentFormData) => {
    setLoading(true);

    // 🔍 Raw form data from react-hook-form
    console.log("📥 Raw form data:", data);

      const payload = {
    fullName: data.fullName,
    email: data.email,
    phone: data.phoneNumber,        // 👈 phoneNumber → phone
    dob: data.dateOfBirth,          // 👈 dateOfBirth → dob
    gender: data.gender,
    address: data.address,
    course: data.courseEnrolled,    // 👈 courseEnrolled → course
    password: data.password,
  };

    // 🔍 Payload before sending API request
    console.log("📤 Payload to API:", payload);

    try {
      const res = await registerStudent(payload);

      // 🔍 Log full response
      console.log("✅ API Response object:", res);
      console.log("✅ API Response data:", res.data);

      alert("Registration successful!");
      navigate("/students");
      reset(); // clear form
    } catch (err: any) {
      // 🔍 Log full error object
      console.error("❌ API Error object:", err);

      if (err.response) {
        console.error("❌ Backend error response:", err.response.data);
        console.error("❌ Status:", err.response.status);
        console.error("❌ Headers:", err.response.headers);
      } else if (err.request) {
        console.error("❌ No response received. Request details:", err.request);
      } else {
        console.error("❌ Error setting up request:", err.message);
      }

      alert(err?.response?.data?.message || "Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-2 bg-indigo-600">
          <h1 className="text-2xl font-bold text-white text-center">
            Student Registration
          </h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          {/* ✅ Your form fields stay same as before */}
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <div className="flex items-center border rounded-md px-3 py-2">
              <User className="h-5 w-5 text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Enter your full name"
                className="flex-1 outline-none bg-transparent"
                {...register("fullName")}
              />
            </div>
            {errors.fullName && (
              <p className="mt-1 text-sm text-red-600">
                {errors.fullName.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <div className="flex items-center border rounded-md px-3 py-2">
              <Mail className="h-5 w-5 text-gray-400 mr-2" />
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 outline-none bg-transparent"
                {...register("email")}
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <div className="flex items-center border rounded-md px-3 py-2">
              <Phone className="h-5 w-5 text-gray-400 mr-2" />
              <input
                type="tel"
                placeholder="Enter your phone number"
                className="flex-1 outline-none bg-transparent"
                {...register("phoneNumber")}
              />
            </div>
            {errors.phoneNumber && (
              <p className="mt-1 text-sm text-red-600">{errors.phoneNumber.message}</p>
            )}
          </div>

          {/* Date & Gender */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date of Birth
              </label>
              <div className="flex items-center border rounded-md px-3 py-2">
                <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                <input
                  type="date"
                  className="flex-1 outline-none bg-transparent"
                  {...register("dateOfBirth")}
                />
              </div>
              {errors.dateOfBirth && (
                <p className="mt-1 text-sm text-red-600">{errors.dateOfBirth.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Gender
              </label>
              <div className="flex items-center border rounded-md px-3 py-2">
                <select
                  className="flex-1 outline-none bg-transparent w-full"
                  {...register("gender")}
                >
                  <option value="">Select your gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="prefer-not-to-say">Prefer not to say</option>
                </select>
              </div>
              {errors.gender && (
                <p className="mt-1 text-sm text-red-600">{errors.gender.message}</p>
              )}
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <div className="flex items-center border rounded-md px-3 py-2">
              <MapPin className="h-5 w-5 text-gray-400 mr-2" />
              <textarea
                rows={3}
                className="flex-1 outline-none bg-transparent resize-none"
                placeholder="Enter your full address"
                {...register("address")}
              />
            </div>
            {errors.address && (
              <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
            )}
          </div>

          {/* Course */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Course Enrolled
            </label>
            <div className="flex items-center border rounded-md px-3 py-2">
              <BookOpen className="h-5 w-5 text-gray-400 mr-2" />
              <select
                className="flex-1 outline-none bg-transparent w-full"
                {...register("courseEnrolled")}
              >
                <option value="">Select a course</option>
                <option value="computer-science">Computer Science</option>
                <option value="business">Business Administration</option>
                <option value="engineering">Engineering</option>
                <option value="arts">Arts & Humanities</option>
                <option value="medicine">Medicine</option>
                <option value="law">Law</option>
              </select>
            </div>
            {errors.courseEnrolled && (
              <p className="mt-1 text-sm text-red-600">{errors.courseEnrolled.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="flex items-center border rounded-md px-3 py-2 relative">
              <Lock className="h-5 w-5 text-gray-400 mr-2" />
              <input
                type={showPassword ? "text" : "password"}
                className="flex-1 outline-none bg-transparent pr-8"
                placeholder="Enter password"
                {...register("password")}
              />
              <span
                className="absolute right-2 cursor-pointer text-gray-400"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <div className="flex items-center border rounded-md px-3 py-2 relative">
              <Lock className="h-5 w-5 text-gray-400 mr-2" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                className="flex-1 outline-none bg-transparent pr-8"
                placeholder="Confirm password"
                {...register("confirmPassword")}
              />
              <span
                className="absolute right-2 cursor-pointer text-gray-400"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
            </div>
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
            )}
          </div>
          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default StudentRegistrationForm;
