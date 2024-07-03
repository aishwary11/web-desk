export default function Header() {
  return (
    <header className="flex justify-center items-center p-2">
      <p className="text-red-500">
        {new Date().getFullYear()}
        <span className="text-green-400">&copy;</span>
      </p>
    </header>
  );
}
