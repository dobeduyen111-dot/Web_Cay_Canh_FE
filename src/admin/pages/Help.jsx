import React from "react";

const sections = [
  {
    title: "Tổng quan",
    description: "Trang quản trị Cây Cảnh giúp theo dõi hoạt động bán hàng, cập nhật dữ liệu và xử lý các tình huống phát sinh hằng ngày.",
    points: [
      "Bắt đầu từ bảng điều khiển để xem nhanh doanh thu, số đơn hàng, khách hàng và sản phẩm.",
      "Sử dụng thanh điều hướng bên trái để chuyển nhanh giữa các nhóm nghiệp vụ.",
      "Khi cần kiểm tra tài khoản hoặc tùy chọn cá nhân, mở mục Cài đặt ở góc phải trên cùng.",
    ],
  },
  {
    title: "Sản phẩm",
    description: "Danh mục sản phẩm là nơi thêm mới, cập nhật giá bán, hình ảnh, mô tả và trạng thái hiển thị của cây cảnh, chậu và phụ kiện.",
    points: [
      "Kiểm tra kỹ tên sản phẩm, giá và số lượng tồn trước khi lưu thay đổi.",
      "Ưu tiên hình ảnh rõ nét, đúng tỉ lệ để hiển thị đẹp ở trang khách hàng.",
      "Tắt trạng thái hoạt động khi sản phẩm tạm ngừng kinh doanh nhưng vẫn muốn giữ lịch sử dữ liệu.",
    ],
  },
  {
    title: "Đơn hàng",
    description: "Mục đơn hàng hỗ trợ theo dõi toàn bộ vòng đời đơn từ lúc tiếp nhận đến khi giao thành công hoặc hủy đơn.",
    points: [
      "Cập nhật trạng thái theo đúng tiến trình: chờ xử lý, đang xử lý, đang giao, đã giao hoặc đã hủy.",
      "Đối chiếu thông tin người nhận, địa chỉ giao và tổng tiền trước khi chuyển trạng thái vận chuyển.",
      "Chỉ xóa đơn khi chắc chắn đó là dữ liệu lỗi hoặc đơn thử nghiệm nội bộ.",
    ],
  },
  {
    title: "Khách hàng",
    description: "Trang khách hàng dùng để tra cứu người mua, theo dõi mức chi tiêu và hỗ trợ xử lý các yêu cầu liên quan đến tài khoản.",
    points: [
      "Tìm kiếm theo tên hoặc email để hỗ trợ nhanh khi khách cần kiểm tra đơn hàng.",
      "Theo dõi tần suất mua để nhận diện nhóm khách hàng thân thiết.",
      "Không chỉnh sửa thông tin khi chưa xác minh đúng chủ tài khoản.",
    ],
  },
  {
    title: "Tồn kho",
    description: "Số lượng tồn kho ảnh hưởng trực tiếp đến trải nghiệm mua hàng và độ chính xác khi xử lý đơn.",
    points: [
      "Sau mỗi lần nhập hàng hoặc kiểm kho, cập nhật lại số lượng để tránh bán vượt tồn.",
      "Ưu tiên kiểm tra các sản phẩm bán chạy hoặc sắp hết hàng trong ngày.",
      "Nếu tồn kho về 0, cân nhắc ẩn sản phẩm hoặc đánh dấu tạm hết hàng để hạn chế phát sinh đơn lỗi.",
    ],
  },
  {
    title: "Đơn hủy",
    description: "Đơn hủy cần được theo dõi riêng để giảm thất thoát doanh thu và phát hiện sớm các vấn đề trong vận hành.",
    points: [
      "Xác nhận nguyên nhân hủy: hết hàng, khách đổi ý, sai thông tin giao hàng hoặc sự cố thanh toán.",
      "Không tiếp tục đẩy tiến độ xử lý sau khi đơn đã chuyển sang trạng thái đã hủy.",
      "Tổng hợp nguyên nhân hủy theo tuần để cải thiện quy trình bán hàng và chăm sóc khách.",
    ],
  },
  {
    title: "Mẹo sử dụng",
    description: "Một vài nguyên tắc nhỏ giúp thao tác nhanh hơn và giảm rủi ro sai sót khi nhiều người cùng vận hành hệ thống.",
    points: [
      "Làm mới dữ liệu bằng cách chuyển trang hoặc thao tác lại trong hệ thống, tránh mở quá nhiều tab quản trị cùng lúc.",
      "Kiểm tra lại thông báo thành công sau khi cập nhật để chắc chắn thay đổi đã được lưu.",
      "Đăng xuất sau khi hoàn tất công việc, đặc biệt trên máy dùng chung.",
    ],
  },
  {
    title: "Liên hệ hỗ trợ",
    description: "Khi gặp lỗi không tự xử lý được, hãy ghi lại đủ thông tin để bộ phận kỹ thuật kiểm tra nhanh hơn.",
    points: [
      "Chuẩn bị thời điểm xảy ra lỗi, thao tác vừa thực hiện và ảnh chụp màn hình nếu có.",
      "Gửi kèm mã đơn hàng hoặc tên sản phẩm liên quan để rút ngắn thời gian đối chiếu.",
      "Nếu lỗi ảnh hưởng việc bán hàng, ưu tiên báo ngay cho quản trị kỹ thuật hoặc người phụ trách hệ thống.",
    ],
  },
];

const quickTips = [
  "Ưu tiên cập nhật trạng thái đơn hàng theo đúng trình tự để khách theo dõi chính xác.",
  "Kiểm tra tồn kho trước các đợt khuyến mãi hoặc khi có nhiều đơn cùng lúc.",
  "Giữ nội dung sản phẩm rõ ràng, thống nhất và có hình ảnh chất lượng.",
];

const Help = () => {
  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in duration-700">
      <section className="overflow-hidden rounded-[2rem] border border-emerald-100 bg-[linear-gradient(135deg,#052e16_0%,#14532d_48%,#ecfdf5_140%)] px-6 py-7 text-white shadow-[0_24px_60px_rgba(5,46,22,0.18)] md:px-8 md:py-9">
        <div className="max-w-3xl">
          <p className="text-xs font-black uppercase tracking-[0.32em] text-emerald-100">Trung tâm hỗ trợ</p>
          <h1 className="mt-3 text-3xl font-black tracking-tight md:text-4xl">Hướng dẫn sử dụng trang quản trị Cây Cảnh</h1>
          <p className="mt-4 text-sm leading-7 text-emerald-50/90 md:text-base">
            Tài liệu này tổng hợp các thao tác cốt lõi để quản lý sản phẩm, đơn hàng, khách hàng và vận hành cửa hàng ổn định hơn.
          </p>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {quickTips.map((tip) => (
            <div key={tip} className="rounded-2xl border border-white/15 bg-white/10 px-4 py-4 backdrop-blur">
              <p className="text-sm font-bold leading-6 text-white">{tip}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 gap-5 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {sections.slice(0, 6).map((section) => (
            <article
              key={section.title}
              className="rounded-[2rem] border border-border bg-surface p-6 shadow-sm transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-md"
            >
              <h2 className="text-xl font-black tracking-tight text-text">{section.title}</h2>
              <p className="mt-3 text-sm leading-6 font-medium text-text-muted">{section.description}</p>
              <div className="mt-5 space-y-3">
                {section.points.map((point) => (
                  <div key={point} className="flex items-start gap-3">
                    <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-primary" />
                    <p className="text-sm leading-6 font-medium text-text">{point}</p>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>

        <div className="space-y-5">
          {sections.slice(6).map((section) => (
            <article
              key={section.title}
              className="rounded-[2rem] border border-border bg-surface p-6 shadow-sm"
            >
              <h2 className="text-xl font-black tracking-tight text-text">{section.title}</h2>
              <p className="mt-3 text-sm leading-6 font-medium text-text-muted">{section.description}</p>
              <div className="mt-5 space-y-3">
                {section.points.map((point) => (
                  <div key={point} className="rounded-2xl bg-slate-50 px-4 py-3">
                    <p className="text-sm leading-6 font-medium text-text">{point}</p>
                  </div>
                ))}
              </div>
            </article>
          ))}

          <article className="rounded-[2rem] border border-emerald-100 bg-emerald-50/70 p-6 shadow-sm">
            <p className="text-xs font-black uppercase tracking-[0.28em] text-emerald-700">Gợi ý vận hành</p>
            <h2 className="mt-3 text-xl font-black tracking-tight text-text">Quy trình xử lý đơn đề xuất</h2>
            <div className="mt-5 space-y-3 text-sm font-medium leading-6 text-text">
              <p>1. Xác nhận tồn kho và thông tin người nhận.</p>
              <p>2. Chuyển đơn sang trạng thái đang xử lý khi đã bắt đầu chuẩn bị hàng.</p>
              <p>3. Chuyển sang đang giao khi bàn giao cho đơn vị vận chuyển.</p>
              <p>4. Hoàn tất khi khách đã nhận hàng thành công; nếu phát sinh hủy, cập nhật ngay trạng thái đã hủy.</p>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
};

export default Help;
