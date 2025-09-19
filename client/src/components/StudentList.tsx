import React, { useState, useEffect } from "react";
import {
  Eye,
  Edit,
  Trash2,
  Search,
  Plus,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { getStudents, deleteStudent } from "../api/Api";
import { useNavigate } from "react-router-dom";

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
  const studentsPerPage = 5;

  const navigate = useNavigate();

  // 🔹 Fetch students
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await getStudents();
        setStudents(response.data);
      } catch (error) {
        console.error("Failed to fetch students:", error);
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
      alert("✅ Student deleted successfully");
    } catch (error) {
      console.error("Failed to delete student:", error);
      alert("❌ Failed to delete student");
    }
  };

  // 🔹 Filter + Pagination
  const filteredStudents = students.filter((s) =>
    s.fullName.toLowerCase().includes(search.toLowerCase())
  );
  const indexOfLast = currentPage * studentsPerPage;
  const indexOfFirst = indexOfLast - studentsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="p-4 bg-indigo-600 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-white">Student Management</h1>
            <button
              className="bg-white text-indigo-600 px-4 py-2 rounded-md flex items-center font-medium hover:bg-indigo-50 transition-colors"
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
                placeholder="Search students..."
                className="pl-10 pr-4 py-2 border rounded-md w-full"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

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
                        className="text-blue-600 hover:text-blue-800"
                        onClick={() => navigate(`/student/view/${s._id}`)}
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        className="text-green-600 hover:text-green-800"
                        onClick={() => navigate(`/student/Edit/${s._id}`)}
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        className="text-red-600 hover:text-red-800"
                        onClick={() => handleDelete(s._id)}
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
                {currentStudents.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-4 py-4 text-center text-gray-500">
                      No students found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="p-4 flex justify-center items-center space-x-4">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="p-2 rounded bg-gray-100 disabled:opacity-50"
            >
              <ChevronLeft size={18} />
            </button>
            <span>
              Page {currentPage} of {totalPages || 1}
            </span>
            <button
              disabled={currentPage === totalPages || totalPages === 0}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="p-2 rounded bg-gray-100 disabled:opacity-50"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentListPage;
