import * as yup from 'yup'

export const change_password_schema = yup
  .object({
    current_password: yup
      .string()
      .trim()
      .required('mật khẩu hiện tại là bắt buộc')
      .min(8, 'tối thiểu 8 kí tự')
      .max(50, 'tối đa 50 kí tự')
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, {
        message: 'gồm số, chữ in hoa, in thường'
      }),
    new_password: yup
      .string()
      .trim()
      .required('mật khẩu mới là bắt buộc')
      .min(8, 'tối thiểu 8 kí tự')
      .max(50, 'tối đa 50 kí tự')
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, {
        message: 'gồm số, chữ in hoa, in thường'
      }),
    confirm_new_password: yup
      .string()
      .trim()
      .required('nhập lại mật khẩu là bắt buộc')
      .oneOf([yup.ref('new_password')], 'không đúng')
  })
  .required()

export type ChangePasswordSchemaType = yup.InferType<typeof change_password_schema>
