import Image from 'next/image';

export default function Header() {
  return (
    <header className="flex justify-center items-center p-2">
      <Image
        src="/img/beer.png"
        alt="logo"
        width="25"
        height="25"
      />
    </header>
  );
}
