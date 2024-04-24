"use client";
import React, { useState } from "react";

const CarpetInfos = () => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="container px-4 mx-auto pt-8 [&_p]:text-[14px] [&_h1]:font-medium [&_h1]:text-[18px] [&_h2]:font-medium [&_h2]:text-[18px] [&_h3]:font-medium [&_h3]:text-[18px]">
      <h1>
        <strong>Halı Modelleri</strong>
      </h1>
      <p className="pt-2">
        Değişen iç mekân dekorasyon anlayışında fonksiyonelliği ikinci planda
        kalan halılar günümüzde daha çok dekoratif amaçlarla kullanılıyor. Hal
        böyle olunca tasarımcılar geniş hayal güçleriyle sektöre renk ve desen
        olarak sonsuz çeşit katmış durumda. Moda kavramının eskisinden daha
        güçlü olduğu halı sektöründe trendler her yıl değişiyor. Sınırsız renk
        ve desen seçeneklerinden yaratılan kombinasyonlar arasında her
        dekorasyon tarzına uygun çeşidi bulmak mümkün. Dekorasyon stillerine
        uyumlu olmanın ötesinde, var olan stillere yeni yorumlar getirmek,
        yepyeni tarzlar yaratmak halı modasında son yıllarda gördüğümüz
        eğilimlerden.
      </p>

      {isExpanded ? (
        <>
          <h2 className="mt-8">
            <strong>2024 Pandora Halıdan Halı Modelleri</strong>
          </h2>
          <p className="pt-2">
            Değişen iç mekân dekorasyon anlayışında fonksiyonelliği ikinci
            planda kalan halılar günümüzde daha çok dekoratif amaçlarla
            kullanılıyor. Hal böyle olunca tasarımcılar geniş hayal güçleriyle
            sektöre renk ve desen olarak sonsuz çeşit katmış durumda. Moda
            kavramının eskisinden daha güçlü olduğu halı sektöründe trendler her
            yıl değişiyor. Sınırsız renk ve desen seçeneklerinden yaratılan
            kombinasyonlar arasında her dekorasyon tarzına uygun çeşidi bulmak
            mümkün. Dekorasyon stillerine uyumlu olmanın ötesinde, var olan
            stillere yeni yorumlar getirmek, yepyeni tarzlar yaratmak halı
            modasında son yıllarda gördüğümüz eğilimlerden.
          </p>
          <h3 className="mt-8">
            <strong>En Kaliteli Halı Markaları</strong>
          </h3>
          <p className="pt-2">
            Markalar arası gerçek farkı yaratan, tasarım ve üretimde
            kullandıkları yaklaşım biçimleridir. Ürünlerini değerlendireceğiniz
            üreticiler, her dekorasyon tarzına uyumlu model seçenekleri sunuyor
            ya da sadece belirli tarzlara odaklanmış, o alanda tasarım yapıyor
            olabilir. Üretim konsepti ne olursa olsun, inovatif bakış açıları
            ayrıcalıklı ürünler meydana getirecektir. Yenilikçiliği iki alanda
            incelemek mümkün; görsel tasarım ve teknik özellikler.
          </p>
          <p className="pt-2">
            Görsel tasarım, işin sanatsal boyutudur. Mevcut dekorasyon
            stillerini daha güçlü şekilde ifade edecek renk seçimi ve desen
            oluşturma konusuna önem veren markalara yönelebilirsiniz. Teknik
            bakımdan yenilikçi özellikler içeren halılar, kullanımla ilgili
            sorunlara pratik çözümler getirir. Toz tutmama, anti bakteriyellik,
            anti alerjik olma gibi özelliklerin seçimi şekillendirmesine izin
            verebilirsiniz.
          </p>
          <p className="pt-2">
            Kaliteyi ve estetiği evlere taşıyan Pandora Halıdan, &quot;
            <b>Hangi Halı Markasını Seçmeliyim?</b>&quot; sorusunun ideal
            cevaplarından olan Karmen, Karar, Kreasyon,
            Majolika, Saray, Sanat Halı markalarıyla yuvanızda istediğiniz
            atmosferi oluşturmanıza yardım edecek.
          </p>
          <div className="w-full flex items-center justify-center">
            <button
              className="mt-4 bg-white hover:bg-black/10 transition-all duration-200 hover:border-black/10 hover:text-black text-black/80 font-medium px-6 py-1 rounded-full border border-black/50"
              onClick={toggleExpand}
            >
              Devamını Gizle
            </button>
          </div>
        </>
      ) : (
        <div className="w-full flex items-center justify-center">
          <button
            className="mt-4 bg-white hover:bg-black/10 transition-all duration-200 hover:border-black/10 hover:text-black text-black/80 font-medium px-6 py-1 rounded-full border border-black/50"
            onClick={toggleExpand}
          >
            Devamını Oku
          </button>
        </div>
      )}
    </div>
  );
};

export default CarpetInfos;
