import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, CircleDollarSign, Building2, LogIn, AlertCircle } from 'lucide-react';

import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { UserRole } from '../../types';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('entrepreneur');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      // 1. login user
      await login(email, password, role);

      // 2. store role for OTP page
      localStorage.setItem('userRole', role);

      // 3. IMPORTANT: DO NOT go to dashboard
      navigate('/otp');

    } catch (err) {
      setError((err as Error).message);
      setIsLoading(false);
    }
  };

  const fillDemoCredentials = (userRole: UserRole) => {
    if (userRole === 'entrepreneur') {
      setEmail('sarah@techwave.io');
      setPassword('password123');
    } else {
      setEmail('michael@vcinnovate.com');
      setPassword('password123');
    }
    setRole(userRole);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-bold">
          Sign in to Business Nexus
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">

          {error && (
            <div className="mb-4 bg-red-50 text-red-700 p-3 rounded flex items-center">
              <AlertCircle size={18} className="mr-2" />
              {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>

            {/* ROLE SELECT */}
            <div className="grid grid-cols-2 gap-3">

              <button
                type="button"
                onClick={() => setRole('entrepreneur')}
                className={`p-3 border rounded ${role === 'entrepreneur'
                    ? 'bg-blue-100 border-blue-500'
                    : ''
                  }`}
              >
                <Building2 size={18} /> Entrepreneur
              </button>

              <button
                type="button"
                onClick={() => setRole('investor')}
                className={`p-3 border rounded ${role === 'investor'
                    ? 'bg-blue-100 border-blue-500'
                    : ''
                  }`}
              >
                <CircleDollarSign size={18} /> Investor
              </button>

            </div>

            {/* EMAIL */}
            <Input
              label="Email address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              fullWidth
              startAdornment={<User size={18} />}
            />

            {/* PASSWORD */}
            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              fullWidth
            />

            {/* SUBMIT */}
            <Button
              type="submit"
              fullWidth
              isLoading={isLoading}
              leftIcon={<LogIn size={18} />}
            >
              Sign in
            </Button>

          </form>

          {/* DEMO BUTTONS */}
          <div className="mt-6 grid grid-cols-2 gap-3">

            <Button
              variant="outline"
              onClick={() => fillDemoCredentials('entrepreneur')}
            >
              Entrepreneur Demo
            </Button>

            <Button
              variant="outline"
              onClick={() => fillDemoCredentials('investor')}
            >
              Investor Demo
            </Button>

          </div>

        </div>
      </div>
    </div>
  );
};