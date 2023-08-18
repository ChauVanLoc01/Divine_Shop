import { useEffect, useState } from 'react'
import PortalForm from './PortalForm'

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
      {isOpen && <PortalForm isLogin={isLogin} setIsOpen={setIsOpen} />}
    </>
  )
}

export default Form
