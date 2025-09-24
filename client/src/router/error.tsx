import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function ErrorPage() {
    const [isVisible, setIsVisible] = useState(false);
    const [particles, setParticles] = useState([]);

    useEffect(() => {
        setIsVisible(true);
        createParticles();
    }, []);

    const createParticles = () => {
        const newParticles = Array.from({ length: 20 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 4 + 2,
            duration: Math.random() * 3 + 2,
        }));
        setParticles(newParticles);
    };

    const reloadPage = () => {
       window.history.back();
    };

    const goHome = () => {
        window.location.href = '/';
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
            {/* Animated Background Particles */}
            <div className="absolute inset-0">
                {particles.map((particle) => (
                    <motion.div
                        key={particle.id}
                        className="absolute rounded-full bg-white opacity-20"
                        style={{
                            width: particle.size,
                            height: particle.size,
                            left: `${particle.x}%`,
                            top: `${particle.y}%`,
                        }}
                        animate={{
                            y: [0, -30, 0],
                            opacity: [0.2, 0.5, 0.2],
                        }}
                        transition={{
                            duration: particle.duration,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                ))}
            </div>

            {/* Floating Shapes */}
            <motion.div
                className="absolute top-1/4 left-1/4 w-64 h-64 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"
                animate={{
                    scale: [1, 1.2, 1],
                    x: [0, 50, 0],
                    y: [0, -30, 0],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />
            <motion.div
                className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"
                animate={{
                    scale: [1.2, 1, 1.2],
                    x: [0, -60, 0],
                    y: [0, 40, 0],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
                <AnimatePresence>
                    {isVisible && (
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="max-w-2xl w-full"
                        >
                            {/* Main Error Card */}
                            <motion.div
                                className="bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 shadow-2xl overflow-hidden"
                                whileHover={{ scale: 1.02 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                {/* Error Header */}
                                <div className="p-8 bg-gradient-to-r from-red-500/20 to-pink-500/20 border-b border-white/10">
                                    <motion.div
                                        initial={{ rotate: -10, scale: 0 }}
                                        animate={{ rotate: 0, scale: 1 }}
                                        transition={{ delay: 0.2, type: "spring" }}
                                        className="flex items-center justify-center mb-4"
                                    >
                                        <div className="relative">
                                            <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center">
                                                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                                </svg>
                                            </div>
                                            <motion.div
                                                className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center"
                                                animate={{ scale: [1, 1.2, 1] }}
                                                transition={{ duration: 2, repeat: Infinity }}
                                            >
                                                <span className="text-sm font-bold">!</span>
                                            </motion.div>
                                        </div>
                                    </motion.div>
                                    <motion.h1
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.3 }}
                                        className="text-4xl md:text-6xl font-bold text-center text-white"
                                    >
                                        404
                                    </motion.h1>
                                    <motion.p
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.4 }}
                                        className="text-xl text-center text-white/80 mt-2"
                                    >
                                        Oops! Something went wrong
                                    </motion.p>
                                </div>

                                {/* Error Content */}
                                <div className="p-8">
                                    <motion.p
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.5 }}
                                        className="text-lg text-white/90 text-center mb-8"
                                    >
                                        Don't worry, it's not your fault. The page you're looking for seems to have vanished into the digital void.
                                    </motion.p>

                                    {/* Animated Error Code */}
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ delay: 0.6, type: "spring" }}
                                        className="bg-black/20 rounded-xl p-4 mb-8 border border-white/10"
                                    >
                                        <code className="text-white/70 font-mono text-sm block text-center">
                                            ERROR: PAGE_NOT_FOUND | STATUS: 404
                                        </code>
                                    </motion.div>

                                    {/* Action Buttons */}
                                    <motion.div
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.7 }}
                                        className="flex flex-col sm:flex-row gap-4 justify-center"
                                    >
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={reloadPage}
                                            className="px-6 py-3 bg-white text-gray-900 rounded-full font-semibold flex items-center justify-center gap-2 transition-all hover:shadow-lg"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                            </svg>
                                            Try Again
                                        </motion.button>

                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={goHome}
                                            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full font-semibold flex items-center justify-center gap-2 transition-all hover:shadow-lg"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                            </svg>
                                            Go Home
                                        </motion.button>
                                    </motion.div>

                                    {/* Additional Help */}
                                    <motion.div
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.8 }}
                                        className="text-center mt-8"
                                    >
                                        <p className="text-white/60 text-sm">
                                            Need help? <a href="/contact" className="text-blue-300 hover:text-blue-200 underline">Contact support</a>
                                        </p>
                                    </motion.div>
                                </div>
                            </motion.div>

                            {/* Floating Elements */}
                            <motion.div
                                className="absolute -bottom-8 -left-8 w-16 h-16 bg-yellow-400 rounded-full opacity-20"
                                animate={{
                                    y: [0, -20, 0],
                                    rotate: [0, 180, 360],
                                }}
                                transition={{
                                    duration: 6,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                            />
                            <motion.div
                                className="absolute -top-8 -right-8 w-12 h-12 bg-green-400 rounded-full opacity-20"
                                animate={{
                                    y: [0, 20, 0],
                                    x: [0, -10, 0],
                                }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

export default ErrorPage;