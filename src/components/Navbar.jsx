import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-slate-800 text-white' >
      <div className="mycontainer flex justify-between items-center py-5 px-4 h-14">

        <div className='logo font-bold text-white text-2xl'>
          <span className='text-green-500'>&lt;</span>

          PassMan
          <span className='text-green-500'>/&gt;</span>
        </div>

        <a href="https://github.com/prateek980ti/PassMan" target='__blank' className='bg-green-500 text-white rounded-full flex items-center'>
          <img className='p-2 w-10 invert' src="icons/github.png" alt="" />
          <span className='font-bold text-sm pr-2'>Github</span>
        </a>


      </div>
    </nav >
  )
}

export default Navbar
