'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FormEvent } from 'react';

const Header: React.FC = () => {
  const router = useRouter();
  const handleLogout = async (event: FormEvent) => {
    event.preventDefault();
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/logout`, { method: 'GET' });
    if (res.ok) {
      router.push('/login');
    }
  };
  return (
    <header className="flex justify-between items-center p-2">
      <Image
        src="/img/beer.png"
        alt="logo"
        width="25"
        height="25"
        priority={true}
      />
      <button
        onClick={handleLogout}
        type="button"
        className="focus:outline-none text-white bg-red-700 focus:ring-red-300 font-medium text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-500 dark:hover:bg-red-700"
      >
        Logout
      </button>
    </header>
  );
};

export default Header;
