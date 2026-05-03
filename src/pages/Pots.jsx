import React from "react";
import ProductListingPage from "../components/ProductListingPage";

const Pots = () => {
  return (
    <ProductListingPage
      categoryId={2}
      badgeLabel="Chậu cây"
      title="Danh mục chậu cây"
      subtitle="Các mẫu chậu được sắp theo bố cục đồng nhất để việc duyệt sản phẩm và so sánh giá trực quan hơn."
    />
  );
};

export default Pots;
