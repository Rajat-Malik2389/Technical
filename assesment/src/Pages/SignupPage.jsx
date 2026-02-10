import { useState } from 'react';
import { ValidationService } from '../Services/ValidationServices';

function SignupPage({ onSwitchToLogin }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    const nameError = ValidationService.getNameError(name);
    const emailError = ValidationService.getEmailError(email);
    const passwordError = ValidationService.getPasswordError(password);

    if (nameError) newErrors.name = nameError;
    if (emailError) newErrors.email = emailError;
    if (passwordError) newErrors.password = passwordError;
    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setSubmitted(true);
      console.log('Signup successful:', { name, email, password });
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-500 to-purple-800 px-5">
      <div className="bg-white rounded-lg shadow-2xl p-10 w-full max-w-md">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-2">Create Account</h1>
        <p className="text-center text-gray-600 mb-8 text-sm">Join us today</p>

        {submitted && (
          <div className="bg-green-100 text-green-700 px-4 py-3 rounded-lg mb-5 text-center text-sm border border-green-300">
            Account created successfully!
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label htmlFor="name" className="block mb-2 text-gray-800 font-semibold text-sm">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full px-3 py-3 border-2 rounded-lg text-sm focus:outline-none focus:border-purple-500 transition ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.name && <span className="text-red-600 text-xs mt-1 block">{errors.name}</span>}
          </div>

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

          <div className="mb-5">
            <label htmlFor="password" className="block mb-2 text-gray-800 font-semibold text-sm">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-3 py-3 border-2 rounded-lg text-sm focus:outline-none focus:border-purple-500 transition ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.password && <span className="text-red-600 text-xs mt-1 block">{errors.password}</span>}
          </div>

          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block mb-2 text-gray-800 font-semibold text-sm">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`w-full px-3 py-3 border-2 rounded-lg text-sm focus:outline-none focus:border-purple-500 transition ${
                errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.confirmPassword && (
              <span className="text-red-600 text-xs mt-1 block">{errors.confirmPassword}</span>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-purple-500 to-purple-700 text-white font-semibold rounded-lg hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition text-base"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center mt-5 text-gray-600 text-sm">
          Already have an account?{' '}
          <button
            type="button"
            className="text-purple-500 font-semibold underline hover:text-purple-700 transition bg-none border-none cursor-pointer"
            onClick={onSwitchToLogin}
          >
            Sign in here
          </button>
        </p>
      </div>
    </div>
  );
}

export default SignupPage;