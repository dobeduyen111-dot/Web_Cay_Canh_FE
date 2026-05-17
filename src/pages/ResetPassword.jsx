import React from "react";
import { Link } from "react-router-dom";

const ResetPassword = () => {
  return (
    <section className="page-section">
      <div className="mx-auto grid max-w-5xl overflow-hidden rounded-[2rem] bg-white shadow-[0_30px_80px_rgba(15,23,42,0.08)] lg:grid-cols-[0.95fr_1.05fr]">
        <div className="bg-[linear-gradient(150deg,_#052e16,_#065f46_55%,_#d1fae5)] p-8 text-white sm:p-12">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-100">Luồng đã đổi</p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight">Trang reset-password cũ không còn được sử dụng.</h1>
          <p className="mt-5 max-w-md text-base leading-7 text-emerald-50/90">
            Quy trình khôi phục mật khẩu đã chuyển sang xác thực OTP ngay trên trang quên mật khẩu.
          </p>
          <Link to="/forgot-password" className="mt-8 inline-flex rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-emerald-800 transition hover:bg-emerald-50">
            Mở trang quên mật khẩu
          </Link>
        </div>

        <div className="flex items-center p-8 sm:p-12">
          <div>
            <h2 className="text-3xl font-semibold text-slate-900">Luồng cũ đã được loại bỏ</h2>
            <p className="mt-3 text-sm leading-6 text-slate-500">
              Giao diện nhập reset token từ query string đã bị bỏ để tránh người dùng đi sai luồng backend mới.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;
