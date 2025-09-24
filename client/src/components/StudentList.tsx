import React, { useState, useEffect } from "react";
import {
  Eye,
  Edit,
  Trash2,
  Search,
  Plus,
  ChevronLeft,
  ChevronRight,
  X,
  Send,
  Loader,
} from "lucide-react";
import { getStudents, deleteStudent, sendStudentInvite } from "../api/Api";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

// Zod schema for email validation
const emailSchema = z.string().email("Please enter a valid email address");

interface Student {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  dob: string;
  gender: string;
  address: string;
  course: string;
  status: "Active" | "Inactive" | "Pending";
}

const StudentListPage: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [notification, setNotification] = useState<{type: 'success' | 'error', message: string} | null>(null);
  const studentsPerPage = 5;

  const navigate = useNavigate();

  // 🔹 Show notification and auto-hide
  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4000);
  };

  // 🔹 Fetch students
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setIsLoading(true);
        const response = await getStudents();
        setStudents(response.data);
      } catch (error) {
        console.error("Failed to fetch students:", error);
        showNotification('error', "Failed to fetch students");
      } finally {
        setIsLoading(false);
      }
    };
    fetchStudents();
  }, []);

  // 🔹 Delete Student
  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this student?")) return;

    try {
      await deleteStudent(id);
      setStudents(students.filter((s) => s._id !== id));
      showNotification('success', "Student deleted successfully");
    } catch (error) {
      console.error("Failed to delete student:", error);
      showNotification('error', "Failed to delete student");
    }
  };

  // 🔹 Validate email using Zod
  const validateEmail = (email: string): boolean => {
    try {
      emailSchema.parse(email);
      setEmailError("");
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        setEmailError(error.errors[0].message);
      }
      return false;
    }
  };

  // 🔹 Open Modal
  const handleOpenModal = () => {
    setIsModalOpen(true);
    setInviteEmail(""); // Clear previous value
    setEmailError(""); // Clear errors
  };

  // 🔹 Close Modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setInviteEmail("");
    setEmailError("");
  };

  // 🔹 Handle real-time email validation
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInviteEmail(value);
    
    // Only validate if user has started typing
    if (value.length > 0) {
      validateEmail(value);
    } else {
      setEmailError("");
    }
  };

  // 🔹 Handle Modal Background Click (Close when clicking outside)
  const handleModalBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleCloseModal();
    }
  };

  // 🔹 Handle Escape key to close modal
  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen) {
        handleCloseModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  // 🔹 Handle Invite Submission
  const handleInviteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate email before submitting
    if (!validateEmail(inviteEmail)) {
      return;
    }

    try {
      setIsLoading(true);
      // Send invite to backend API
      await sendStudentInvite(inviteEmail);
      
      showNotification('success', `Invite sent to: ${inviteEmail}`);
      handleCloseModal();
    } catch (error) {
      console.error("Failed to send invite:", error);
      showNotification('error', "Failed to send invitation");
    } finally {
      setIsLoading(false);
    }
  };

  // 🔹 Filter + Pagination
  const filteredStudents = students.filter((s) =>
    s.fullName.toLowerCase().includes(search.toLowerCase()) ||
    s.email.toLowerCase().includes(search.toLowerCase()) ||
    s.course.toLowerCase().includes(search.toLowerCase())
  );
  
  const indexOfLast = currentPage * studentsPerPage;
  const indexOfFirst = indexOfLast - studentsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

  // Reset to page 1 when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      {/* Notification Toast */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-md shadow-lg transition-all duration-300 ${
          notification.type === 'success' 
            ? 'bg-green-500 text-white' 
            : 'bg-red-500 text-white'
        }`}>
          {notification.message}
        </div>
      )}

      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="p-4 bg-indigo-600 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-white">Student Management</h1>
            <button
              className="bg-white text-indigo-600 px-4 py-2 rounded-md flex items-center font-medium hover:bg-indigo-50 transition-colors disabled:opacity-50"
              onClick={handleOpenModal}
              disabled={isLoading}
            >
              <Plus size={18} className="mr-2" />
              Add New Student
            </button>
          </div>

          {/* Search */}
          <div className="p-4 flex items-center">
            <div className="relative w-full">
              <Search className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search students by name, email, or course..."
                className="pl-10 pr-4 py-2 border rounded-md w-full"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          {/* Loading State */}
          {isLoading && students.length === 0 && (
            <div className="flex justify-center items-center py-12">
              <Loader size={32} className="animate-spin text-indigo-600" />
            </div>
          )}

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left">Full Name</th>
                  <th className="px-4 py-2 text-left">Email</th>
                  <th className="px-4 py-2 text-left">Course</th>
                  <th className="px-4 py-2 text-left">Status</th>
                  <th className="px-4 py-2 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentStudents.map((s) => (
                  <tr key={s._id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2">{s.fullName}</td>
                    <td className="px-4 py-2">{s.email}</td>
                    <td className="px-4 py-2">{s.course}</td>
                    <td className="px-4 py-2">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          s.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : s.status === "Inactive"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {s.status}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-center space-x-2">
                      <button
                        className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50"
                        onClick={() => navigate(`/student/view/${s._id}`)}
                        title="View Student"
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        className="text-green-600 hover:text-green-800 p-1 rounded hover:bg-green-50"
                        onClick={() => navigate(`/student/Edit/${s._id}`)}
                        title="Edit Student"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50"
                        onClick={() => handleDelete(s._id)}
                        title="Delete Student"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
                {currentStudents.length === 0 && !isLoading && (
                  <tr>
                    <td colSpan={5} className="px-4 py-4 text-center text-gray-500">
                      {search ? "No students match your search." : "No students found."}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="p-4 flex justify-center items-center space-x-4">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
                className="p-2 rounded bg-gray-100 disabled:opacity-50 hover:bg-gray-200 transition-colors"
                title="Previous Page"
              >
                <ChevronLeft size={18} />
              </button>
              <span className="text-sm font-medium">
                Page {currentPage} of {totalPages}
              </span>
              <button
                disabled={currentPage === totalPages || totalPages === 0}
                onClick={() => setCurrentPage((p) => p + 1)}
                className="p-2 rounded bg-gray-100 disabled:opacity-50 hover:bg-gray-200 transition-colors"
                title="Next Page"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Student Invite Modal */}
      {isModalOpen && (
        <div 
           className="fixed inset-0 bg-white/30 backdrop-blur-md flex items-center justify-center z-50 p-4"          onClick={handleModalBackgroundClick}
        >
          <div 
            className="bg-white rounded-xl shadow-2xl w-full max-w-md transform transition-all"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-bold text-gray-800">Invite Student</h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded hover:bg-gray-100"
                disabled={isLoading}
                title="Close Modal"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleInviteSubmit} className="p-6">
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Student Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  placeholder="Enter student email address"
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                    emailError ? 'border-red-500' : 'border-gray-300'
                  }`}
                  value={inviteEmail}
                  onChange={handleEmailChange}
                  disabled={isLoading}
                />
                {emailError && (
                  <p className="text-red-500 text-xs mt-1">{emailError}</p>
                )}
              </div>
              
              <p className="text-sm text-gray-600 mb-6">
                An invitation email with registration instructions will be sent to this address.
              </p>

              {/* Modal Footer */}
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors disabled:opacity-50"
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md flex items-center hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isLoading || !!emailError || !inviteEmail}
                >
                  {isLoading ? (
                    <>
                      <Loader size={18} className="mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={18} className="mr-2" />
                      Send Invite
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentListPage;