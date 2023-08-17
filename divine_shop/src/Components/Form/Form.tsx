import classNames from 'classnames'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

type FormProps = {
  isLogin: boolean
  content: React.ReactNode | string
  buttonClass?: string
}

function Form({ isLogin, content, buttonClass }: FormProps) {
  const [isOpen, setIsOpen] = useState(false)
  useEffect(() => {
    document.getElementById('root')?.classList.add('relative')
  }, [])
  return (
    <>
      <button className={buttonClass} onClick={() => setIsOpen(!isOpen)}>
        {content}
      </button>
      {isOpen && <FormPortal isLogin={isLogin} setIsOpen={setIsOpen} />}
    </>
  )
}

export default Form

type FormPortalProps = {
  isLogin: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const FormPortal = ({ isLogin, setIsOpen }: FormPortalProps) => {
  const handleExit = () => {
    setIsOpen(false)
  }
  const [jump, setJump] = useState(isLogin)
  return createPortal(
    <div className='h-screen flex items-center lg:text-base text-sm w-screen z-50 top-0 left-0 fixed' id='parent'>
      <div onClick={handleExit} className='bg-zinc-950 bg-opacity-80 w-screen h-screen top-0 left-0 absolute' />
      <div className='lg:w-[85%] md:scale-90 xl:w-[70%] w-[90%] bg-white p-4 md:p-6 flex mx-auto border-2 space-x-5 rounded-lg z-10'>
        <div className='space-y-6 md:basis-3/5 w-full'>
          <form className='space-y-3 xl:space-y-4 md:static relative'>
            <div className='text-2xl font-semibold space-x-4'>
              <button
                type='button'
                className={classNames('hover:underline hover:decoration-2', {
                  'text-gray-500': !jump
                })}
                onClick={() => setJump(!jump)}
              >
                Đăng nhập
              </button>
              <button
                type='button'
                className={classNames('hover:underline hover:decoration-2', {
                  'text-gray-500': jump
                })}
                onClick={() => setJump(!jump)}
              >
                Đăng kí
              </button>
            </div>
            <div>
              {jump
                ? 'Đăng nhập để theo dõi đơn hàng, lưu danh sách sản phẩm yêu thích và nhận nhiều ưu'
                : 'Đăng kí để nhận nhiều ưu đãi hấp dẫn'}
            </div>
            {!jump && (
              <div className='relative'>
                <label className='text-gray-400 absolute top-0 left-3 xl:text-sm text-xs' htmlFor='name'>
                  Tên
                </label>
                <input
                  className='w-full hover:ring-2 focus:ring-2 ring-[#2579F2] bg-[#E8F0FE] border-[1px] rounded-md px-3 pt-4 xl:pt-5 pb-1 outline-none'
                  type='text'
                  name='name'
                  id='name'
                />
              </div>
            )}
            <div className='relative'>
              <label className='text-gray-400 absolute top-0 left-3 xl:text-sm text-xs' htmlFor='email'>
                Email
              </label>
              <input
                className='w-full hover:ring-2 focus:ring-2 ring-[#2579F2] bg-[#E8F0FE] border-[1px] rounded-md px-3 pt-4 xl:pt-5 pb-1 outline-none'
                type='text'
                name='email'
                id='email'
              />
            </div>
            <div className='relative'>
              <label className='text-gray-400 absolute top-0 left-3 xl:text-sm text-xs' htmlFor='email'>
                Mật khẩu
              </label>
              <input
                className='w-full hover:ring-2 focus:ring-2 ring-[#2579F2] bg-[#E8F0FE] border-[1px] rounded-md px-3 pt-4 xl:pt-5 pb-1 outline-none'
                type='text'
                name='email'
                id='email'
              />
            </div>
            {jump && (
              <div className='text-[#2579F2]'>
                <a href=''>Bạn quên mật khẩu?</a>
              </div>
            )}
            <div>
              <button
                type='submit'
                className='w-full font-semibold hover:bg-[#2579F2] p-2 xl:p-3 bg-[#2579F2] rounded-md text-white hover:bg-[#2579F2]/90 hover:scale-[1.01]'
              >
                Đăng nhập
              </button>
            </div>
            <button className='absolute -top-5 -right-2 md:hidden' onClick={() => setIsOpen(false)}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-4 md:w-6 h-4 md:h-6 stroke-[3px] text-gray-500'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
              </svg>
            </button>
          </form>
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
          <button className='absolute top-0 right-0' onClick={() => setIsOpen(false)}>
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
