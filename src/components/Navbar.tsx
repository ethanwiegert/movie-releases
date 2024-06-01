import Link from 'next/link';
// import { useUser } from '@auth0/nextjs-auth0';

const Navbar = () => {
//   const { user } = useUser();

  return (
    <nav className="flex items-center justify-between p-4 bg-gray-800 text-white w-full">
      <Link className="text-xl font-semibold" href="/">
        Home
      </Link>
      <div>
        {/* {user ? (
          <>
            <Link href="/profile" className="mr-4">
              Profile
            </Link>
            <Link href="/api/auth/logout">
              Logout
            </Link>
          </>
        ) : (
          <Link href="/api/auth/login">
            Login
          </Link>
        )} */}
      </div>
    </nav>
  );
};

export default Navbar;
