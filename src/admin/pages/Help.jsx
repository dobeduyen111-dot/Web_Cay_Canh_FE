import React from 'react';

const Help = () => {
  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in duration-700">
      <div>
        <h1 className="text-2xl md:text-3xl font-black text-text tracking-tight">Trợ giúp</h1>
        <p className="text-text-muted text-xs md:text-sm font-medium mt-1">Câu hỏi thường gặp về cách sử dụng website và thông tin liên hệ hỗ trợ.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        <div className="lg:col-span-2 bg-surface p-6 md:p-8 rounded-[2rem] border border-border shadow-sm">
          <h3 className="text-lg md:text-xl font-black text-text mb-6">FAQ nhanh</h3>
          <div className="space-y-4 text-sm">
            <div>
              <p className="font-black text-text">Làm sao để tìm sản phẩm nhanh hơn?</p>
              <p className="mt-1 font-bold text-text-muted">
                Bạn có thể dùng thanh tìm kiếm ở đầu trang hoặc vào từng danh mục như Cây cảnh, Chậu cây, Phụ kiện để lọc sản phẩm phù hợp.
              </p>
            </div>
            <div>
              <p className="font-black text-text">Làm sao để xem lại đơn hàng đã đặt?</p>
              <p className="mt-1 font-bold text-text-muted">
                Sau khi đăng nhập, vào mục <span className="text-text font-black">Đơn hàng</span> để xem lịch sử mua hàng, trạng thái xử lý và chi tiết từng đơn.
              </p>
            </div>
            <div>
              <p className="font-black text-text">Làm sao để lưu sản phẩm yêu thích?</p>
              <p className="mt-1 font-bold text-text-muted">
                Tại trang chi tiết sản phẩm, bấm vào biểu tượng tim để thêm vào danh sách yêu thích. Bạn có thể mở mục <span className="text-text font-black">Yêu thích</span> để xem lại sau.
              </p>
            </div>
            <div>
              <p className="font-black text-text">Làm sao để thêm sản phẩm vào giỏ hàng và thanh toán?</p>
              <p className="mt-1 font-bold text-text-muted">
                Chọn sản phẩm cần mua, bấm <span className="text-text font-black">Thêm vào giỏ hàng</span>, sau đó vào giỏ hàng để kiểm tra và tiếp tục sang bước thanh toán.
              </p>
            </div>
            <div>
              <p className="font-black text-text">Nếu quên mật khẩu thì phải làm gì?</p>
              <p className="mt-1 font-bold text-text-muted">
                Tại màn hình đăng nhập, chọn <span className="text-text font-black">Quên mật khẩu</span> và làm theo hướng dẫn để đặt lại mật khẩu tài khoản.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-surface p-6 md:p-8 rounded-[2rem] border border-border shadow-sm">
          <h3 className="text-lg md:text-xl font-black text-text mb-6">Liên hệ</h3>
          <div className="space-y-3 text-sm font-bold text-text-muted">
            <p>Số điện thoại: 0838 369 639</p>
            <p>Hotline: 09 6688 9393</p>
            <p>Gmail: caycanhmnm@gmail.com</p>
            <p className="text-[10px] uppercase tracking-wider">Hỗ trợ</p>
            <p>Liên hệ khi dùng trang web có vấn đề cần hỗ trợ giải quyết.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
