import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import authApi from "../api/authApi";
import { logoutSuccess } from "../redux/slices/authSlice";
import "../assets/css/admin/admin_style.css";

const navItems = [
  { path: "/admin/dashboard", label: "Tổng quan", icon: "▦" },
  { path: "/admin/product", label: "Sản phẩm", icon: "◫" },
  { path: "/admin/orders", label: "Đơn hàng", icon: "◎" },
  { path: "/admin/users", label: "Người dùng", icon: "◉" },
];

const AdminLayout = ({ children, title = "Quản trị hệ thống", subtitle = "" }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = async () => {
    try {
      await authApi.logout();
    } catch (error) {
      // Vẫn cho phép logout local state ngay cả khi backend lỗi.
    } finally {
      dispatch(logoutSuccess());
      toast.success("Đã đăng xuất khỏi trang quản trị.");
      navigate("/login", { replace: true });
    }
  };

  return (
    <div className="adm-layout">
      <aside className="adm-sidebar">
        <div className="adm-brand">
          <div className="adm-brand-logo">PC</div>
          <div>
            <strong>Cây Cảnh</strong>
            <p>Admin Workspace</p>
          </div>
        </div>
        <nav className="adm-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => (isActive ? "adm-nav-link active" : "adm-nav-link")}
            >
              <span className="adm-nav-icon">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="adm-sidebar-footer">
          <span>Hệ thống quản trị đã kết nối API</span>
        </div>
      </aside>

      <div className="adm-main">
        <header className="adm-topbar">
          <div>
            <h1>{title}</h1>
            {subtitle ? <p>{subtitle}</p> : null}
          </div>
          <div className="adm-topbar-right">
            <div className="adm-profile">
              <span className="adm-user-chip">{(user?.fullName || user?.email || "Admin").slice(0, 1).toUpperCase()}</span>
              <div>
                <strong>{user?.fullName || user?.email || "Admin"}</strong>
                <p>{user?.role || "ADMIN"}</p>
              </div>
            </div>
            <button type="button" onClick={handleLogout} className="adm-btn adm-btn-danger">
              Đăng xuất
            </button>
          </div>
        </header>
        <main className="adm-content">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
