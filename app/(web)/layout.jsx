import React, { use } from "react";
import Navbar from "../_components/common/Navbar";
import Footer from "../_components/common/Footer";
import { CartProvider } from "../_context/cartContext";
import { BrandProvider } from "../_context/brandContext";
import { BASE_URL } from "../_constants/constants";

const layout = ({ children }) => {
  const res = use(fetch(`${BASE_URL}/api/brand/`));
  const siteData = use(res.json());

  return (
    <BrandProvider value={siteData}>
      <CartProvider>
        <Navbar />
        {children}
        <Footer />
      </CartProvider>
    </BrandProvider>
  );
};

export default layout;
