"use client";

import Image from "next/image";
import noImage from "@/assets/images/noImage.svg";
import Badge from "../common/badge";
import arrowDown from "@/assets/icons/badge_arrow_down.svg";
import CustomButton from "../common/custom-button";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
import { convertToKrw, getFormattedExchangeText } from "@/utils/exchange";

const ProductDetailContent = ({
  product,
  exchangeData,
}: {
  product: GetProductDetailResponse;
  exchangeData: GetExchangeResponse;
}) => {
  const {
    image,
    title,
    isLowestPriceEver,
    discountRate,
    price,
    presentPrice,
    crawlingUpdatedAt,
    presentPriceUpdatedAt,
    optionStatus,
  } = product;

  if (!product) return null;

  return (
    <div className="bg-SYSTEM-white">
      {image ? (
        <Image src={image} alt="product-image" width={375} height={295} />
      ) : (
        <div className="bg-ELSE-EC h-[295px] w-[375px] content-center justify-items-center">
          <Image src={noImage} alt="no-image" />
        </div>
      )}
      <div className="p-4 border border-ELSE-EC">
        <p className="mb-2.5">{title}</p>
        <div className="flex gap-1.5 mb-1">
          {isLowestPriceEver && (
            <Badge
              text="역대최저가"
              height="h-[18px]"
              hasIcon={false}
              backgroundColor="bg-ELSE-F0"
              textColor="text-ELSE-C1"
              textSize="text-sm"
              iconWidth={12}
            />
          )}
          {discountRate !== 0 && (
            <Badge
              text={`${discountRate}%`}
              height="h-[18px]"
              hasIcon={true}
              iconSrc={arrowDown}
              backgroundColor="bg-ELSE-FF3"
              textColor="text-SYSTEM-main"
              textSize="text-sm"
              iconWidth={12}
            />
          )}
        </div>
        <div className="flex gap-2 text-ELSE-F8">
          <p>List Price</p>
          <p className="line-through">{`$ ${price}`}</p>
        </div>
        <div className="flex gap-2 content-center">
          <p className="text-xxl font-bold">{`\$ ${presentPrice}`}</p>
          <p className="content-center text-ELSE-55">
            {convertToKrw(Number(exchangeData?.usdToKrw), Number(presentPrice))}
          </p>
        </div>
        <p className="text-sm text-ELSE-76 mb-3">
          {getFormattedExchangeText(
            exchangeData.usdToKrw,
            exchangeData.createdAt
          )}
        </p>
        <div className="text-md px-3 py-2 bg-ELSE-F5 mb-3">
          <p className="font-bold">아마존 가격</p>
          <p className="text-ELSE-55">
            {`마지막 업데이트 : 
            ${formatDistanceToNow(crawlingUpdatedAt, {
              addSuffix: true,
              locale: ko,
            })}
            , 마지막 가격 변경: ${formatDistanceToNow(presentPriceUpdatedAt, {
              addSuffix: true,
              locale: ko,
            })}`}
          </p>
        </div>
        {optionStatus && (
          <CustomButton variant="outlineColor">
            더 많은 옵션 보러가기
          </CustomButton>
        )}
      </div>
    </div>
  );
};
export default ProductDetailContent;
