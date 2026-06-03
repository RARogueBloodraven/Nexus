import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, CircleDollarSign, Building2, AlertCircle } from 'lucide-react';

import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { UserRole } from '../../types';

export const RegisterPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<UserRole>('entrepreneur');

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    setIsLoading(true);

    try {
      // 1. Register user
      await register(name, email, password, role);

      // 2. Store role for OTP verification
      localStorage.setItem('userRole', role);

      // 3. Redirect to OTP (IMPORTANT FIX)
      navigate('/otp');

    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-bold">
          Create Account
        </h2>
        <p className="text-center text-gray-500 mt-2">
          Join Business Nexus
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow rounded-lg">

          {error && (
            <div className="mb-4 bg-red-50 text-red-700 p-3 rounded flex items-center">
              <AlertCircle size={18} className="mr-2" />
              {error}
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>

            {/* ROLE SELECT */}
            <div className="grid grid-cols-2 gap-3">

              <button
                type="button"
                onClick={() => setRole('entrepreneur')}
                className={`p-3 border rounded flex items-center justify-center ${
                  role === 'entrepreneur'
                    ? 'bg-blue-100 border-blue-500'
                    : ''
                }`}
              >
                <Building2 size={18} className="mr-2" />
                Entrepreneur
              </button>

              <button
                type="button"
                onClick={() => setRole('investor')}
                className={`p-3 border rounded flex items-center justify-center ${
                  role === 'investor'
                    ? 'bg-blue-100 border-blue-500'
                    : ''
                }`}
              >
                <CircleDollarSign size={18} className="mr-2" />
                Investor
              </button>

            </div>

            {/* NAME */}
            <Input
              label="Full Name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              fullWidth
              startAdornment={<User size={18} />}
            />

            {/* EMAIL */}
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              fullWidth
              startAdornment={<Mail size={18} />}
            />

            {/* PASSWORD */}
            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              fullWidth
              startAdornment={<Lock size={18} />}
            />

            {/* CONFIRM PASSWORD */}
            <Input
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              fullWidth
              startAdornment={<Lock size={18} />}
            />

            {/* SUBMIT */}
            <Button
              type="submit"
              fullWidth
              isLoading={isLoading}
            >
              Create Account
            </Button>

          </form>

          {/* LOGIN LINK */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link
                to="/login"
                className="text-blue-600 hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};