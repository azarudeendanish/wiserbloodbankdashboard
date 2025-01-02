import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links';
import Logo from '@/app/ui/logo';
import { PowerIcon } from '@heroicons/react/24/outline';
let userProfile = true
export default function SideNav() {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <div className="mb-2 h-20  rounded-md bg-blue-600 p-4 md:h-40">
        {userProfile &&
          <div className="dropdown grid justify-items-center">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
              <li>
                <Link className="" href=''>
                  Hello 
                  <span className="badge">User</span>
                </Link>
              </li>
              <li><Link href=''>Edir Profile</Link></li>
              <li><Link href=''>Logout</Link></li>
            </ul>
          </div>
        }
        <Link
          href="/"
        >
          <div className="w-32 text-white md:w-40">
            <Logo />
          </div>
        </Link>
      </div>

      <div className="flex grow justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        <form>
          <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
            <PowerIcon className="w-6" />
            <div className="hidden md:block">Sign Out</div>
          </button>
        </form>
      </div>
    </div>
  );
}