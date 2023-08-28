import * as yup from 'yup'

export const profile_schema = yup
  .object({
    name: yup.string().trim().required('là bắt buộc').min(1, 'tối thiểu 1 kí tự').max(50, 'tối thiểu 50 kí tự'),
    email: yup
      .string()
      .trim()
      .required('là bắt buộc')
      .min(8, 'tối thiểu 8 kí tự')
      .max(50, 'tối đa 50 kí tự')
      .email('không đúng định dạng')
  })
  .required()

export type ProfileSchemaType = yup.InferType<typeof profile_schema>
