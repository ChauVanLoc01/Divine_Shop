import { MouseEventHandler, ReactNode } from 'react'
import { Link, NavigateOptions, To, useNavigate } from 'react-router-dom'

interface Props {
  to: To
  children: ReactNode
  className?: string
  onClick?: Function
  options?: NavigateOptions
  onMouseEnter?: () => void
}

const LinkToTop = ({ children, to, className, options, onClick, onMouseEnter }: Props) => {
  const navigate = useNavigate()

  const navigateAndReset: MouseEventHandler<HTMLAnchorElement> = (event) => {
    event.preventDefault()
    navigate(to, options)
    window.scrollTo(0, 0)
    onClick && onClick()
  }

  return (
    <Link className={className} onMouseEnter={onMouseEnter} onClick={navigateAndReset} to={to}>
      {children}
    </Link>
  )
}

export default LinkToTop
