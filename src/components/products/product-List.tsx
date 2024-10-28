"use client";
import { useEffect, useState } from "react";
import { getProductList } from "@/api/product/apis";
import ProductCard from "@/components/products/productCard";
import { isNull, isUndefined } from "@/utils/type-guard";
import ExchangeBadge from "./exchage-badge";

const ProductList = () => {
  const [products, setProducts] = useState<productProps[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProductList();

        const mappedProducts = data.results.map((item: productProps) => ({
          id: item.id,
          image: item.image,
          title: item.title,
          price: item.price,
          presentPrice: item.presentPrice,
          discountRate: item.discountRate,
        }));

        setProducts(mappedProducts);
      } catch (error: unknown) {
        console.error("에러:", error);
        setError("상품을 불러오는 중 오류가 발생했습니다.");
      }
    };
    fetchProducts();
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <div className="flex justify-center items-center">
        <div className="text-xl font-bold w-[375px] h-[62px] text-center">
          상품 리스트
        </div>
      </div>
      <ExchangeBadge />
      {products.length > 0 ? (
        products.map((product) => <ProductCard key={product.id} {...product} />)
      ) : (
        <p>상품이 없습니다.</p>
      )}
    </>
  );
};

export default ProductList;