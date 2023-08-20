import { useState } from 'react'
import { createPortal } from 'react-dom'
import Login from './Login'
import Register from './Register'
import { useDispatch } from 'react-redux'
import { AppDispatch } from 'src/store'
import { setIsOpen } from 'src/utils/slices/user.slice'

type FormPortalProps = {
  isLogin: boolean
}

function PortalForm({ isLogin }: FormPortalProps) {
  const dispatch = useDispatch<AppDispatch>()
  const handleExit = () => {
    dispatch(setIsOpen(false))
  }
  const [jump, setJump] = useState(isLogin)
  return createPortal(
    <div className='h-screen flex items-center lg:text-base text-sm w-screen z-50 top-0 left-0 fixed' id='parent'>
      <div onClick={handleExit} className='bg-zinc-900/60 w-screen h-screen top-0 left-0 absolute' />
      <div className='lg:w-[85%] md:scale-90 xl:w-[70%] w-[90%] bg-white p-4 md:p-6 flex mx-auto border-2 space-x-5 rounded-lg z-10'>
        <div className='space-y-6 md:basis-3/5 w-full'>
          {jump ? <Login jump={jump} setJump={setJump} /> : <Register jump={jump} setJump={setJump} />}
          <div className='border-t-[1px] relative pt-6'>
            <span className='absolute -top-[1px] bg-white left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-600 lg:inline-block hidden px-1'>
              Hoặc đăng nhập bằng
            </span>
            <span className='absolute -top-[1px] bg-white left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-600 lg:hidden inline-block px-1'>
              Đăng nhập với
            </span>
            <div className='flex justify-center items-center space-x-4'>
              <button>
                <img src='https://cdn.divineshop.vn/static/0b314f30be0025da88c475e87a222e5a.svg' alt='google-picture' />
              </button>
              <button>
                <img
                  src='https://cdn.divineshop.vn/static/4ba68c7a47305b454732e1a9e9beb8a1.svg'
                  alt='facebook-picture'
                />
              </button>
            </div>
          </div>
        </div>
        <div className='md:basis-2/5 hidden md:flex items-center relative'>
          <button className='absolute top-0 right-0' onClick={() => dispatch(setIsOpen(false))}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-6 h-6 stroke-[3px] text-gray-500'
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
            </svg>
          </button>
          <img
            className='w-full'
            src='https://cdn.divineshop.vn/static/368e705d45bfc8742aa9d20dbcf4c78c.svg'
            alt='login-picture'
          />
        </div>
      </div>
    </div>,
    document.getElementById('root') as HTMLElement
  )
}

export default PortalForm
