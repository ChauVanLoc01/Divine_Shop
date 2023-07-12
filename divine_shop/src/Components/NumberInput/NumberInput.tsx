function NumberInput() {
  return (
    <div className='w-fit h-fit overflow-hidden border border-gray-300 rounded-sm divide-x divide-gray-300 flex'>
      <button className='py-1 px-3 font-medium hover:bg-gray-100'>-</button>
      <input className='outline-none w-10 text-center text-[#2579F2]' type='text' name='' value={1} />
      <button className='py-1 px-3 font-medium hover:bg-gray-100'>+</button>
    </div>
  )
}

export default NumberInput
