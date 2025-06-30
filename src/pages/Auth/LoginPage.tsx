import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Shield, Eye, EyeOff, AlertCircle } from 'lucide-react';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user, login } = useAuth();

  useEffect(() => {
    // Demo credentials hint
    setEmail('customer@example.com');
    setPassword('password');
  }, []);

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    const success = await login(email, password);
    if (!success) {
      setError('Invalid email or password');
    }
    setIsSubmitting(false);
  };

  const demoUsers = [
    { email: 'customer@example.com', role: 'Retail Customer' },
    { email: 'employee@company.com', role: 'Corporate Employee' },
    { email: 'hr@company.com', role: 'HR Admin' },
    { email: 'underwriter@insurer.com', role: 'Underwriter' },
    { email: 'admin@insurer.com', role: 'Underwriter Admin' },
    { email: 'rm@insurer.com', role: 'Relationship Manager' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="bg-white rounded-material shadow-material-lg p-8 animate-fade-in">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="bg-primary-600 p-3 rounded-full">
                <Shield className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold font-poppins text-gray-900">InsureTech Pro</h1>
            <p className="text-gray-600 font-roboto mt-2">Next-Generation Insurance Management</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-material p-4 flex items-center space-x-3 animate-slide-up">
                <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                <p className="text-red-700 font-roboto text-sm">{error}</p>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 font-roboto mb-2">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-material focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 font-roboto transition-all duration-200"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 font-roboto mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none relative block w-full px-4 py-3 pr-12 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-material focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 font-roboto transition-all duration-200"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-material text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 active:scale-95"
            >
              {isSubmitting ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Signing in...
                </div>
              ) : (
                'Sign in'
              )}
            </button>
          </form>

          {/* Demo Users */}
          <div className="mt-8 border-t border-gray-200 pt-6">
            <h3 className="text-sm font-medium text-gray-700 font-poppins mb-4">Demo Users (Password: password)</h3>
            <div className="grid gap-2">
              {demoUsers.map((user, index) => (
                <button
                  key={index}
                  onClick={() => setEmail(user.email)}
                  className="text-left p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200 group"
                >
                  <div className="font-roboto text-sm text-gray-900">{user.email}</div>
                  <div className="font-roboto text-xs text-gray-500 group-hover:text-primary-600 transition-colors">{user.role}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;