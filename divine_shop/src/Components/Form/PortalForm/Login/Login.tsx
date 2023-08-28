import { useState, useEffect } from 'react'
import 'react-toastify/dist/ReactToastify.css'
import { toast } from 'react-toastify'
import classNames from 'classnames'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { LoginSchemaType, login_schema } from 'src/utils/schemas/login.schema'
import { useLoginMutation, useProfileQuery } from 'src/utils/apis/user.api'
import { isCommonError, isValidationError } from 'src/utils/check-error'
import { FailResponse, ValidationFailResponse } from 'src/Types/responses.type'
import { WorkingWithLocalStorage as ls } from 'src/utils/local-storage'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/store'
import { save_access_token, save_user, setIsOpen } from 'src/utils/slices/user.slice'

function Login() {
  const isOpen = useSelector((state: RootState) => state.UserSliceName.isOpen)
  const dispatch = useDispatch<AppDispatch>()
  const [errsForm, setErrsForm] = useState<Partial<LoginSchemaType>>({})
  const [login, { isLoading }] = useLoginMutation()
  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm<LoginSchemaType>({
    resolver: yupResolver(login_schema)
  })
  const { data, refetch } = useProfileQuery(undefined, { skip: !ls.get('access_token') })
  const onSubmit = async (data: LoginSchemaType) => {
    try {
      const result = await login(data).unwrap()
      dispatch(save_access_token(result.data.accessToken))
      toast.success('Đăng nhập thành công', {
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
        const errs_data = error.data as ValidationFailResponse<Partial<LoginSchemaType>>
        setErrsForm(errs_data.errors)
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
  useEffect(() => {
    if (ls.get('access_token') && !data) {
      refetch()
    }
    if (data) {
      dispatch(save_user(data.data))
      dispatch(
        setIsOpen({
          open: false
        })
      )
    }
  }, [ls.get('access_token'), data])
  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-3 xl:space-y-4 md:static relative'>
      <div className='text-2xl font-semibold space-x-4'>
        <button
          type='button'
          className={classNames('hover:underline hover:underline-offset-4 hover:decoration-2', {
            'text-gray-500 underline': isOpen.type === 'register'
          })}
          onClick={() =>
            dispatch(
              setIsOpen({
                ...isOpen,
                type: 'login'
              })
            )
          }
        >
          Đăng nhập
        </button>
        <button
          type='button'
          className={classNames('hover:underline hover:underline-offset-4 hover:decoration-2', {
            'text-gray-500': isOpen.type === 'login'
          })}
          onClick={() =>
            dispatch(
              setIsOpen({
                ...isOpen,
                type: 'register'
              })
            )
          }
        >
          Đăng kí
        </button>
      </div>
      <div>Đăng nhập để theo dõi đơn hàng, lưu danh sách sản phẩm yêu thích và nhận nhiều ưu</div>
      <div className='relative'>
        <label
          className={classNames('text-gray-400 flex items-center absolute top-0 left-3 xl:text-sm text-xs', {
            'text-red-500': errors.email || errsForm.email
          })}
          htmlFor='email'
        >
          Email {errors.email?.message}
          {errsForm.email}
        </label>
        <input
          className={classNames(
            'w-full hover:ring-2 focus:ring-2 ring-[#2579F2] bg-[#E8F0FE] border rounded-md px-3 pt-4 xl:pt-5 pb-1 outline-none',
            {
              'ring-transparent border-red-500': errors.email || errsForm.email
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
          Mật khẩu {errors.password?.message}
          {errsForm.password}
        </label>
        <input
          className={classNames(
            'w-full hover:ring-2 focus:ring-2 ring-[#2579F2] bg-[#E8F0FE] border rounded-md px-3 pt-4 xl:pt-5 pb-1 outline-none',
            {
              'ring-transparent border-red-500': errors.password || errsForm.password
            }
          )}
          type='text'
          id='password'
          {...register('password')}
        />
      </div>
      <div className='text-[#2579F2]'>
        <a href=''>Bạn quên mật khẩu?</a>
      </div>
      <div>
        <button
          type={isLoading ? 'button' : 'submit'}
          className='w-full font-semibold p-2 xl:p-3 bg-[#2579F2] rounded-md text-white hover:bg-[#2579F2]/90'
        >
          Đăng nhập
        </button>
      </div>
      <button
        type='button'
        className='absolute -top-5 -right-2 md:hidden'
        onClick={() =>
          dispatch(
            setIsOpen({
              open: false
            })
          )
        }
      >
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

export default Login
