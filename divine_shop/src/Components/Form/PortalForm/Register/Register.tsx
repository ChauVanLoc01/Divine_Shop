import { useEffect, useState } from 'react'
import 'react-toastify/dist/ReactToastify.css'
import { toast } from 'react-toastify'
import { yupResolver } from '@hookform/resolvers/yup'
import classNames from 'classnames'
import { omit } from 'lodash'
import { useForm } from 'react-hook-form'
import { useProfileQuery, useRegisterMutation } from 'src/utils/apis/user.api'
import { isCommonError, isValidationError } from 'src/utils/check-error'
import { RegisterSchemaType, register_schema } from 'src/utils/schemas/register.schema'
import { v4 as uuidv4 } from 'uuid'
import { ValidationFailResponse } from 'src/Types/responses.type'
import { WorkingWithLocalStorage } from 'src/utils/local-storage'
import { useDispatch } from 'react-redux'
import { AppDispatch } from 'src/store'
import { save_access_token, save_user, setIsOpen } from 'src/utils/slices/user.slice'

type RegisterProps = {
  jump: boolean
  setJump: React.Dispatch<React.SetStateAction<boolean>>
}

function Register({ jump, setJump }: RegisterProps) {
  const dispatch = useDispatch<AppDispatch>()
  const [errsForm, setErrsForm] = useState<Partial<Omit<RegisterSchemaType, 'confirm_password'>>>({})
  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm<RegisterSchemaType>({
    resolver: yupResolver(register_schema)
  })
  const [register_mutation, { isLoading }] = useRegisterMutation()
  const { data, refetch } = useProfileQuery(undefined, { skip: !WorkingWithLocalStorage.get('access_token') })
  const onSubmit = async (data: RegisterSchemaType) => {
    try {
      const result = await register_mutation({
        ...omit(data, ['confirm_password']),
        name: `User-${uuidv4().substring(1, 5)}`
      }).unwrap()
      dispatch(save_access_token(result.data.accessToken))
      toast.success('Đăng kí thành công', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored'
      })
    } catch (error) {
      if (isValidationError(error)) {
        const errs_data = error.data as ValidationFailResponse<Partial<Omit<RegisterSchemaType, 'confirm_password'>>>
        setErrsForm(errs_data.errors)
        toast.error(errs_data.message, {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored'
        })
      }
      if (isCommonError(error)) {
        toast.error(error.message, {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored'
        })
      }
    }
  }
  useEffect(() => {
    if (WorkingWithLocalStorage.get('access_token') && !data) {
      refetch()
    }
    if (data) {
      dispatch(save_user(data.data))
      dispatch(setIsOpen(false))
    }
  }, [WorkingWithLocalStorage.get('access_token'), data])
  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-3 xl:space-y-4 md:static relative'>
      <div className='text-2xl font-semibold space-x-4'>
        <button
          type='button'
          className={classNames('hover:underline hover:underline-offset-4 hover:decoration-2', {
            'text-gray-500': !jump,
            'underline underline-offset-4': jump
          })}
          onClick={() => setJump(true)}
        >
          Đăng nhập
        </button>
        <button
          type='button'
          className={classNames('hover:underline hover:underline-offset-4 hover:decoration-2', {
            'text-gray-500': jump,
            'underline underline-offset-4': !jump
          })}
          onClick={() => setJump(false)}
        >
          Đăng kí
        </button>
      </div>
      <div>Đăng kí để nhận nhiều ưu đãi hấp dẫn</div>
      <div className='relative'>
        <label
          className={classNames('text-gray-400 flex items-center absolute top-0 left-3 xl:text-sm text-xs', {
            'text-red-500': errors.email || errsForm.email
          })}
          htmlFor='email'
        >
          Email {errors?.email?.message}
          {errsForm.email}
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
            'text-red-500': errors.password || errsForm.password
          })}
          htmlFor='password'
        >
          Mật khẩu {errors?.password?.message}
          {errsForm.password}
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
        {isLoading ? (
          <div className='w-full font-semibold p-2 xl:p-3 bg-[#2579F2] rounded-md text-white text-center cursor-pointer hover:bg-[#2579F2]/90'>
            Đăng kí
          </div>
        ) : (
          <button
            type='submit'
            className='w-full font-semibold p-2 xl:p-3 bg-[#2579F2] rounded-md text-white hover:bg-[#2579F2]/90'
          >
            Đăng kí
          </button>
        )}
      </div>
      <button type='button' className='absolute -top-5 -right-2 md:hidden' onClick={() => dispatch(setIsOpen(false))}>
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
