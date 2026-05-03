import React from "react";
import ProductListingPage from "../components/ProductListingPage";

const Plants = () => {
  return (
    <ProductListingPage
      categoryId={1}
      badgeLabel="Cây cảnh"
      title="Danh mục cây cảnh"
      subtitle="Các dòng cây cảnh được gom theo cùng cấu trúc hiển thị để người dùng lọc nhanh và theo dõi tồn kho dễ hơn."
    />
  );
};

export default Plants;
