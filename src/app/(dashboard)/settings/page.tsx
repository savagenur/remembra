import { Settings } from 'lucide-react'
import React from 'react'

const SettingsPage = () => {
  return (
    <div className='flex flex-col justify-center items-center w-full text-3xl'>
      <div className='flex items-center gap-2'>
      <Settings />

        Settings in development process.
      </div>
    </div>
  )
}

export default SettingsPage