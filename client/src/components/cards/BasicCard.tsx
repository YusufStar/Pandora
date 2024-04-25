import Link from "next/link";
import React, { useCallback } from "react";

type Props = {
  src: string;
  marka: string;
  fiyat: number;
  indirim: number;
  description: string;
  id: any;
};

const BasicCard = ({ src, fiyat, indirim, marka, description, id }: Props) => {
  function formatCurrency(number: number) {
    const formattedNumber = new Intl.NumberFormat("tr-TR", {
      style: "currency",
      currency: "TRY",
    }).format(number);
    return formattedNumber;
  }

  function indirimUygula(sayi: number, yuzde: number) {
    if (sayi < 0 || yuzde < 0 || yuzde > 100) {
      return "Geçersiz giriş. Sayı ve yüzde pozitif olmalıdır, ve yüzde 100'den küçük veya eşit olmalıdır.";
    }

    var indirimMiktari = sayi * (yuzde / 100);
    var indirimliFiyat = sayi - indirimMiktari;

    return indirimliFiyat;
  }

  return (
    <Link draggable={false} href={`/product/${id}`}>
      <div className="p-3 relative overflow-hidden h-auto flex product-container flex-col">
        <div className="!px-4 relative">
          <img
            draggable={false}
            src={src}
            alt={description}
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
            {marka}
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
            {description}
          </h3>
          <div>
            {indirim > 0 && (
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
                    %{indirim}
                  </div>
                  <div className="flex discount-price flex-col">
                    <span>{formatCurrency(fiyat)}</span>
                    <span style={{ color: "rgb(8, 8, 8)" }}>
                      {formatCurrency(indirimUygula(fiyat, indirim) as number)}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {indirim === 0 && (
              <div
                className="price-main"
                style={{
                  justifyContent: "unset",
                  fontWeight: 500,
                }}
              >
                <div className="discount-price-main flex flex-row">
                  <div className="flex flex-col">
                    <span></span>
                    <span
                      className="text-base lg:text-lg font-medium"
                      style={{ color: "rgb(8, 8, 8)" }}
                    >
                      {formatCurrency(indirimUygula(fiyat, indirim) as number)}
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
