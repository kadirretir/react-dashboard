import {Link, Outlet} from 'react-router'
import { Menu, MenuButton, MenuItem, MenuItems, MenuHeading } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import axios from 'axios'


const Dashboard = () => {

  const handleLogout = async (e) => {
e.preventDefault()
    console.log("çalıştı")
    try {
await axios.post(`${import.meta.env.VITE_API_URL}/auth/logout`, null, { withCredentials: true });
window.location.href = "/login";

    } 
    catch (error) {
      console.error(error)
    }
  }
  return (
     <div className='flex justify-between h-screen bg-gray-100'>
   

        <aside className='w-64 bg-white shadow'>
                  <div className="p-4 text-2xl border-b-1 border-red-100">
                    <Link to="/dashboard">Dashboard</Link>
                  </div>

         <nav className=''>
          <ul className='p-0 flex flex-col gap-2 text-center'>
       
           <Link to="main"><li className='py-4 bg-green-100'>Home</li></Link> 
              <Link to="raports"><li className='py-4 bg-green-100 '>Raports</li></Link>
              <li className='py-4 bg-green-100'><a href="#">Users</a></li>
              <li className='py-4 bg-green-100'><a href="#">Settings</a></li>
              <li className='py-4 bg-green-100'><a href="#">Notifications</a></li>
              <li className='py-4 bg-green-100'><a href="#">Help</a></li>
              <li className='py-4 bg-green-100'><a href="#" onClick={handleLogout}>Sign Out</a></li>

          </ul>
         </nav>
        </aside>


   
      {/* Main Content */}
      <Outlet />
     <Menu as="div" className="me-8 mt-3 justify-end relative inline-block text-left">
      <div>
        <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-6 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50">
          Kadir
          <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400" />
        </MenuButton>
      </div>
    
      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
      >
        <div className="py-1">
          <MenuItem>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
            >
              Account settings
            </a>
          </MenuItem>
          <MenuItem>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
            >
              Support
            </a>
          </MenuItem>
          <MenuItem>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
            >
              License
            </a>
          </MenuItem>
          <form onSubmit={handleLogout} method="POST">
            <MenuItem>
              <button
                type="submit"
                className="block w-full px-4 py-2 text-left text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
              >
                Sign out
              </button>
            </MenuItem>
          </form>
        </div>
      </MenuItems>
    </Menu>
        

     </div>
  )
}

export default Dashboard