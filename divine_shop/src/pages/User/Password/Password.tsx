import { useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import classNames from 'classnames'
import { useForm } from 'react-hook-form'
import { ChangePasswordSchemaType, change_password_schema } from 'src/utils/schemas/change-password.schema'
import { useChangePasswordMutation } from 'src/utils/apis/user.api'
import { omit } from 'lodash'
import { ChangePassword } from 'src/Types/user.type'
import { isCommonError, isValidationError } from 'src/utils/check-error'
import { FailResponse, ValidationFailResponse } from 'src/Types/responses.type'
import { toast } from 'react-toastify'

type Visible = {
  current_password: boolean
  new_password: boolean
  confirm_new_password: boolean
}

function Password() {
  const [visible, setVisible] = useState<Visible>({
    current_password: false,
    new_password: false,
    confirm_new_password: false
  })
  const [err, setErr] = useState<{ current_password?: string }>({})
  const [change_password, { isLoading }] = useChangePasswordMutation()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver<ChangePasswordSchemaType>(change_password_schema)
  })
  const onSubmit = async (data: ChangePasswordSchemaType) => {
    try {
      await change_password(omit(data, ['confirm_new_password']) as ChangePassword).unwrap()
      reset()
      setErr({})
      toast.success('Cập nhật mật khẩu thành công', {
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
      console.log(error)
      if (isValidationError(error)) {
        const err_data = (
          error.data as ValidationFailResponse<Partial<Omit<ChangePasswordSchemaType, 'confirm_new_password'>>>
        ).errors
        setErr(err_data)
      }
      if (isCommonError(error)) {
        toast.error((error.data as FailResponse).message, {
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
  const handleVisible = (key: keyof Visible) => () => {
    setVisible({
      ...visible,
      [key]: !visible[key]
    })
  }
  return (
    <div className='rounded-lg bg-white border border-gray-100 md:py-10 flex justify-center py-6'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='xl:w-1/2 lg:w-3/5 md:w-4/5 w-5/6 md:grid md:grid-cols-2 md:gap-y-4 flex flex-col'
      >
        <div className='text-center col-span-2 col-start-1 font-semibold text-2xl pb-3'>Thay đổi mật khẩu</div>
        <label className='md:self-center md:mb-0 mb-2' htmlFor='current_password'>
          Mật khẩu hiện tại
        </label>
        <div className='relative md:mb-0 mb-2'>
          <span className='absolute lg:text-sm text-xs bg-white top-0 left-3 px-1 text-red-600 -translate-y-1/2'>
            {errors.current_password?.message}
            {err.current_password}
          </span>
          <input
            className={classNames(
              'hover:ring-1 w-full ring-[#2579F2] focus:ring-1 outline-none border border-gray-300 rounded-md pr-6 md:pl-3 pl-2 py-1 lg:py-2',
              {
                'ring-transparent border border-red-600': errors.current_password || err.current_password
              }
            )}
            type={visible.current_password ? 'text' : 'password'}
            id='current_password'
            {...register('current_password')}
          />
          <button
            onClick={handleVisible('current_password')}
            type='button'
            className='absolute w-fit top-1/2 -translate-x-5 -translate-y-1/2'
          >
            {!visible.current_password ? (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-3 h-3 text-gray-400 outline-none border-none'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88'
                />
              </svg>
            ) : (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-3 h-3 text-gray-400 outline-none border-none'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z'
                />
                <path strokeLinecap='round' strokeLinejoin='round' d='M15 12a3 3 0 11-6 0 3 3 0 016 0z' />
              </svg>
            )}
          </button>
        </div>
        <label className='md:self-center md:mb-0 mb-2' htmlFor='new_password'>
          Mật khẩu mới
        </label>
        <div className='relative md:mb-0 mb-2'>
          <span className='absolute lg:text-sm text-xs bg-white top-0 left-3 px-1 text-red-600 -translate-y-1/2'>
            {errors.new_password?.message}
          </span>
          <input
            className={classNames(
              'hover:ring-1 w-full ring-[#2579F2] focus:ring-1 outline-none border border-gray-300 rounded-md pr-6 md:pl-3 pl-2 py-1 lg:py-2',
              {
                'ring-transparent border border-red-600': errors.new_password
              }
            )}
            type={visible.new_password ? 'text' : 'password'}
            id='new_password'
            {...register('new_password')}
          />
          <button
            onClick={handleVisible('new_password')}
            type='button'
            className='absolute w-fit top-1/2 -translate-x-5 -translate-y-1/2'
          >
            {!visible.new_password ? (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-3 h-3 text-gray-400 outline-none border-none'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88'
                />
              </svg>
            ) : (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-3 h-3 text-gray-400 outline-none border-none'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z'
                />
                <path strokeLinecap='round' strokeLinejoin='round' d='M15 12a3 3 0 11-6 0 3 3 0 016 0z' />
              </svg>
            )}
          </button>
        </div>
        <label className='md:self-center md:mb-0 mb-2' htmlFor='confirm_new_password'>
          Nhập lại mật khẩu
        </label>
        <div className='relative md:mb-0 mb-2'>
          <span className='absolute lg:text-sm text-xs bg-white top-0 left-3 px-1 text-red-600 -translate-y-1/2'>
            {errors.confirm_new_password?.message}
          </span>
          <input
            className={classNames(
              'hover:ring-1 w-full ring-[#2579F2] focus:ring-1 outline-none border border-gray-300 rounded-md pr-6 md:pl-3 pl-2 py-1 lg:py-2',
              {
                'ring-transparent border border-red-600': errors.confirm_new_password
              }
            )}
            type={visible.confirm_new_password ? 'text' : 'password'}
            id='confirm_new_password'
            {...register('confirm_new_password')}
          />
          <button
            onClick={handleVisible('confirm_new_password')}
            type='button'
            className='absolute w-fit top-1/2 -translate-x-5 -translate-y-1/2'
          >
            {!visible.confirm_new_password ? (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-3 h-3 text-gray-400 outline-none border-none'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88'
                />
              </svg>
            ) : (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-3 h-3 text-gray-400 outline-none border-none'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z'
                />
                <path strokeLinecap='round' strokeLinejoin='round' d='M15 12a3 3 0 11-6 0 3 3 0 016 0z' />
              </svg>
            )}
          </button>
        </div>
        <div className='col-start-2 text-right py-2'>
          <input
            type={isLoading ? 'button' : 'submit'}
            className='ring-[1px] ring-gray-300 hover:ring-[#2579F2] rounded-md px-8 py-1 cursor-pointer text-[#2579F2] font-semibold cursor-'
            value='Thay đổi'
          />
        </div>
      </form>
    </div>
  )
}

export default Password
