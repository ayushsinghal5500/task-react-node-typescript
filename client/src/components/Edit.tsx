import React, { useState, useEffect } from "react";
import {
  Mail,
  User,
  Phone,
  Calendar,
  MapPin,
  BookOpen,
  Save,
  X,
  ChevronLeft
} from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

// ✅ Validation schema
const studentSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phoneNumber: z.string().min(10, "Please enter a valid phone number"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  gender: z.string().min(1, "Please select a gender"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  courseEnrolled: z.string().min(1, "Please select a course"),
  status: z.enum(["Active", "Inactive", "Pending"]),
});

type StudentFormData = z.infer<typeof studentSchema>;

// Mock student data - in a real app, this would come from an API
const mockStudentData = {
  fullName: "Alex Johnson",
  email: "alex.johnson@example.com",
  phoneNumber: "555-123-4567",
  dateOfBirth: "2000-05-15",
  gender: "male",
  address: "123 University Ave, Campus Town, CA 94301",
  courseEnrolled: "computer-science",
  status: "Active" as const,
};

const StudentEditForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isNewStudent = id === "new";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<StudentFormData>({
    resolver: zodResolver(studentSchema),
    defaultValues: mockStudentData
  });

  // Initialize form with student data
  useEffect(() => {
    // In a real app, you would fetch student data by ID here
    if (!isNewStudent) {
      // Fetch student data based on ID
      console.log("Fetching student data for ID:", id);
      reset(mockStudentData);
    } else {
      // Reset form for new student
      reset({
        fullName: "",
        email: "",
        phoneNumber: "",
        dateOfBirth: "",
        gender: "",
        address: "",
        courseEnrolled: "",
        status: "Pending",
      });
    }
  }, [id, isNewStudent, reset]);

  // ✅ Submit function
  const onSubmit = async (data: StudentFormData) => {
    setLoading(true);
    
    console.log("📤 Data to save:", data);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log("✅ Student saved successfully");
      setShowSuccess(true);
      
      setTimeout(() => {
        setShowSuccess(false);
        navigate("/students"); // Redirect back to student list
      }, 2000);
    } catch (err) {
      console.error("❌ Save error:", err);
      alert("Save failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/students");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-6">
          <button
            onClick={handleCancel}
            className="flex items-center text-gray-600 hover:text-gray-800 mr-4"
          >
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">
            {isNewStudent ? "Add New Student" : "Edit Student"}
          </h1>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Success Message */}
          {showSuccess && (
            <div className="bg-green-100 text-green-700 p-4 border-b border-green-200 flex items-center">
              <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Student {isNewStudent ? "added" : "updated"} successfully!
            </div>
          )}

          {/* Form Content */}
          <form onSubmit={handleSubmit(onSubmit)} className="p-6">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <div className="flex items-center border rounded-lg px-3 py-2">
                    <User className="h-5 w-5 text-gray-400 mr-2" />
                    <input
                      type="text"
                      placeholder="Enter student's full name"
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
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <div className="flex items-center border rounded-lg px-3 py-2">
                    <Mail className="h-5 w-5 text-gray-400 mr-2" />
                    <input
                      type="email"
                      placeholder="Enter email address"
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
                    Phone Number *
                  </label>
                  <div className="flex items-center border rounded-lg px-3 py-2">
                    <Phone className="h-5 w-5 text-gray-400 mr-2" />
                    <input
                      type="tel"
                      placeholder="Enter phone number"
                      className="flex-1 outline-none bg-transparent"
                      {...register("phoneNumber")}
                    />
                  </div>
                  {errors.phoneNumber && (
                    <p className="mt-1 text-sm text-red-600">{errors.phoneNumber.message}</p>
                  )}
                </div>

                {/* Date of Birth */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date of Birth *
                  </label>
                  <div className="flex items-center border rounded-lg px-3 py-2">
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

                {/* Gender */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Gender *
                  </label>
                  <div className="border rounded-lg px-3 py-2">
                    <select
                      className="w-full outline-none bg-transparent"
                      {...register("gender")}
                    >
                      <option value="">Select gender</option>
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

                {/* Status */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status *
                  </label>
                  <div className="border rounded-lg px-3 py-2">
                    <select
                      className="w-full outline-none bg-transparent"
                      {...register("status")}
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                      <option value="Pending">Pending</option>
                    </select>
                  </div>
                  {errors.status && (
                    <p className="mt-1 text-sm text-red-600">{errors.status.message}</p>
                  )}
                </div>

                {/* Course */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Course Enrolled *
                  </label>
                  <div className="flex items-center border rounded-lg px-3 py-2">
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

                {/* Address */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address *
                  </label>
                  <div className="flex items-center border rounded-lg px-3 py-2">
                    <MapPin className="h-5 w-5 text-gray-400 mr-2" />
                    <textarea
                      rows={3}
                      className="flex-1 outline-none bg-transparent resize-none"
                      placeholder="Enter student's address"
                      {...register("address")}
                    />
                  </div>
                  {errors.address && (
                    <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4 pt-8 border-t border-gray-200 mt-8">
              <button
                type="button"
                onClick={handleCancel}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading || !isDirty}
                className="flex items-center bg-indigo-600 text-white py-2 px-6 rounded-lg hover:bg-indigo-700 disabled:bg-indigo-400 disabled:cursor-not-allowed transition-colors"
              >
                <Save size={18} className="mr-2" />
                {loading ? "Saving..." : "Save Student"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StudentEditForm;