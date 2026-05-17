import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import authApi from "../api/authApi";
import userApi from "../api/userApi";
import { loginSuccess } from "../redux/slices/authSlice";
import GoogleLoginButton from "../components/GoogleLoginButton";
import { isAdminRole } from "../utils/auth";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [submitting, setSubmitting] = useState(false);

  const completeLogin = async (redirectTo) => {
    const userProfile = await userApi.getMe();
    dispatch(loginSuccess({ user: userProfile }));
    const isAdmin = isAdminRole(userProfile?.role);
    let nextPath = redirectTo || (isAdmin ? "/admin/dashboard" : "/");

    if (typeof nextPath !== "string" || !nextPath.startsWith("/")) {
      nextPath = isAdmin ? "/admin/dashboard" : "/";
    }

    nextPath = isAdmin ? "/admin/dashboard" : nextPath.startsWith("/admin") ? "/" : nextPath;

    navigate(nextPath, { replace: true });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (submitting) return;

    setSubmitting(true);
    try {
      try {
        await authApi.login({
          email: formData.email.trim(),
          password: formData.password,
        });
      } catch (error) {
        toast.error(
          `${error.customMessage || "Đăng nhập thất bại."}${error.customErrorCode ? ` [${error.customErrorCode}]` : ""}`,
          { toastId: "login-error" }
        );
        return;
      }

      const requestedPath = location.state?.from;
      await completeLogin(requestedPath);
    } catch (error) {
      toast.error(
        `${error.customMessage || "Không thể tải thông tin tài khoản."}${error.customErrorCode ? ` [${error.customErrorCode}]` : ""}`,
        { toastId: "login-profile-error" }
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="page-section">
      <div className="mx-auto grid max-w-5xl overflow-hidden rounded-[2rem] bg-white shadow-[0_30px_80px_rgba(15,23,42,0.08)] lg:grid-cols-[0.95fr_1.05fr]">
        <div className="bg-[linear-gradient(150deg,_#052e16,_#065f46_55%,_#d1fae5)] p-8 text-white sm:p-12">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-100">Đăng nhập</p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight">
            Truy cập tài khoản để mua cây, theo dõi đơn và thanh toán nhanh hơn.
          </h1>
          <Link
            to="/register"
            className="mt-8 inline-flex rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-emerald-800 transition hover:bg-emerald-50"
          >
            Chưa có tài khoản? Đăng ký
          </Link>
        </div>

        <div className="p-8 sm:p-12">
          <h2 className="text-3xl font-semibold text-slate-900">Đăng nhập tài khoản</h2>
          <p className="mt-3 text-sm leading-6 text-slate-500">
            Sử dụng email và mật khẩu để đăng nhập và tiếp tục mua sắm.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label className="field-label" htmlFor="login-email">
                Email
              </label>
              <input
                id="login-email"
                type="email"
                className="field-input"
                value={formData.email}
                onChange={(event) => setFormData((previous) => ({ ...previous, email: event.target.value }))}
                required
              />
            </div>

            <div>
              <label className="field-label" htmlFor="login-password">
                Mật khẩu
              </label>
              <input
                id="login-password"
                type="password"
                className="field-input"
                value={formData.password}
                onChange={(event) => setFormData((previous) => ({ ...previous, password: event.target.value }))}
                required
              />
            </div>

            <div className="flex items-center justify-between gap-4 text-sm">
              <Link to="/forgot-password" className="font-medium text-emerald-700 transition hover:text-emerald-800">
                Quên mật khẩu?
              </Link>
            </div>

            <button type="submit" disabled={submitting} className="primary-button w-full">
              {submitting ? "Đang đăng nhập..." : "Đăng nhập"}
            </button>
          </form>

          <div className="mt-6">
            <div className="mb-4 flex items-center gap-3 text-xs uppercase tracking-[0.24em] text-slate-400">
              <span className="h-px flex-1 bg-slate-200"></span>
              <span>hoặc</span>
              <span className="h-px flex-1 bg-slate-200"></span>
            </div>
            <GoogleLoginButton disabled={submitting} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
