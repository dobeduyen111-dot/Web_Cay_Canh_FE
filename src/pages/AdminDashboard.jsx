import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AdminLayout from "../components/AdminLayout";
import adminApi from "../api/adminApi";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    totalCustomers: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await adminApi.getDashboard();
        setStats({
          totalOrders: response.totalOrders || 0,
          totalRevenue: response.totalRevenue || 0,
          totalCustomers: response.totalCustomers || 0,
        });
      } catch (error) {
        toast.error(error.customMessage || "Không tai duoc thong ke");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  return (
    <AdminLayout title="Dashboard" subtitle="Tổng hop so lieu kinh doanh">
      {loading ? (
        <div className="adm-loading">Đang tải du lieu thong ke...</div>
      ) : (
        <>
          <section className="adm-kpi-grid">
            <article className="adm-kpi-card">
              <span className="adm-kpi-label">Tổng don hang</span>
              <h3>{stats.totalOrders.toLocaleString("vi-VN")}</h3>
              <p>Cập nhật realtime tu API /admin/dashboard</p>
            </article>
            <article className="adm-kpi-card">
              <span className="adm-kpi-label">Tổng doanh thu</span>
              <h3>{stats.totalRevenue.toLocaleString("vi-VN")} VND</h3>
              <p>Doanh thu luy ke cua toan bo don da ghi nhan</p>
            </article>
            <article className="adm-kpi-card">
              <span className="adm-kpi-label">Tổng khách hàng</span>
              <h3>{stats.totalCustomers.toLocaleString("vi-VN")}</h3>
              <p>So luong tai khoan da dang ky tren he thong</p>
            </article>
          </section>

          <section className="adm-panel">
            <h3>Goi y van hanh hom nay</h3>
            <div className="adm-insight-list">
              <div>
                <strong>Uu tien don moi</strong>
                <p>Kiem tra don co trang thai PENDING de tranh tre SLA giao hang.</p>
              </div>
              <div>
                <strong>Quản lý ton kho</strong>
                <p>Sản phẩm sap het hang nen cap nhat stock va ngung quang cao.</p>
              </div>
              <div>
                <strong>Cham soc khách hàng</strong>
                <p>Ra soat nhom user moi dang ky de gui uu dai lan dau mua hang.</p>
              </div>
            </div>
          </section>
        </>
      )}
    </AdminLayout>
  );
};

export default AdminDashboard;