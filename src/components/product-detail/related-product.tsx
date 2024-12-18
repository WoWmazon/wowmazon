"use client";

import { isNull, isUndefined } from "@/utils/type-guard";
import RelatedProductCard from "./related-product-card";
import { useRelatedProduct } from "@/hooks/useProductDetail";
import RelatedProductCardSkeleton from "../skeletons/related-product-card-skeleton";

const RelatedProduct = ({
  productId,
  exchangeRate,
}: {
  productId: string;
  exchangeRate: GetExchangeRateResponse;
}) => {
  const { data: relatedProducts, isLoading } = useRelatedProduct(productId);

  if (isNull(relatedProducts) || isUndefined(relatedProducts)) {
    return null;
  }

  const validData = relatedProducts.filter(
    (product) => product.presentPrice !== null
  );

  if (validData.length === 0) return null;

  return (
    <div className="bg-SYSTEM-white">
      <div className="px-4 py-[30px]">
        <p className="font-bold mb-3">해당 상품과 비슷한 상품</p>
        <div className="w-full flex gap-3 overflow-x-auto">
          {validData.map((item) => {
            return isLoading ? (
              <RelatedProductCardSkeleton />
            ) : (
              exchangeRate && (
                <RelatedProductCard
                  key={item.id}
                  relatedProduct={item}
                  exchangeRate={exchangeRate}
                />
              )
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RelatedProduct;
