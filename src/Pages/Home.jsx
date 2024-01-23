import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className='bg-black text-white min-h-screen flex flex-col items-center justify-center font-bold  text-3xl gap-5'>
      <h1 className='text-5xl'>HOME</h1>
      <div className='bg-sky-800 p-2 px-3 rounded-3xl font-semibold'>
      <Link to={'/login'}>Login</Link>
      </div>
    </div>

  )
}

export default Home
