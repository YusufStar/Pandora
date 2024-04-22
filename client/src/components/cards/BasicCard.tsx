import React from "react";

type Props = {
  bannerImage: string;
  marka: string;
  fiyat: number;
  indirim: number;
  description: string;
};

const BasicCard = ({
  bannerImage,
  fiyat,
  indirim,
  marka,
  description,
}: Props) => {
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
    <div className="w-[350px] h-[538px] flex flex-col items-center justify-center cursor-pointer">
      <img src={bannerImage} alt="" className="h-[430px] object-contain" />

      <span className="font-bold text-base uppercase w-full pt-2 text-[#0a0a0a]">
        {marka}
      </span>

      <span className=" text-sm w-full text-[#676767]">{description}</span>

      {indirim > 0 ? (
        <>
          <div className="flex items-center gap-2 w-full pt-1">
            <span className="w-10 h-10 text-[12px] font-medium bg-black text-white flex items-center justify-center">
              %{indirim}
            </span>

            <div className="flex flex-col">
              <span className="w-full text-base line-through font-medium text-[#676767]">
                {formatCurrency(fiyat)}
              </span>
              <span className="w-full text-lg font-medium text-[#080808]">
                {formatCurrency(indirimUygula(fiyat, indirim) as number)}
              </span>
            </div>
          </div>
        </>
      ) : (
        <>
          <span className="pt-1 w-full text-lg font-medium text-[#080808]">
            {formatCurrency(fiyat)}
          </span>
        </>
      )}
    </div>
  );
};

export default BasicCard;
