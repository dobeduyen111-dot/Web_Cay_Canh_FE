import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import userApi from "../api/userApi";

const PASSWORD_PATTERN = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{6,72}$/;

const initialState = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

const ChangePassword = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState(initialState);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isAuthenticated) {
      toast.error("Bạn cần đăng nhập trước khi đổi mật khẩu.");
      navigate("/login");
      return;
    }

    if (formData.newPassword.length < 6) {
      toast.error("Mật khẩu mới phải có ít nhất 6 ký tự.");
      return;
    }

    if (!PASSWORD_PATTERN.test(formData.newPassword)) {
      toast.error("Mật khẩu mới phải dài 6-72 ký tự, có ít nhất 1 chữ cái, 1 chữ số và chỉ dùng ký tự hợp lệ.");
      return;
    }

    if (formData.currentPassword === formData.newPassword) {
      toast.error("Mật khẩu mới không được trùng với mật khẩu hiện tại.");
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("Mật khẩu xác nhận không khớp.");
      return;
    }

    setSubmitting(true);
    try {
      await userApi.changeMyPassword({
        oldPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      });

      toast.success("Đổi mật khẩu thành công.");
      setFormData(initialState);
      navigate("/profile");
    } catch (error) {
      toast.error(`${error.customMessage || "Đổi mật khẩu thất bại."}${error.customErrorCode ? ` [${error.customErrorCode}]` : ""}`);
    } finally {
      setSubmitting(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <section className="page-section">
        <div className="glass-card p-8 text-center sm:p-12">
          <p className="text-sm uppercase tracking-[0.28em] text-emerald-700">Bảo mật tài khoản</p>
          <h1 className="mt-3 text-3xl font-semibold text-slate-900">Bạn cần đăng nhập để đổi mật khẩu.</h1>
          <p className="mt-4 text-slate-600">API `PUT /api/user/me/password` chỉ hoạt động khi backend xác thực được phiên đăng nhập hiện tại.</p>
          <button type="button" onClick={() => navigate("/login")} className="primary-button mt-8">
            Đi tới đăng nhập
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="page-section">
      <div className="mx-auto grid max-w-5xl overflow-hidden rounded-[2rem] bg-white shadow-[0_30px_80px_rgba(15,23,42,0.08)] lg:grid-cols-[0.95fr_1.05fr]">
        <div className="bg-[linear-gradient(150deg,_#052e16,_#065f46_55%,_#d1fae5)] p-8 text-white sm:p-12">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-100">Bảo mật tài khoản</p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight">Đổi mật khẩu để bảo vệ tài khoản mua hàng của bạn tốt hơn.</h1>
          
        </div>

        <div className="p-8 sm:p-12">
          <h2 className="text-3xl font-semibold text-slate-900">Đổi mật khẩu</h2>
          <p className="mt-3 text-sm leading-6 text-slate-500">Nhập chính xác mật khẩu hiện tại và mật khẩu mới </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label className="field-label" htmlFor="current-password">Mật khẩu hiện tại</label>
              <input
                id="current-password"
                type="password"
                className="field-input"
                value={formData.currentPassword}
                onChange={(event) => setFormData((previous) => ({ ...previous, currentPassword: event.target.value }))}
                required
              />
            </div>

            <div>
              <label className="field-label" htmlFor="new-password">Mật khẩu mới</label>
              <input
                id="new-password"
                type="password"
                className="field-input"
                value={formData.newPassword}
                onChange={(event) => setFormData((previous) => ({ ...previous, newPassword: event.target.value }))}
                required
              />
            </div>

            <div>
              <label className="field-label" htmlFor="confirm-password">Xác nhận mật khẩu mới</label>
              <input
                id="confirm-password"
                type="password"
                className="field-input"
                value={formData.confirmPassword}
                onChange={(event) => setFormData((previous) => ({ ...previous, confirmPassword: event.target.value }))}
                required
              />
            </div>

            <button type="submit" disabled={submitting} className="primary-button w-full">
              {submitting ? "Đang cập nhật..." : "Cập nhật mật khẩu"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ChangePassword;
