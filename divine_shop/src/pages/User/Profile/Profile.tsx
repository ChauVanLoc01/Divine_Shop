import { yupResolver } from '@hookform/resolvers/yup'
import { pick } from 'lodash'
import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/store'
import { ProfileSchemaType, profile_schema } from 'src/utils/schemas/profile.schema'
import { toast } from 'react-toastify'
import classNames from 'classnames'
import { useUpdateAvatarMutation, useUpdateProfileMutation } from 'src/utils/apis/user.api'
import { update_user } from 'src/utils/slices/user.slice'
import { isCommonError, isValidationError } from 'src/utils/check-error'
import { FailResponse, ValidationFailResponse } from 'src/Types/responses.type'

const LimitSize = 5 * 1024000

function Profile() {
  const user = useSelector((state: RootState) => state.UserSliceName.user)
  const dispatch = useDispatch<AppDispatch>()
  const [update_profile] = useUpdateProfileMutation()
  const [update_avatar] = useUpdateAvatarMutation()
  const [file, setFile] = useState<File | null>(null)
  const ref = useRef<HTMLInputElement>(null)
  const [errForm, setErrForm] = useState<Partial<ProfileSchemaType>>({})
  const {
    register,
    handleSubmit,
    formState: {
      errors: { email, name }
    }
  } = useForm<ProfileSchemaType>({
    resolver: yupResolver(profile_schema),
    defaultValues: pick(user, ['email', 'name'])
  })
  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    ref.current?.setAttribute('value', '')
    const selected_file = e.target.files?.[0] as File
    if (selected_file && (selected_file.size >= LimitSize || !selected_file.type.includes('image'))) {
      toast.error('Hình ảnh không hợp lệ', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored'
      })
    } else {
      setFile(selected_file)
      try {
        const formData = new FormData()
        formData.append('avatar', selected_file)
        await update_avatar(formData).unwrap()
        toast.success('Cập nhật avatar thành công', {
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
  }
  const onSubmit = async (data: ProfileSchemaType) => {
    try {
      const result = await update_profile(data).unwrap()
      dispatch(update_user(result.data))
      toast.success('Cập nhật thông tin thành công', {
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
        const err_form = (error.data as ValidationFailResponse<Partial<ProfileSchemaType>>).errors
        setErrForm(err_form)
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
  return (
    <div className='rounded-lg bg-white border border-gray-100 px-1'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex md:space-y-0 space-y-5 md:flex-row md:justify-around flex-col lg:px-10 md:px-5 lg:py-5 md:py-3 p-3'
      >
        <div className='md:basis-7/12 lg:basis-7/12 xl:basis-6/12 grid grid-cols-2 content-around gap-y-3'>
          <div className='text-center col-span-2 col-start-1 font-semibold text-2xl pb-3'>Thông tin cá nhân</div>
          <label className='self-center' htmlFor='username'>
            Tên đăng nhập
          </label>
          <div className='relative'>
            <span className='absolute top-0 -translate-y-1/2 left-2 px-1 bg-white lg:text-sm text-xs text-red-500'>
              {name?.message}
              {errForm.name}
            </span>
            <input
              className={classNames(
                'w-full hover:ring-1 ring-[#2579F2] focus:ring-1 outline-none border border-gray-300 rounded-md lg:px-3 md:px-3 px-2 py-1 lg:py-2',
                {
                  'border border-red-500 ring-transparent': name || errForm.name
                }
              )}
              type='text'
              id='username'
              {...register('name')}
            />
          </div>
          <label className='self-center' htmlFor='email'>
            Email
          </label>
          <div className='relative'>
            <span className='absolute top-0 -translate-y-1/2 left-2 px-1 bg-white lg:text-sm text-xs text-red-500'>
              {email?.message}
              {errForm.email}
            </span>
            <input
              className={classNames(
                'w-full hover:ring-1 ring-[#2579F2] focus:ring-1 outline-none border border-gray-300 rounded-md lg:px-3 md:px-3 px-2 py-1 lg:py-2',
                {
                  'border border-red-500 ring-transparent': email || errForm.email
                }
              )}
              type='text'
              id='email'
              {...register('email')}
            />
          </div>
          <div className='col-start-2 text-right py-2'>
            <button
              type='submit'
              className='ring-[1px] ring-gray-300 hover:ring-[#2579F2] rounded-md px-5 py-1 text-[#2579F2] font-semibold'
            >
              Lưu thay đổi
            </button>
          </div>
        </div>
        <div className='md:basis-4/12 lg:basis-4/12 xl:basis-3/12 flex flex-col items-center space-y-4'>
          <img
            className='bg-cover rounded-full lg:w-[150px] lg:h-[150px] w-[120px] h-[120px] object-cover'
            src={
              file
                ? URL.createObjectURL(file)
                : user?.avatar
                ? user.avatar
                : 'https://cdn.divineshop.vn/image/catalog/icon/avatar-khach-hang-2-52544.png?hash=1649933269'
            }
            alt='avatar'
          />
          <div>
            <button
              type='button'
              onClick={() => ref.current?.click()}
              className='px-3 py-1 rounded-md bg-[#2579F2] text-white hover:bg-[#2579F2]/90 ring-2 ring-[#2579F2]/90 hover:ring-[#2579F2] lg:scale-100 md:scale-90'
            >
              Thay đổi ảnh đại điện
            </button>
          </div>
        </div>
      </form>
      <input type='file' onChange={onFileChange} className='invisible absolute bottom-0' ref={ref} accept='image/*' />
    </div>
  )
}

export default Profile
