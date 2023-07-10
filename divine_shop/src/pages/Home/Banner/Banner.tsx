import classNames from 'classnames'
import { ReactNode } from 'react'

type BannnerType = {
  title: string | ReactNode
  img?: string
  desc?: string
  content: ReactNode
  hasButton: boolean
}

function Banner({ title, img, desc, content, hasButton }: BannnerType) {
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
        <div className='xl:max-w-7xl xl:mx-auto xl:px-0 px-2 md:px-4 md:text-base text-sm'>
          <div className='flex justify-between'>
            {title_node}
            <div className='w-1/3 text-right'>
              {hasButton && (
                <button className='bg-[#2579F2] text-white px-3 py-1 rounded-md hover:scale-[1.03] transition-all duration-100'>
                  Khám phá
                </button>
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
