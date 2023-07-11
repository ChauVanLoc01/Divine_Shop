import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'

const people = [
  { name: 'Wade Cooper' },
  { name: 'Arlene Mccoy' },
  { name: 'Devon Webb' },
  { name: 'Tom Cook' },
  { name: 'Tanya Fox' },
  { name: 'Hellen Schmidt' }
]

type ListBoxProps = {
  title: string
}

function ListBox({ title }: ListBoxProps) {
  const [selected, setSelected] = useState(people[0])

  return (
    <Listbox value={selected} onChange={setSelected}>
      <div className='relative border-[1px] border-gray-300 rounded-md'>
        <Listbox.Button className='relative w-full cursor-pointer text-left pt-4 pl-5 rounded-md bg-white focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 z-10'>
          <span className='absolute top-0 left-5 text-sm text-gray-400'>{title}</span>
          <span className='truncate'>{selected.name}</span>
          <span className='pointer-events-none absolute top-1/2 -translate-y-1/2 right-4 flex'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-5 h-5'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9'
              />
            </svg>
          </span>
        </Listbox.Button>
        <Transition as={Fragment} leave='transition ease-in duration-100' leaveFrom='opacity-100' leaveTo='opacity-0'>
          <Listbox.Options className='w-full absolute max-h-60 rounded-md mt-1 bg-white shadow-md ring-1 ring-black ring-opacity-5 focus:outline-none z-50 overflow-hidden'>
            {people.map((person, personIdx) => (
              <Listbox.Option
                key={personIdx}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-4 ${
                    active ? 'bg-[#2579F2]/90 text-white' : 'text-gray-900'
                  }`
                }
                value={person}
              >
                {({ selected }) => (
                  <>
                    <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>{person.name}</span>
                    {selected ? (
                      <span className='absolute top-1/2 right-4 -translate-y-1/2 text-white'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 24 24'
                          strokeWidth={1.5}
                          stroke='currentColor'
                          className='w-5 h-5 stroke-2'
                        >
                          <path strokeLinecap='round' strokeLinejoin='round' d='M4.5 12.75l6 6 9-13.5' />
                        </svg>
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  )
}

export default ListBox
