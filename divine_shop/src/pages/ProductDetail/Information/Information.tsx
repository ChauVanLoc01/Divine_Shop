function Information() {
  return (
    <div className='py-2 space-y-4 md:space-y-5'>
      <div className='rounded-lg border-2 border-zinc-600 p-3 space-y-2 bg-[#E2E2E2]'>
        <div className='font-bold'>Lưu ý:</div>
        <div>Bạn sẽ nhận được tài khoản và mật khẩu sau khi thanh toán</div>
        <div>Vui lòng không thay đổi thông tin tài khoản</div>
      </div>
      <div className='flex md:flex-row flex-col md:gap-x-5'>
        <div className='md:text-2xl text-xl font-bold basis-1/4'>Chi tiết sản phẩm</div>
        <div className='basis-3/4 py-2'>
          Lynda (LinkedIn Learning) là trang web tổ chức các khóa học trực tuyến hàng đầu tại Mỹ. Lynda cung cấp rất
          nhiều khóa học chất lượng được giảng dậy bởi các chuyên gia từ rất nhiều ngành nghề. Với thư viện khóa học cực
          lớn, số lượng Video hướng dẫn được cập nhật thường xuyên mỗi ngày, và đặc biệt chất lượng các khóa học online
          ở Lynda luôn được đánh giá cao trên thế giới. Lợi ích khi sử dụng tài khoản Lynda Không giới hạn khóa học, học
          đến khi nào ngất thì thôi. Xem video khóa học trên nhiều thiết bị: Máy tính, máy tính bảng, điện thoại, TV...
          Thực hành khi học lý thuyết. Gần như tất cả khóa học trên Lynda đều kèm Transcript (sub khác nha). Transcript
          cho phép bạn copy tất cả nội dung text trong video. Có thể download khóa học về để xem offline.
        </div>
      </div>
      <div className='flex md:flex-row flex-col md:gap-x-5'>
        <div className='md:text-2xl text-xl font-bold basis-1/4'>Chính sách bảo hành</div>
        <div className='basis-3/4 py-2 space-y-3'>
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
