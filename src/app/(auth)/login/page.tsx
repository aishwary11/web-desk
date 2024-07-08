'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useState } from 'react';

const Home: React.FC = () => {
  const router = useRouter();
  const [user, setUser] = useState<User>({ userName: '', password: '' });
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (event: FormEvent) => {
    setLoading(true);
    event.preventDefault();
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/login`, {
      method: 'POST',
      body: JSON.stringify(user),
    });
    if (res.ok) {
      setLoading(false);
      router.push('/dashboard');
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUser(prevState => ({ ...prevState, [name]: value }));
  };

  return (
    <div className="flex flex-grow items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
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
            {['userName', 'password'].map((field, index) => (
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
                />
              </div>
            ))}
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Home;
