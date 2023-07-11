function Information() {
  return (
    <div className='py-2 space-y-4 md:space-y-5'>
      <div className='rounded-lg border-2 border-zinc-600 p-3 space-y-2 bg-[#E2E2E2]'>
        <div className='font-bold'>Lưu ý:</div>
        <div>Bạn sẽ nhận được tài khoản và mật khẩu sau khi thanh toán</div>
        <div>Vui lòng không thay đổi thông tin tài khoản</div>
      </div>
      <div className='flex md:flex-row flex-col md:gap-x-5'>
        <div className='md:text-2xl text-xl font-bold basis-1/3'>Chính sách bảo hành</div>
        <div className='basis-2/3 py-2 space-y-3'>
          <div className='space-y-2'>
            <span className='font-bold'>Thời gian bảo hành</span>
            <div className='px-10'>- 1 năm</div>
          </div>
          <div className='space-y-2'>
            <span className='font-bold'>Cách thức bảo hành</span>
            <div className='px-10'>- Đổi đổi sản phẩm mới tương đương hoặc hoàn tiền theo thời gian chưa sử dụng.</div>
            <div className='px-10'>- Trong trường hợp hết hàng để đổi mới, hoàn tiền theo quy tắc:</div>
            <div className='px-14'> • Dưới 30 ngày: Hoàn 100% giá trị đơn hàng</div>
            <div className='px-14'>
              • Sau 30 ngày: Hoàn tiền theo theo thời gian chưa sử dụng (VD gói vĩnh viễn nếu sử dụng được 6 tháng phát
              sinh lỗi thì sẽ được hoàn lại 50% giá trị đơn hàng)
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Information
