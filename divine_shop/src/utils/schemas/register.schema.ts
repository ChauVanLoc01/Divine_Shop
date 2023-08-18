import * as yup from 'yup'

export const register_schema = yup
  .object({
    email: yup
      .string()
      .trim()
      .required('là bắt buộc')
      .min(8, 'tối thiểu 8 kí tự')
      .max(50, 'tối đa 50 kí tự')
      .email('không đúng định dạng'),
    password: yup
      .string()
      .trim()
      .required('là bắt buộc')
      .min(8, 'tối thiểu 8 kí tự')
      .max(50, 'tối đa 50 kí tự')
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, {
        message: 'bao gồm cả số, chữ in hoa, in thường'
      }),
    confirm_password: yup
      .string()
      .trim()
      .required('là bắt buộc')
      .oneOf([yup.ref('password')], 'không đúng')
  })
  .required()

export type RegisterSchemaType = yup.InferType<typeof register_schema>
