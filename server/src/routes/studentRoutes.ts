import { Router } from 'express';
import {
  registerStudent,
  getStudents,
  updateStudent,
  deleteStudent,
  getStudentById,
  loginStudent, // 🔹 import login controller
} from '../controllers/studentController';

const router = Router();

// 🔹 Student routes
router.post('/register', registerStudent);
router.post('/login', loginStudent); // 🔹 added login route
router.get('/students', getStudents);
router.get('/student/:id', getStudentById);
router.put('/student/:id', updateStudent);
router.delete('/student/:id', deleteStudent);

export default router;
