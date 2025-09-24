import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Lock, Eye, EyeOff, CheckCircle, XCircle, Shield, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import {changePassword} from "../api/Api";
// ✅ Validation Schema
const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Must include an uppercase letter")
      .regex(/[a-z]/, "Must include a lowercase letter")
      .regex(/[0-9]/, "Must include a number")
      .regex(/[^A-Za-z0-9]/, "Must include a special character"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.newPassword !== data.currentPassword, {
    message: "New password cannot be the same as current password",
    path: ["newPassword"],
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type PasswordFormData = z.infer<typeof passwordSchema>;

const PasswordRequirement = ({ met, label }: { met: boolean; label: string }) => (
  <motion.div 
    className="flex items-center gap-2 text-xs sm:text-sm"
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 1, x: 0 }}
  >
    {met ? (
      <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-500" />
    ) : (
      <XCircle className="h-3 w-3 sm:h-4 sm:w-4 text-gray-300" />
    )}
    <span className={met ? "text-green-600" : "text-gray-400"}>{label}</span>
  </motion.div>
);

const ChangePassword: React.FC = () => {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showRequirements, setShowRequirements] = useState(false);

  const { register, handleSubmit, formState, watch } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
    mode: "onChange",
  });
  
  const { errors, isValid } = formState;
  const newPassword = watch("newPassword", "");

  // Password requirement checks
  const passwordRequirements = [
    { id: 'length', label: 'At least 8 characters', regex: /^.{8,}$/ },
    { id: 'lowercase', label: 'One lowercase letter', regex: /[a-z]/ },
    { id: 'uppercase', label: 'One uppercase letter', regex: /[A-Z]/ },
    { id: 'number', label: 'One number', regex: /\d/ },
    { id: 'special', label: 'One special character', regex: /[^A-Za-z0-9]/ }
  ];

  const getPasswordStrength = (password: string) => {
    if (!password) return { strength: 0, label: 'Empty', color: 'bg-gray-300' };
    
    const requirementsMet = passwordRequirements.filter(req => req.regex.test(password)).length;
    const percentage = (requirementsMet / passwordRequirements.length) * 100;
    
    if (percentage <= 20) return { strength: percentage, label: 'Very Weak', color: 'bg-red-500' };
    if (percentage <= 40) return { strength: percentage, label: 'Weak', color: 'bg-orange-500' };
    if (percentage <= 60) return { strength: percentage, label: 'Fair', color: 'bg-yellow-500' };
    if (percentage <= 80) return { strength: percentage, label: 'Good', color: 'bg-blue-500' };
    return { strength: percentage, label: 'Strong', color: 'bg-green-500' };
  };

  const passwordStrength = getPasswordStrength(newPassword);

  const onSubmit = async (data: PasswordFormData) => {
  setIsLoading(true);
  try {
    const res = await changePassword({
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
    });
    setIsSuccess(true);
  } catch (error: any) {
    console.error("Password change failed:", error);
    alert(error.response?.data?.message || "Password change failed");
  } finally {
    setIsLoading(false);
  }
};


  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-green-100 flex items-center justify-center p-4">
        {/* Remove animated blobs on mobile to reduce performance issues */}
        <div className="hidden sm:block absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative z-10 w-full max-w-md mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <motion.div
              className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-xl border border-white/20 p-6 sm:p-8 mx-2"
              initial={{ y: 10 }}
              animate={{ y: 0 }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6"
              >
                <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </motion.div>

              <motion.h2
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3"
              >
                Password Updated!
              </motion.h2>

              <motion.p
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6"
              >
                Your password has been successfully changed.
              </motion.p>

              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="space-y-3"
              >
                <Link
                  to="/dashboard"
                  className="w-full bg-gradient-to-r from-emerald-500 to-green-600 text-white py-3 px-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 inline-flex items-center justify-center text-sm sm:text-base"
                >
                  Continue to Dashboard
                </Link>
                <Link
                  to="/profile"
                  className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-200 inline-flex items-center justify-center text-sm sm:text-base"
                >
                  Back to Profile
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-4 sm:mt-6 flex items-center justify-center text-xs sm:text-sm text-gray-500"
            >
              <Shield className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 text-green-500" />
              Your password is securely encrypted
            </motion.div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4 sm:p-6">
      {/* Remove animated blobs on mobile */}
      <div className="hidden sm:block absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 w-full max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Mobile Header */}
          <div className="sm:hidden mb-4 flex items-center">
            <Link
              to="/profile"
              className="flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back
            </Link>
          </div>

          <motion.div
            className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-xl border border-white/20 overflow-hidden"
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <div className="p-6 sm:p-8">
              <div className="text-center mb-6 sm:mb-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4"
                >
                  <Lock className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </motion.div>
                <motion.h1
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-xl sm:text-2xl font-bold text-gray-900 mb-1 sm:mb-2"
                >
                  Change Password
                </motion.h1>
                <motion.p
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-xs sm:text-sm text-gray-600"
                >
                  Secure your account with a new password
                </motion.p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
                {/* Current Password */}
                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                    Current Password
                  </label>
                  <div className="relative">
                    <input
                      type={showCurrent ? "text" : "password"}
                      placeholder="Enter current password"
                      className={`w-full pl-3 sm:pl-4 pr-10 py-2.5 sm:py-3 border text-sm sm:text-base rounded-xl focus:ring-2 focus:border-transparent transition-all duration-200 ${
                        errors.currentPassword 
                          ? 'border-red-300 focus:ring-red-500 bg-red-50/50' 
                          : 'border-gray-300 focus:ring-blue-500 bg-white/50'
                      }`}
                      {...register("currentPassword")}
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrent(!showCurrent)}
                      className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-1"
                    >
                      {showCurrent ? <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" /> : <Eye className="w-4 h-4 sm:w-5 sm:h-5" />}
                    </button>
                  </div>
                  {errors.currentPassword && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-1 text-xs text-red-600 flex items-center"
                    >
                      <XCircle className="w-3 h-3 mr-1" />
                      {errors.currentPassword.message}
                    </motion.p>
                  )}
                </motion.div>

                {/* New Password */}
                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                    New Password
                  </label>
                  <div 
                    className="relative"
                    onFocus={() => setShowRequirements(true)}
                    onBlur={() => setTimeout(() => setShowRequirements(false), 200)}
                  >
                    <input
                      type={showNew ? "text" : "password"}
                      placeholder="Create new password"
                      className={`w-full pl-3 sm:pl-4 pr-10 py-2.5 sm:py-3 border text-sm sm:text-base rounded-xl focus:ring-2 focus:border-transparent transition-all duration-200 ${
                        errors.newPassword 
                          ? 'border-red-300 focus:ring-red-500 bg-red-50/50' 
                          : newPassword && !errors.newPassword ? 'border-green-300 focus:ring-green-500' : 'border-gray-300 focus:ring-blue-500 bg-white/50'
                      }`}
                      {...register("newPassword")}
                      autoComplete="new-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNew(!showNew)}
                      className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-1"
                    >
                      {showNew ? <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" /> : <Eye className="w-4 h-4 sm:w-5 sm:h-5" />}
                    </button>
                  </div>

                  {/* Password Strength Indicator */}
                  {newPassword && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-2 space-y-1"
                    >
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-600">Strength:</span>
                        <span className={`font-semibold ${
                          passwordStrength.label === 'Very Weak' ? 'text-red-600' :
                          passwordStrength.label === 'Weak' ? 'text-orange-600' :
                          passwordStrength.label === 'Fair' ? 'text-yellow-600' :
                          passwordStrength.label === 'Good' ? 'text-blue-600' : 'text-green-600'
                        }`}>
                          {passwordStrength.label}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2 overflow-hidden">
                        <motion.div
                          className={`h-full rounded-full ${passwordStrength.color}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${passwordStrength.strength}%` }}
                          transition={{ duration: 0.6, ease: "easeOut" }}
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* Password Requirements - Simplified for mobile */}
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ 
                      opacity: showRequirements ? 1 : 0, 
                      height: showRequirements ? 'auto' : 0 
                    }}
                    className="overflow-hidden"
                  >
                    <div className="mt-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <p className="text-xs font-medium text-gray-700 mb-1">Password must contain:</p>
                      <div className="grid grid-cols-1 gap-0.5">
                        {passwordRequirements.map((req) => (
                          <PasswordRequirement
                            key={req.id}
                            met={req.regex.test(newPassword)}
                            label={req.label}
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>

                  {errors.newPassword && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-1 text-xs text-red-600 flex items-center"
                    >
                      <XCircle className="w-3 h-3 mr-1" />
                      {errors.newPassword.message}
                    </motion.p>
                  )}
                </motion.div>

                {/* Confirm Password */}
                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirm ? "text" : "password"}
                      placeholder="Confirm new password"
                      className={`w-full pl-3 sm:pl-4 pr-10 py-2.5 sm:py-3 border text-sm sm:text-base rounded-xl focus:ring-2 focus:border-transparent transition-all duration-200 ${
                        errors.confirmPassword 
                          ? 'border-red-300 focus:ring-red-500 bg-red-50/50' 
                          : watch("confirmPassword") && !errors.confirmPassword ? 'border-green-300 focus:ring-green-500' : 'border-gray-300 focus:ring-blue-500 bg-white/50'
                      }`}
                      {...register("confirmPassword")}
                      autoComplete="new-password"
                      onCopy={(e) => e.preventDefault()}
                      onPaste={(e) => e.preventDefault()}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm(!showConfirm)}
                      className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-1"
                    >
                      {showConfirm ? <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" /> : <Eye className="w-4 h-4 sm:w-5 sm:h-5" />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-1 text-xs text-red-600 flex items-center"
                    >
                      <XCircle className="w-3 h-3 mr-1" />
                      {errors.confirmPassword.message}
                    </motion.p>
                  )}
                  {watch("confirmPassword") && !errors.confirmPassword && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-1 text-xs text-green-600 flex items-center"
                    >
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Passwords match
                    </motion.p>
                  )}
                </motion.div>

                <motion.button
                  type="submit"
                  disabled={isLoading || !isValid}
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  whileHover={{ scale: isLoading || !isValid ? 1 : 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-sm sm:text-base"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                      />
                      Changing...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      <Lock className="w-4 h-4 mr-2" />
                      Change Password
                    </span>
                  )}
                </motion.button>
              </form>

              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="text-center mt-4 sm:mt-6"
              >
                <Link
                  to="/profile"
                  className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200 inline-flex items-center text-xs sm:text-sm hover:underline"
                >
                  <ArrowLeft className="w-3 h-3 mr-1 sm:mr-2" />
                  Back to Profile
                </Link>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-4 sm:mt-6 text-center"
          >
            <div className="flex items-center justify-center text-gray-500 text-xs sm:text-sm">
              <Shield className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 text-green-500" />
              Your password is encrypted and secure
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ChangePassword;