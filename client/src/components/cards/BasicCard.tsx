import Link from "next/link";
import {cmToSquareMeter, formatCurrency, useDiscount} from "@/zustand/useBasket";
import {products, sizes} from "@/zustand/mock-products";

type Props = {
    product_data: typeof products[0];
};

const BasicCard = ({ product_data }: Props) => {
  return (
    <Link draggable={false} href={`/product/${product_data.id}`}>
      <div className="p-3 relative overflow-hidden h-auto flex product-container flex-col">
        <div className="!px-4 relative">
          <img
            draggable={false}
            src={product_data.banner}
            alt={product_data.description}
            decoding="async"
            className="w-[210px] sm:w-[300px] md:w-[325px] lg:w-[350px]"
            style={{
              inset: "0px",
              boxSizing: "border-box",
              padding: "0px",
              border: "none",
              margin: "auto",
              display: "block",
              objectFit: "contain",
            }}
          />
        </div>

          <div className="uppercase products-slider-info-main product-list-item-info relative">
          <h2
            className="brand"
            style={{
              color: "rgb(10, 10, 10)",
              textAlign: "unset",
              fontWeight: 700,
            }}
          >
            {product_data.brand}
          </h2>

          <h3
            className="product-name mb-2"
            style={{
              color: "#0a0a0a",
              textAlign: "unset",
              fontSize: "14px",
              fontWeight: 400,
            }}
          >
            {product_data.description} {sizes[product_data.defaultSize]}
          </h3>

          <div>
            {product_data.discount > 0 && (
              <div
                className="flex items-center price-main"
                style={{
                  justifyContent: "unset",
                  fontWeight: 500,
                  marginTop: "10px",
                  height: "40px",
                }}
              >
                <div className="discount-price-main flex flex-row">
                  <div
                    className="discount-percent"
                    style={{
                      backgroundColor: "rgb(0, 0, 0)",
                      color: "rgb(255, 255, 255)",
                      fontWeight: 500,
                      borderRadius: "0px",
                    }}
                  >
                    %{product_data.discount}
                  </div>
                  <div className="flex discount-price flex-col">
                    <span>{formatCurrency(cmToSquareMeter(sizes[product_data.defaultSize]) * product_data.price)}</span>
                    <span style={{ color: "rgb(8, 8, 8)" }}>
                      {formatCurrency(useDiscount(cmToSquareMeter(sizes[product_data.defaultSize]) * product_data.price, product_data.discount) as number)}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {product_data.discount === 0 && (
              <div
                style={{
                  justifyContent: "unset",
                  fontWeight: 500,
                }}
              >
                <div className="discount-price-main flex flex-row">
                  <div className="flex flex-col">
                    <span
                      className="text-base lg:text-lg font-medium"
                      style={{ color: "rgb(8, 8, 8)" }}
                    >
                      {formatCurrency(cmToSquareMeter(sizes[product_data.defaultSize]) * product_data.price)}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BasicCard;
