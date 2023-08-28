import classNames from 'classnames'
import { ReactNode } from 'react'
import { To } from 'react-router-dom'
import LinkToTop from 'src/Components/LinkToTop'

type BannnerType = {
  title: string | ReactNode
  img?: string
  desc?: string
  content: ReactNode
  hasButton: boolean
  to?: To
}

function Banner({ title, img, desc, content, hasButton, to }: BannnerType) {
  const title_node =
    typeof title === 'string' ? <div className='text-2xl font-semibold w-2/3 line-clamp-2'>{title}</div> : title
  const img_url = `bg-[url("${img}")]`
  return (
    <div>
      <div
        className={` ${img_url} ${classNames({
          'pt-3 pb-6': !img,
          'lg:pt-28 md:pt-20 pt-14 pb-6 bg-cover': img
        })}`}
      >
        <div className='xl:max-w-5xl xl:mx-auto xl:px-0 px-2 md:px-4 md:text-base text-sm'>
          <div className='flex justify-between'>
            {title_node}
            <div className='w-1/3 text-right'>
              {hasButton && (
                <LinkToTop
                  to={to as To}
                  className='bg-[#2579F2] text-white px-3 py-1 rounded-md hover:scale-[1.03] transition-all duration-100'
                >
                  Khám phá
                </LinkToTop>
              )}
            </div>
          </div>
          <div className='w-3/4'>{desc}</div>
        </div>
      </div>
      {content}
    </div>
  )
}

export default Banner
