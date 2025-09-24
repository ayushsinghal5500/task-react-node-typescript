import { Router } from 'express';
import {
  registerStudent,
  getStudents,
  updateStudent,
  deleteStudent,
  getStudentById,
  loginStudent, 
  changePassword,
  resetPassword,      
} from '../controllers/studentController';
import { sendStudentInvite  } from '../controllers/studnetInvite'; 
import { requestPasswordReset } from '../controllers/passwordController';

const router = Router();

// 🔹 Student routes
router.post('/register', registerStudent);
router.post('/login', loginStudent); 
router.post('/student/invite', sendStudentInvite); // 🔹 invite route
router.get('/students', getStudents);
router.get('/student/:id', getStudentById);
router.put('/student/:id', updateStudent);
router.delete('/student/:id', deleteStudent);

router.post('/change-password', changePassword);
router.post('/forgot-password', requestPasswordReset);
router.post('/reset-password', resetPassword);

export default router;
