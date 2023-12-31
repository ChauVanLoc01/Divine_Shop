import PortalForm from './PortalForm'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/store'
import { setIsOpen } from 'src/utils/slices/user.slice'

type FormProps = {
  isLogin: boolean
  content: React.ReactNode | string
  buttonClass?: string
}

function Form({ content, buttonClass, isLogin }: FormProps) {
  const dispatch = useDispatch<AppDispatch>()
  const isOpen = useSelector((state: RootState) => state.UserSliceName.isOpen)
  return (
    <>
      <button className={buttonClass} onClick={() => dispatch(setIsOpen(!isOpen))}>
        {content}
      </button>
      {isOpen && <PortalForm isLogin={isLogin} />}
    </>
  )
}

export default Form
