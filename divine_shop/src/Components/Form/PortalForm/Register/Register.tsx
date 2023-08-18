import { yupResolver } from '@hookform/resolvers/yup'
import classNames from 'classnames'
import { useForm } from 'react-hook-form'
import { RegisterSchemaType, register_schema } from 'src/utils/schemas/register.schema'

type RegisterProps = {
  jump: boolean
  setJump: React.Dispatch<React.SetStateAction<boolean>>
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

function Register({ jump, setJump, setIsOpen }: RegisterProps) {
  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm<RegisterSchemaType>({
    resolver: yupResolver(register_schema)
  })
  const onSubmit = (data: RegisterSchemaType) => {
    console.log(data)
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-3 xl:space-y-4 md:static relative'>
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
      <div>Đăng kí để nhận nhiều ưu đãi hấp dẫn</div>
      <div className='relative'>
        <label
          className={classNames('text-gray-400 flex items-center absolute top-0 left-3 xl:text-sm text-xs', {
            'text-red-500': errors.email
          })}
          htmlFor='email'
        >
          Email {errors?.email?.message}
        </label>
        <input
          className={classNames(
            'w-full hover:ring-2 focus:ring-2 ring-[#2579F2] bg-[#E8F0FE] border rounded-md px-3 pt-4 xl:pt-5 pb-1 outline-none',
            {
              'ring-transparent border-1 border-red-500': errors.email
            }
          )}
          type='text'
          id='email'
          {...register('email')}
        />
      </div>
      <div className='relative'>
        <label
          className={classNames('text-gray-400 flex items-center absolute top-0 left-3 xl:text-sm text-xs', {
            'text-red-500': errors.password
          })}
          htmlFor='password'
        >
          Mật khẩu {errors?.password?.message}
        </label>
        <input
          className={classNames(
            'w-full hover:ring-2 focus:ring-2 ring-[#2579F2] bg-[#E8F0FE] border rounded-md px-3 pt-4 xl:pt-5 pb-1 outline-none',
            {
              'ring-transparent border-1 border-red-500': errors.password
            }
          )}
          type='text'
          id='password'
          {...register('password')}
        />
      </div>
      <div className='relative'>
        <label
          className={classNames('text-gray-400 flex items-center absolute top-0 left-3 xl:text-sm text-xs', {
            'text-red-500': errors.confirm_password
          })}
          htmlFor='confirm_password'
        >
          Nhập lại mật khẩu {errors?.confirm_password?.message}
        </label>
        <input
          className={classNames(
            'w-full hover:ring-2 focus:ring-2 ring-[#2579F2] bg-[#E8F0FE] border rounded-md px-3 pt-4 xl:pt-5 pb-1 outline-none',
            {
              'ring-transparent border-1 border-red-500': errors.confirm_password
            }
          )}
          type='text'
          id='confirm_password'
          {...register('confirm_password')}
        />
      </div>
      <div>
        <button
          type='submit'
          className='w-full font-semibold p-2 xl:p-3 bg-[#2579F2] rounded-md text-white hover:bg-[#2579F2]/90 hover:scale-[1.01]'
        >
          Đăng kí
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
  )
}

export default Register
