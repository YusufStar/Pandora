import Payments from "@/components/icons/Payments";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import React from "react";

const Footer = () => {
  const items = [
    {
      title: "Hızlı Erişim",
      subs: [
        {
          title: "Anasayfa",
        },
        {
          title: "Sipariş Takip",
        },
        {
          title: "Sepetim",
        },
        {
          title: "Bayilerimiz",
        },
        {
          title: "Contact",
        },
      ],
    },
    {
      title: "Önemli Bilgiler",
      subs: [
        {
          title: "Politikamız",
          path: "#",
        },
        {
          title: "Teslimat Koşulları",
          path: "#",
        },
        {
          title: "Satış Sözleşmesi",
          path: "/garantikosullari",
        },
        {
          title: "Garanti ve İade Koşulları",
          path: "/garantikosullari",
        },
        {
          title: "Halı Nasıl Yıkarnı ?",
        },
        {
          title: "Mesafeli Satış Sözleşmesi",
          path: "/mesafeli-satis-sozlesmesi",
        },
      ],
    },
    {
      title: "Kişisel Veriler",
      subs: [
        {
          title: "Gizlilik Politikası",
          path: "/gizlilik",
        },
        {
          title: "Çerez Politikası",
        },
        {
          title: "İnternet Sitesi Aydınlatma Metni",
        },
        {
          title: "Ticari Elektronik İletişim Onayı",
        },
        {
          title: "Veri Sahibi Başvuru",
        },
      ],
    },
  ];

  return (
    <footer className="bg-black">
      <div className="container flex flex-col justify-between mx-auto py-8 px-4 w-full h-fit">
        <div className="grid lg:hidden mb-8 mobile-footer grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3">
          <Accordion type="single" collapsible className="w-full">
            {items.map((item) => (
              <AccordionItem key={item.title} value={item.title}>
                <AccordionTrigger
                  className={"text-base font-medium text-white"}
                >
                  {item.title}
                </AccordionTrigger>
                {item.subs.map((subItem) => (
                  <AccordionContent
                    className={"font-normal text-sm text-white"}
                    key={subItem.title}
                  >
                    {subItem.title}
                  </AccordionContent>
                ))}
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        <div className="hidden lg:grid mb-8 grid-cols-8">
          <div className="col-span-6">
            <div className="grid desktop-footer grid-cols-1 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4">
              {items.map((item, index) => (
                <div key={index}>
                  <p className={"footer-title text-white font-medium"}>
                    {item.title}
                  </p>
                  <ul className={"footer-links flex flex-col   pt-2"}>
                    {item.subs.map((sub, index) => (
                      <li key={index + "sub"}>
                        <Link
                          target="_blank"
                          className={"text-white"}
                          href={sub.path ?? "#"}
                        >
                          {sub.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex w-full items-center justify-between">
          <h3>
            <span className="text-[10px] lg:text-[14px] font-medium text-white/50">
              © 2024 PANDORA HALI
            </span>
          </h3>
          <Payments />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
