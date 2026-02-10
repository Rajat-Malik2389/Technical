import { useState } from 'react';
import { ValidationService } from "../Services/ValidationServices.jsx";


function LoginPage({ onSwitchToSignup }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    const emailError = ValidationService.getEmailError(email);
    const passwordError = ValidationService.getPasswordError(password);

    if (emailError) newErrors.email = emailError;
    if (passwordError) newErrors.password = passwordError;

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setSubmitted(true);
      console.log('Login successful:', { email, password });
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-500 to-purple-800 px-5">
      <div className="bg-white rounded-lg shadow-2xl p-10 w-full max-w-md">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-2">Welcome Back</h1>
        <p className="text-center text-gray-600 mb-8 text-sm">Sign in to your account</p>

        {submitted && (
          <div className="bg-green-100 text-green-700 px-4 py-3 rounded-lg mb-5 text-center text-sm border border-green-300">
            Login successful!
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label htmlFor="email" className="block mb-2 text-gray-800 font-semibold text-sm">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-3 py-3 border-2 rounded-lg text-sm focus:outline-none focus:border-purple-500 transition ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.email && <span className="text-red-600 text-xs mt-1 block">{errors.email}</span>}
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block mb-2 text-gray-800 font-semibold text-sm">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-3 py-3 border-2 rounded-lg text-sm focus:outline-none focus:border-purple-500 transition ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.password && <span className="text-red-600 text-xs mt-1 block">{errors.password}</span>}
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-purple-500 to-purple-700 text-white font-semibold rounded-lg hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition text-base"
          >
            Sign In
          </button>
        </form>

        <p className="text-center mt-5 text-gray-600 text-sm">
          Don't have an account?{' '}
          <button
            type="button"
            className="text-purple-500 font-semibold underline hover:text-purple-700 transition bg-none border-none cursor-pointer"
            onClick={onSwitchToSignup}
          >
            Sign up here
          </button>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;