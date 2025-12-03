import React, { memo, useMemo } from "react";
import { usePreferredCurrency } from "../hooks/usePreferredCurrency";

const ProductPrice = memo(({ product }) => {
  const { currency } = usePreferredCurrency();
  const isINR = currency === "INR";

  const mrpValue = useMemo(() => isINR ? product?.mrp : product?.price_in_dolor, [isINR, product?.mrp, product?.price_in_dolor]);
  const saleValue = useMemo(() => isINR ? product?.sale_price : product?.sale_price_in_dollar, [isINR, product?.sale_price, product?.sale_price_in_dollar]);

  const formatValue = useMemo(() => {
    return (value) => {
      if (value === undefined || value === null || value === "") {
        return "-";
      }

      const symbol = isINR ? "₹" : "$";
      return `${symbol} ${value}`;
    };
  }, [isINR]);

  const formattedMrp = useMemo(() => formatValue(mrpValue), [formatValue, mrpValue]);
  const formattedSale = useMemo(() => formatValue(saleValue), [formatValue, saleValue]);

  return (
    <div className="flex items-center gap-2">
      <p className="text-sm sm:text-base font-normal text-gray-400 line-through">
        {formattedMrp}
      </p>
      <p className="text-base sm:text-lg font-semibold text-san-felix-800">
        {formattedSale}
      </p>
    </div>
  );
});

ProductPrice.displayName = 'ProductPrice';

export default ProductPrice;
