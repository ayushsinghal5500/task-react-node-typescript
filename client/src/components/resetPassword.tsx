import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import { Eye, EyeOff, CheckCircle, XCircle, Lock, Shield } from 'lucide-react';
import { resetPassword } from '../api/Api';

function ResetPassword() {
    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({
        password: false,
        confirmPassword: false
    });

    const passwordRequirements = [
        { id: 'length', label: 'At least 8 characters', regex: /^.{8,}$/ },
        { id: 'lowercase', label: 'One lowercase letter', regex: /[a-z]/ },
        { id: 'uppercase', label: 'One uppercase letter', regex: /[A-Z]/ },
        { id: 'number', label: 'One number', regex: /\d/ },
        { id: 'special', label: 'One special character', regex: /[!@#$%^&*(),.?":{}|<>]/ }
    ];

    const getPasswordStrength = (password) => {
        if (!password) return { strength: 0, label: 'Empty', color: 'bg-gray-300' };
        
        const requirementsMet = passwordRequirements.filter(req => req.regex.test(password)).length;
        const percentage = (requirementsMet / passwordRequirements.length) * 100;
        
        if (percentage <= 20) return { strength: percentage, label: 'Very Weak', color: 'bg-red-500' };
        if (percentage <= 40) return { strength: percentage, label: 'Weak', color: 'bg-orange-500' };
        if (percentage <= 60) return { strength: percentage, label: 'Fair', color: 'bg-yellow-500' };
        if (percentage <= 80) return { strength: percentage, label: 'Good', color: 'bg-blue-500' };
        return { strength: percentage, label: 'Strong', color: 'bg-green-500' };
    };

    const validateField = (name, value) => {
        const newErrors = { ...errors };
        
        switch (name) {
            case 'password':
                if (!value) {
                    newErrors.password = 'Password is required';
                } else if (value.length < 8) {
                    newErrors.password = 'Password must be at least 8 characters';
                } else {
                    delete newErrors.password;
                }
                break;
                
            case 'confirmPassword':
                if (!value) {
                    newErrors.confirmPassword = 'Please confirm your password';
                } else if (value !== formData.password) {
                    newErrors.confirmPassword = 'Passwords do not match';
                } else {
                    delete newErrors.confirmPassword;
                }
                break;
        }
        
        return newErrors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        
        // Validate on change if field has been touched
        if (touched[name]) {
            setErrors(prev => validateField(name, value));
        }
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        setTouched(prev => ({ ...prev, [name]: true }));
        setErrors(prev => validateField(name, value));
    };

    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
        }
        
        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password';
        } else if (formData.confirmPassword !== formData.password) {
            newErrors.confirmPassword = 'Passwords do not match';
        }
        
        setErrors(newErrors);
        setTouched({ password: true, confirmPassword: true });
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) return;
        
        setIsLoading(true);
        
        // Simulate API call
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            setIsSuccess(true);
        } catch (error) {
            setErrors({ submit: 'Failed to reset password. Please try again.' });
        } finally {
            setIsLoading(false);
        }
    };

    const passwordStrength = getPasswordStrength(formData.password);
    const isFormValid = formData.password && formData.confirmPassword && !errors.password && !errors.confirmPassword;

    if (isSuccess) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-green-100 flex items-center justify-center p-4">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
                </div>

                <div className="relative z-10 w-full max-w-md">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center"
                    >
                        <motion.div
                            className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8"
                            initial={{ y: 20 }}
                            animate={{ y: 0 }}
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6"
                            >
                                <CheckCircle className="w-10 h-10 text-white" />
                            </motion.div>

                            <motion.h2
                                initial={{ y: 10, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="text-2xl font-bold text-gray-900 mb-3"
                            >
                                Password Updated!
                            </motion.h2>

                            <motion.p
                                initial={{ y: 10, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="text-gray-600 mb-6"
                            >
                                Your password has been successfully reset. You can now log in with your new password.
                            </motion.p>

                            <motion.div
                                initial={{ y: 10, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.4 }}
                            >
                                <Link
                                    to="/login"
                                    className="w-full bg-gradient-to-r from-emerald-500 to-green-600 text-white py-3 px-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 inline-flex items-center justify-center hover:scale-105 active:scale-95"
                                >
                                    Continue to Login
                                </Link>
                            </motion.div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="mt-6 flex items-center justify-center text-sm text-gray-500"
                        >
                            <Shield className="w-4 h-4 mr-2 text-green-500" />
                            Your password is securely encrypted
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
            </div>

            <div className="relative z-10 w-full max-w-md">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <motion.div
                        className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 overflow-hidden"
                        whileHover={{ scale: 1.01 }}
                        transition={{ type: "spring", stiffness: 400 }}
                    >
                        <div className="p-8">
                            <div className="text-center mb-8">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.2, type: "spring" }}
                                    className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4"
                                >
                                    <Lock className="w-8 h-8 text-white" />
                                </motion.div>
                                <motion.h1
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                    className="text-2xl font-bold text-gray-900 mb-2"
                                >
                                    Create New Password
                                </motion.h1>
                                <motion.p
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                    className="text-gray-600"
                                >
                                    Enter your new password below
                                </motion.p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                >
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                        New Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            id="password"
                                            name="password"
                                            type={showPassword ? "text" : "password"}
                                            value={formData.password}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className={`w-full pl-4 pr-12 py-3 border rounded-xl focus:ring-2 focus:border-transparent transition-all duration-200 ${
                                                errors.password 
                                                    ? 'border-red-300 focus:ring-red-500 bg-red-50/50' 
                                                    : 'border-gray-300 focus:ring-blue-500 bg-white/50'
                                            } ${touched.password && !errors.password && formData.password ? 'border-green-300 focus:ring-green-500' : ''}`}
                                            placeholder="Enter new password"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                        >
                                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                        </button>
                                    </div>
                                    {errors.password && (
                                        <motion.p
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="mt-2 text-sm text-red-600 flex items-center"
                                        >
                                            <XCircle className="w-4 h-4 mr-1" />
                                            {errors.password}
                                        </motion.p>
                                    )}

                                    {/* Password Strength Indicator */}
                                    {formData.password && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            className="mt-3 space-y-2"
                                        >
                                            <div className="flex justify-between text-xs">
                                                <span className="text-gray-600">Password strength:</span>
                                                <span className={`font-semibold ${
                                                    passwordStrength.label === 'Very Weak' ? 'text-red-600' :
                                                    passwordStrength.label === 'Weak' ? 'text-orange-600' :
                                                    passwordStrength.label === 'Fair' ? 'text-yellow-600' :
                                                    passwordStrength.label === 'Good' ? 'text-blue-600' : 'text-green-600'
                                                }`}>
                                                    {passwordStrength.label}
                                                </span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                                                <motion.div
                                                    className={`h-full rounded-full ${passwordStrength.color}`}
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${passwordStrength.strength}%` }}
                                                    transition={{ duration: 0.8, ease: "easeOut" }}
                                                />
                                            </div>
                                        </motion.div>
                                    )}
                                </motion.div>

                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.6 }}
                                >
                                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                                        Confirm Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            type={showConfirmPassword ? "text" : "password"}
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className={`w-full pl-4 pr-12 py-3 border rounded-xl focus:ring-2 focus:border-transparent transition-all duration-200 ${
                                                errors.confirmPassword 
                                                    ? 'border-red-300 focus:ring-red-500 bg-red-50/50' 
                                                    : 'border-gray-300 focus:ring-blue-500 bg-white/50'
                                            } ${touched.confirmPassword && !errors.confirmPassword && formData.confirmPassword ? 'border-green-300 focus:ring-green-500' : ''}`}
                                            placeholder="Confirm your password"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                        >
                                            {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                        </button>
                                    </div>
                                    {errors.confirmPassword && (
                                        <motion.p
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="mt-2 text-sm text-red-600 flex items-center"
                                        >
                                            <XCircle className="w-4 h-4 mr-1" />
                                            {errors.confirmPassword}
                                        </motion.p>
                                    )}
                                    {touched.confirmPassword && !errors.confirmPassword && formData.confirmPassword && (
                                        <motion.p
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="mt-2 text-sm text-green-600 flex items-center"
                                        >
                                            <CheckCircle className="w-4 h-4 mr-1" />
                                            Passwords match
                                        </motion.p>
                                    )}
                                </motion.div>

                                {errors.submit && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="bg-red-50 border border-red-200 rounded-xl p-4"
                                    >
                                        <p className="text-sm text-red-600 flex items-center">
                                            <XCircle className="w-4 h-4 mr-2" />
                                            {errors.submit}
                                        </p>
                                    </motion.div>
                                )}

                                <motion.button
                                    type="submit"
                                    disabled={isLoading || !isFormValid}
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.7 }}
                                    whileHover={{ scale: isLoading || !isFormValid ? 1 : 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3.5 px-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden group"
                                >
                                    <span className="relative z-10 flex items-center justify-center">
                                        {isLoading ? (
                                            <>
                                                <motion.div
                                                    animate={{ rotate: 360 }}
                                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                                                />
                                                Updating Password...
                                            </>
                                        ) : (
                                            <>
                                                <Lock className="w-5 h-5 mr-2" />
                                                Reset Password
                                            </>
                                        )}
                                    </span>
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                                        whileHover={{ scale: 1.1 }}
                                        transition={{ duration: 0.3 }}
                                    />
                                </motion.button>
                            </form>

                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.8 }}
                                className="text-center mt-6"
                            >
                                <Link
                                    to="/login"
                                    className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200 inline-flex items-center hover:underline"
                                >
                                    ← Back to Login
                                </Link>
                            </motion.div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        className="mt-6 text-center"
                    >
                        <div className="flex items-center justify-center text-gray-500 text-sm">
                            <Shield className="w-4 h-4 mr-2 text-green-500" />
                            Your password is encrypted and secure
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}

export default ResetPassword;