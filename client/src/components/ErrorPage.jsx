import { Link } from 'react-router';
import { motion } from "framer-motion";

const ErrorPage = () => {
 return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-6 text-center">
      <motion.div
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mb-6"
      >
        {/* SVG emoji illustration */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="120"
          height="120"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#4f46e5"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mx-auto"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="9" y1="9" x2="9.01" y2="9" />
          <line x1="15" y1="9" x2="15.01" y2="9" />
          <path d="M8 15a4 4 0 0 1 8 0" />
        </svg>
      </motion.div>

      <motion.h1
        className="text-6xl font-bold text-indigo-600 mb-4"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        404
      </motion.h1>

      <motion.h2
        className="text-2xl font-semibold text-gray-800 mb-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        Page Not Found
      </motion.h2>

      <motion.p
        className="text-gray-600 mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >

        Sorry, there is no such page or it could be moved.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition"
        >
          Return to Home
        </Link>
      </motion.div>
    </div>
  );
}

export default ErrorPage