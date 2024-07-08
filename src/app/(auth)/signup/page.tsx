'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, FormEvent, useState } from 'react';

const Home: React.FC = () => {
  const router = useRouter();
  const [user, setUser] = useState<User>({ userName: '', email: '', password: '' });
  const [passwordStrength, setPasswordStrength] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [isPasswordInputFocused, setIsPasswordInputFocused] = useState<boolean>(false);

  const handleSubmit = async (event: FormEvent) => {
    setLoading(true);
    event.preventDefault();
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/signup`, {
      method: 'POST',
      body: JSON.stringify(user),
    });
    await res.json();
    if (res.ok) {
      setLoading(false);
      router.push('/login');
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUser(prevState => ({ ...prevState, [name]: value }));

    if (name === 'password') {
      const password = value;
      setPasswordStrength(password.length > 8 && /\d/.test(password) && /[A-Z]/.test(password) ? 'Strong' : password.length > 6 ? 'Medium' : 'Weak');
    }
  };

  const isFormValid = user.userName && user.email && user.password && passwordStrength === 'Strong';

  const passwordStrengthColor = passwordStrength === 'Strong' ? 'text-green-500' : passwordStrength === 'Medium' ? 'text-yellow-500' : 'text-red-500';

  return (
    <div className="flex flex-grow items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign up for a new account</h2>
        </div>
        <p className="text-red-500 text-center">
          {loading && (
            <Image
              src="/gif/loading.gif"
              alt="loading"
              width={50}
              height={50}
              className="mx-auto"
            />
          )}
        </p>
        <form
          className="mt-8 space-y-6"
          onSubmit={handleSubmit}
        >
          <div className="rounded-md shadow-sm -space-y-px">
            {['userName', 'email', 'password'].map((field, index) => (
              <div key={index}>
                <label
                  htmlFor={field}
                  className="sr-only"
                >
                  {field}
                </label>
                <input
                  id={field}
                  name={field}
                  type={field}
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  value={(user as any)[field]}
                  onChange={handleInputChange}
                  onFocus={() => setIsPasswordInputFocused(true)}
                  onBlur={() => setIsPasswordInputFocused(false)}
                />
                {field === 'password' && isPasswordInputFocused && <div className={`bg-transparent mt-2 ${passwordStrengthColor}`}>Password Strength: {passwordStrength}</div>}
              </div>
            ))}
          </div>

          <div>
            <button
              disabled={!isFormValid}
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Home;
