import { LogInIcon, Menu } from 'lucide-react';
import React from 'react'

function Navbar() {
  return (
    <header className='bg-white p-4 shadow flex items-center space-x-4'>
        <div className='md:hidden'>
            <Menu className='w-6 h-6 cursor-pointer'/>
        </div>
      <nav className='flex justify-between items-center flex-1'>
        <h1 className='text-xl font-bold text-blue-600 cursor-pointer'>OpenPDF</h1>
        {/* buttons */}
        <div className='md:flex justify-end space-x-4 hidden'>
          <button className='bg-blue-600 text-white px-4 py-1 rounded-md'>Subscribe Now</button>
          <button className='border border-blue-600 text-blue-600 px-4 py-1 rounded-md'>
            <LogInIcon className='w-4 h-4 inline-block mr-1' />
            Login</button>
        </div>
      </nav>
    </header>
  );
}

export default Navbar