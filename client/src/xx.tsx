import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <div className="min-h-[calc(100vh-96px)] w-full flex flex-col container mx-auto py-12 px-4 gap-4">
      <div className="markdown prose w-full break-words h-fit">
        <h2>MESAFELİ SATIŞ SÖZLEŞMESİ</h2>
        <h3>1. TARAFLAR</h3>
        <p>
          İşbu Sözleşme, aşağıdaki taraflar arasında aşağıda belirtilen hüküm ve
          şartlar çerçevesinde imzalanmıştır.
        </p>
        <p>
          <strong>
            ‘ALICI’ ; (sözleşmede bundan sonra "ALICI" olarak anılacaktır)
          </strong>
        </p>
        <p>
          AD-SOYAD:
          <br />
          ADRES:
        </p>
        <p>
          <strong>
            ‘SATICI’ ; (sözleşmede bundan sonra "SATICI" olarak anılacaktır)
          </strong>
        </p>
        <p>
          AD-SOYAD:{" "}
          <span className="text-sm">Pandora Hali Tekstil Tic. Ltd. Sti.</span>
          <br />
          ADRES:{" "}
          <span className="text-sm">Etiler mah. Evliya Celebi Cad. No:2/E</span>
        </p>
        <p>
          İşbu sözleşmeyi kabul etmekle ALICI, sözleşme konusu siparişi
          onayladığı takdirde sipariş konusu bedeli ve varsa kargo ücreti, vergi
          gibi belirtilen ek ücretleri ödeme yükümlülüğü altına gireceğini ve bu
          konuda bilgilendirildiğini peşinen kabul eder.
        </p>
        <h3>2. TANIMLAR</h3>
        <p>
          İşbu sözleşmenin uygulanmasında ve yorumlanmasında aşağıda yazılı
          terimler karşılarındaki yazılı açıklamaları ifade edeceklerdir.
        </p>
        <ul>
          <li>
            <strong>BAKAN:</strong> Gümrük ve Ticaret Bakanı’nı,
          </li>
          <li>
            <strong>BAKANLIK:</strong> Gümrük ve Ticaret Bakanlığı’nı,
          </li>
          <li>
            <strong>KANUN:</strong> 6502 sayılı Tüketicinin Korunması Hakkında
            Kanun’u,
          </li>
          <li>
            <strong>YÖNETMELİK:</strong> Mesafeli Sözleşmeler Yönetmeliği’ni
            (RG:27.11.2014/29188),
          </li>
          <li>
            <strong>HİZMET:</strong> Bir ücret veya menfaat karşılığında yapılan
            ya da yapılması taahhüt edilen mal sağlama dışındaki her türlü
            tüketici işleminin konusunu,
          </li>
          <li>
            <strong>SATICI:</strong> Ticari veya mesleki faaliyetleri kapsamında
            tüketiciye mal sunan veya mal sunan adına veya hesabına hareket eden
            şirketi,
          </li>
          <li>
            <strong>ALICI:</strong> Bir mal veya hizmeti ticari veya mesleki
            olmayan amaçlarla edinen, kullanan veya yararlanan gerçek ya da
            tüzel kişiyi,
          </li>
          <li>
            <strong>SİTE:</strong> SATICI’ya ait internet sitesini,
          </li>
          <li>
            <strong>SİPARİŞ VEREN:</strong> Bir mal veya hizmeti SATICI’ya ait
            internet sitesi üzerinden talep eden gerçek ya da tüzel kişiyi,
          </li>
          <li>
            <strong>TARAFLAR:</strong> SATICI ve ALICI’yı,
          </li>
          <li>
            <strong>SÖZLEŞME:</strong> SATICI ve ALICI arasında akdedilen işbu
            sözleşmeyi,
          </li>
          <li>
            <strong>MAL:</strong> Alışverişe konu olan taşınır eşyayı ve
            elektronik ortamda kullanılmak üzere hazırlanan yazılım, ses,
            görüntü ve benzeri gayri maddi malları ifade eder.
          </li>
        </ul>
        <h3>3. KONU</h3>
        <p>
          İşbu Sözleşme, ALICI’nın, SATICI’ya ait internet sitesi üzerinden
          elektronik ortamda siparişini verdiği aşağıda nitelikleri ve satış
          fiyatı belirtilen ürünün satışı ve teslimi ile ilgili olarak 6502
          sayılı Tüketicinin Korunması Hakkında Kanun ve Mesafeli Sözleşmelere
          Dair Yönetmelik hükümleri gereğince tarafların hak ve yükümlülüklerini
          düzenler.
        </p>
        <p>
          Listelenen ve sitede ilan edilen fiyatlar satış fiyatıdır. İlan edilen
          fiyatlar ve vaatler güncelleme yapılana ve değiştirilene kadar
          geçerlidir. Süreli olarak ilan edilen fiyatlar ise belirtilen süre
          sonuna kadar geçerlidir.
        </p>
        <h3>4. SATICI BİLGİLERİ</h3>
        <ul>
          <li>
            Ünvanı:{" "}
            <span className="text-sm">Pandora Hali Tekstil Tic. Ltd. Sti.</span>
          </li>
          <li>Adres:</li>
          <li>
            Telefon: <span className="text-sm">+90 552 448 3327</span>
          </li>
          <li>Faks:</li>
          <li>
            Eposta: <span className="text-sm">pandorahali07@gmail.com</span>
          </li>
        </ul>
        <h3>5. ALICI BİLGİLERİ</h3>
        <ul>
          <li>Teslim edilecek kişi:</li>
          <li>Teslimat Adresi:</li>
          <li>Telefon:</li>
          <li>Faks:</li>
          <li>Eposta/kullanıcı adı:</li>
        </ul>
        <h3>6. SİPARİŞ VEREN KİŞİ BİLGİLERİ</h3>
        <ul>
          <li>Ad/Soyad/Unvan:</li>
          <li>Adres:</li>
          <li>Telefon:</li>
          <li>Faks:</li>
          <li>Eposta/kullanıcı adı:</li>
        </ul>
        <h3>7. SÖZLEŞME KONUSU ÜRÜN/ÜRÜNLER BİLGİLERİ</h3>
        <ol>
          <li>
            <p>
              Malın/Ürün/Ürünlerin/Hizmetin temel özelliklerini (türü, miktarı,
              marka/modeli, rengi, adedi) SATICI’ya ait internet sitesinde
              yayınlanmaktadır. Satıcı tarafından kampanya düzenlenmiş ise
              ilgili ürünün temel özelliklerini kampanya süresince
              inceleyebilirsiniz. Kampanya tarihine kadar geçerlidir.
            </p>
          </li>
          <li>
            <p>
              Listelenen ve sitede ilan edilen fiyatlar satış fiyatıdır. İlan
              edilen fiyatlar ve vaatler güncelleme yapılana ve değiştirilene
              kadar geçerlidir. Süreli olarak ilan edilen fiyatlar ise
              belirtilen süre sonuna kadar geçerlidir.
            </p>
          </li>
          <li>
            <p>
              Sözleşme konusu mal ya da hizmetin tüm vergiler dâhil satış fiyatı
              aşağıda gösterilmiştir.
            </p>
            <ul>
              <li>
                <p>Ürün Açıklaması:</p>
              </li>
              <li>
                <p>Adet:</p>
              </li>
              <li>
                <p>Birim Fiyatı:</p>
              </li>
              <li>
                <p>Ara Toplam (KDV Dahil):</p>
              </li>
              <li>
                <p>Kargo Tutarı:</p>
              </li>
              <li>
                <p>Toplam:</p>
              </li>
              <li>
                <p>Ödeme Şekli ve Planı:</p>
              </li>
              <li>
                <p>Teslimat Adresi:</p>
              </li>
              <li>
                <p>Teslim Edilecek kişi:</p>
              </li>
              <li>
                <p>Fatura Adresi:</p>
              </li>
              <li>
                <p>Sipariş Tarihi:</p>
              </li>
              <li>
                <p>Teslimat tarihi:</p>
              </li>
              <li>
                <p>Teslim şekli:</p>
              </li>
            </ul>
          </li>
          <li>
            <p>
              Ürün sevkiyat masrafı olan kargo ücreti ALICI tarafından
              ödenecektir.
            </p>
          </li>
        </ol>
        <h3>8. FATURA BİLGİLERİ</h3>
        <ul>
          <li>Ad/Soyad/Unvan:</li>
          <li>Adres:</li>
          <li>Telefon:</li>
          <li>Faks:</li>
          <li>Eposta/kullanıcı adı:</li>
          <li>
            Fatura teslim: Fatura sipariş teslimatı sırasında fatura adresine
            sipariş ile birlikte teslim edilecektir.
          </li>
        </ul>
        <h3>9. GENEL HÜKÜMLER</h3>
        <ol>
          <li>
            <p>
              ALICI, SATICI’ya ait internet sitesinde sözleşme konusu ürünün
              temel nitelikleri, satış fiyatı ve ödeme şekli ile teslimata
              ilişkin ön bilgileri okuyup bilgi sahibi olduğunu ve elektronik
              ortamda gerekli teyidi verdiğini beyan eder. ALICI; işbu
              sözleşmeyi elektronik ortamda teyit etmekle, mesafeli
              sözleşmelerin akdinden önce, SATICI tarafından ALICI’ya verilmesi
              gereken adres, siparişi verilen ürünlere ait temel özellikler,
              ürünlerin vergiler dâhil fiyatı, ödeme ve teslimat bilgilerini de
              doğru ve eksiksiz olarak edindiğini teyit etmiş olur.
            </p>
          </li>
          <li>
            <p>
              Sözleşme konusu her bir ürün, 30 günlük yasal süreyi aşmamak kaydı
              ile ALICI’nın yerleşim yerinin uzaklığına bağlı olarak internet
              sitesinde ön bilgiler içinde açıklanan süre zarfında ALICI veya
              gösterdiği adresteki kişi/kuruluşa teslim edilir. Bu süre içinde
              ürünün ALICI’ya teslim edilememesi durumunda, ALICI’nın sözleşmeyi
              sona erdirmesi hakkı saklıdır.
            </p>
          </li>
          <li>
            <p>
              SATICI, Sözleşme konusu ürünü eksiksiz, siparişte belirtilen
              niteliklere uygun ve varsa garanti belgeleri ve kullanım
              kılavuzları ile teslim etmeyi, her türlü ayıptan arî olarak yasal
              mevzuat gereklerine uygun olarak sağlam, standartlara uygun
              şekilde işin gereği olan bilgi ve belgeler ile teslim etmeyi, işin
              ifası sırasında gerekli dikkat ve özeni göstermeyi kabul, beyan ve
              taahhüt eder.
            </p>
          </li>
          <li>
            <p>
              SATICI, Sözleşme konusu malın teslimatı için işbu sözleşmeyi teyit
              etmiş olmasının yanı sıra, bedelin ALICI’nın tercih ettiği ödeme
              şekli ile ödenmiş olması şarttır. Herhangi bir nedenle ürün bedeli
              ödenmez veya banka kayıtlarında iptal edilir ise, SATICI ürünün
              teslimi yükümlülüğünden kurtulmuş kabul edilir.
            </p>
          </li>
          <li>
            <p>
              Ürünün tesliminden sonra ALICI’ya ait kredi kartının ALICI’nın
              kusurundan kaynaklanmayan bir şekilde yetkisiz kişilerce haksız
              veya hukuka aykırı olarak kullanılması nedeni ile ilgili banka
              veya finans kuruluşun ürün bedelini SATICI’ya ödememesi halinde,
              ALICI’nın kendisine teslim edilmiş olması kaydıyla ürünün 3 gün
              içinde SATICI’ya gönderilmesi zorunludur. Bu takdirde nakliye
              giderleri ALICI’ya aittir.
            </p>
          </li>
          <li>
            <p>
              SATICI mücbir sebepler veya nakliyeyi engelleyen hava muhalefeti,
              ulaşımın kesilmesi gibi olağanüstü durumlar nedeni ile sözleşme
              konusu ürünü süresi içinde teslim edemez ise, durumu ALICI’ya
              bildirmekle yükümlüdür. Bu takdirde ALICI siparişin iptal
              edilmesini, sözleşme konusu ürünün varsa emsali ile
              değiştirilmesini ve/veya teslimat süresinin engelleyici durumun
              ortadan kalkmasına kadar ertelenmesi haklarından birini
              kullanabilir. ALICI’nın siparişi iptal etmesi halinde ödediği
              tutar 10 gün içinde kendisine nakden ve defaten ödenir.
            </p>
          </li>
          <li>
            <p>
              ALICI ve/veya ALICI’nın teslimat yapılması öngörülen kişi/kuruluşa
              teslim edilen ürünlerin kontrolü, teslim alındığı anda yapılacak
              olup, hasarlı ve ayıplı ürünler teslim alınmayacaktır. Teslim
              alınan ürünlerin hasarsız ve sağlam olduğu kabul edilecektir.
              Teslimden sonra ürünün özenle korunması borcu, ALICI’ya aittir.
              Cayma hakkı kullanılacaksa ürün kullanılmamalı ve fatura iade
              edilmelidir.
            </p>
          </li>
          <li>
            <p>
              ALICI ile sipariş esnasında kullanılan kredi kartı hamilinin aynı
              kişi olmaması veya ürünün ALICI’ya teslim edilmesinden önce,
              siparişte kullanılan kredi kartına ilişkin güvenlik açığı tespit
              edilmesi durumunda, SATICI, kredi kartı hamiline ait kimlik ve
              iletişim bilgilerini, siparişte kullanılan kredi kartının son 3
              aylık ekstre bilgilerini veya kart hamilinin bankasından, kredi
              kartının hamiline ait olduğunu gösterir yazıyı ibraz etmesini
              ALICI’dan talep edebilir. ALICI’nın talebe konu bilgileri temin
              etmesine kadar geçen süre içinde sipariş dondurulacak olup, anılan
              taleplerin 24 saat içinde karşılanmaması halinde ise SATICI,
              siparişi iptal etme hakkını haizdir.
            </p>
          </li>
          <li>
            <p>
              ALICI, SATICI’ya ait internet sitesine üye olurken verdiği kişisel
              ve diğer sair bilgilerin gerçeğe uygun olduğunu, SATICI’nın bu
              bilgilerin gerçeğe aykırılığı nedeniyle uğrayacağı tüm zararları,
              SATICI’nın ilk bildirimi üzerine derhal, nakden ve defaten tazmin
              edeceğini beyan ve taahhüt eder.
            </p>
          </li>
          <li>
            <p>
              ALICI, SATICI’ya ait internet sitesini kullanırken yürürlükteki
              yasal mevzuat hükümlerine ve kamu düzenine aykırı şekilde faaliyet
              göstermeyeceğini, aksi takdirde tüm hukuki ve cezai sorumlulukları
              tamamen ve münhasıran kendisine ait olmak üzere üstleneceğini
              kabul ve taahhüt eder.
            </p>
          </li>
          <li>
            <p>
              ALICI, SATICI’ya ait internet sitesini hiçbir şekilde kamu
              düzenini bozucu, genel ahlaka aykırı, başkalarını rahatsız ve
              taciz edici, müstehcen, yasadışı faaliyetleri teşvik edici şekilde
              kullanamaz. Ayrıca, başkalarının hizmetleri kullanmasını önleyici
              veya zorlaştırıcı faaliyet (spam, virus, truva atı, vb.)
              işlemlerde bulunamaz.
            </p>
          </li>
          <li>
            <p>
              SATICI’ya ait internet sitesi üzerinden, SATICI’nın kendi
              kontrolünde olmayan ve/veya başkaca üçüncü kişilerin sahip olduğu
              ve işlettiği başka web sitelerine ve/veya başka içeriklere link
              verilebilir. Bu linkler ALICI’ya yönlenme kolaylığı sağlamak
              amacıyla konmuş olup herhangi bir web sitesini veya o siteyi
              işleten kişiyi desteklememekte ve link verilen web sitesinin
              içeriğine yönelik herhangi bir garanti vermemektedir.
            </p>
          </li>
          <li>
            <p>
              İşbu sözleşme içerisinde sayılan maddelerden bir ya da birkaçını
              ihlal eden üye işbu ihlal nedeniyle cezai ve hukuki olarak şahsen
              sorumlu olup, SATICI’yı bu ihlallerin hukuki ve cezai
              sonuçlarından ari tutacaktır. Ayrıca; işbu ihlal nedeniyle, olayın
              hukuk alanına intikal ettirilmesi halinde, SATICI’nın üyeye karşı
              üyelik sözleşmesine uyulmamasından dolayı tazminat talebinde
              bulunma hakkı saklıdır.
            </p>
          </li>
        </ol>
        <h3>10. CAYMA HAKKI</h3>
        <ol>
          <li>
            <p>
              ALICI; mal satışına ilişkin mesafeli sözleşmelerde, ürünün
              kendisine veya gösterdiği adresteki kişi/kuruluşa teslim
              tarihinden itibaren 14 (on dört) gün içerisinde, SATICI’ya
              bildirmek şartıyla hiçbir hukuki ve cezai sorumluluk
              üstlenmeksizin ve hiçbir gerekçe göstermeksizin ürünü reddederek
              sözleşmeden cayma hakkını kullanabilir.
            </p>
          </li>
          <li>
            <p>
              Cayma hakkının kullanılması için 14 (ondört) günlük süre içinde
              SATICI’ya iadeli taahhütlü posta, faks veya eposta ile yazılı
              bildirimde bulunulması ve ürünün 11. madde hükümleri çerçevesinde
              ve işbu sözleşmenin ayrılmaz parçası olan ve www.[WEBSITE URL] web
              sitesinde yayınlanmış olan ön bilgiler gereğince, ambalajı
              açılmamış ve kullanılmamış olması şarttır. Bu hakkın kullanılması
              halinde,
              <ul>
                <li>
                  3. kişiye veya ALICI’ya teslim edilen ürünün faturası, (İade
                  edilmek istenen ürünün faturası kurumsal ise, iade ederken
                  kurumun düzenlemiş olduğu iade faturası ile birlikte
                  gönderilmesi gerekmektedir. Faturası kurumlar adına düzenlenen
                  iadeler, iade faturası kesilmediği takdirde
                  tamamlanamayacaktır.)
                </li>
                <li>İade formu,</li>
                <li>
                  İade edilecek ürünlerin kutusu, ambalajı, varsa standart
                  aksesuarları ile birlikte eksiksiz ve hasarsız olarak teslim
                  edilmesi gerekmektedir.
                </li>
              </ul>
            </p>
          </li>
          <li>
            <p>
              SATICI, cayma bildiriminin kendisine ulaşmasından itibaren 10 gün
              içinde toplam bedeli ve ALICI’yı borç altına sokan belgeleri
              ALICI’ya iade etmek ve 20 günlük süre içinde malı iade almakla
              yükümlüdür.
            </p>
          </li>
          <li>
            <p>
              Cayma hakkı nedeniyle iade edilen ürünün kargo bedeli SATICI
              tarafından karşılanır.
            </p>
          </li>
          <li>
            <p>
              Cayma hakkının kullanılmasını müteakip ürünün iadesi sırasında
              SATICI’ya ulaşmasından itibaren ürünün standartlara uygun bir
              şekilde ve eksiksiz geri gönderilmesini takiben 20 günlük süre
              içerisinde ürün bedeli ALICI’ya iade edilir.
            </p>
          </li>
        </ol>
        <h3>11. CAYMA HAKKI KULLANILAMAYACAK ÜRÜNLER</h3>
        <ol>
          <li>
            <p>
              Niteliği itibariyle iade edilemeyecek ürünler, tek kullanımlık
              ürünler, kopyalanabilir yazılım ve programlar, hızlı bozulan veya
              son kullanım tarihi geçen ürünler için cayma hakkı kullanılamaz.
              Ayrıca, aşağıdaki ürünlerde cayma hakkının kullanılması, ürünün
              ambalajının açılmamış, denenmemiş, bozulmamış ve kullanılmamış
              olması şartına bağlıdır:
              <ul>
                <li>Her türlü yazılım ve programlar</li>
                <li>DVD, VCD, CD ve kasetler</li>
                <li>
                  Bilgisayar ve kırtasiye sarf malzemeleri (toner, kartuş, şerit
                  vb.)
                </li>
                <li>Hür türlü kozmetik ürünleri</li>
                <li>Telefon kontör siparişleri</li>
              </ul>
            </p>
          </li>
          <li>
            <p>
              Ambalajında, standart aksesuarlarında, faturasından ve kutusunda
              herhangi bir açılma, bozulma, yırtılma, tahrip, yıpranma,
              kullanılma ve sair durumlar tespit edilen ürünler ile ALICI’ya
              teslim edildiği andaki hali ile iade edilemeyen ürünlerin iadesi
              kabul edilmeyecektir. Cayma hakkı kapsamında iade edilecek ürünler
              ile birlikte teslim edilen hediye ürünlerde iade edilmelidir.
            </p>
          </li>
        </ol>
        <h3>12. TEMERRÜT HALİ VE HUKUKİ SONUÇLARI</h3>
        <ol>
          <li>
            <p>
              ALICI’nın kredi kartı ile yaptığı işlemlerde temerrüde düşmesi
              halinde kart sahibi banka ile ALICI arasındaki kredi kartı
              sözleşmesi çerçevesinde faiz ödeyecek ve bankaya karşı sorumlu
              olacaktır. Bu durumda ilgili banka hukuki yollara başvurabilir;
              doğacak masrafları ve vekâlet ücreti ile birlikte ALICI’dan talep
              edebilir ve her koşulda ALICI’nın borcundan dolayı temerrüde
              düşmesi halinde, ALICI, borcun gecikmeli ifasından dolayı
              SATICI’nın uğradığı zarar ve ziyanını ödemeyi kabul eder.
            </p>
          </li>
        </ol>
        <h3>13. YETKİLİ MAHKEME</h3>
        <ol>
          <li>
            <p>
              İşbu sözleşmeden doğacak ihtilaflarda, Ticaret Bakanlığınca ilan
              edilen değere kadar Tüketici Hakem Heyetleri ile ALICI’nın veya
              SATICI’nın yerleşim yerindeki Tüketici Mahkemeleri yetkilidir.
            </p>
          </li>
        </ol>
        <p>İşbu sözleşme ticari amaçlarla yapılmaktadır.</p>
        <p className="font-medium">SATICI:</p>
        <p className="text-sm">Pandora Hali Tekstil Tic. Ltd. Sti.</p>
        <p className="text-sm">{new Date().toLocaleDateString()}</p>
        <p className="font-medium">ALICI:</p>
        <p className="text-sm">[FULLNAME]</p>
        <p className="text-sm">{new Date().toLocaleDateString()}</p>

        <h3>15. İADE ŞARTLARI</h3>
        <ol>
          <li>
            ALICI, satın aldığı ürün ya da ürünleri teslim tarihinden itibaren
            14 gün içerisinde, SATICI'ya iade edebilir.
          </li>
          <li>
            İade edilen ürünlerin kutusu, ambalajı, varsa standart aksesuarları
            ile eksiksiz ve hasarsız olarak gönderilmesi gerekmektedir.
          </li>
          <li>
            İade sırasında oluşacak kargo masrafları, SATICI tarafından
            karşılanacaktır.
          </li>
        </ol>

        <h3>16. GARANTİ ŞARTLARI</h3>
        <ol>
          <li>
            Satışa konu olan ürünlerin garanti süresi, ürün teslim tarihinden
            itibaren başlar ve ürün türüne göre değişiklik gösterebilir.
          </li>
          <li>
            Ürünün garanti kapsamında tamir edilememesi durumunda, ürünün yenisi
            ile değiştirilmesi veya bedelinin iadesi yapılacaktır.
          </li>
        </ol>

        <h3>17. ÖZEL KOŞULLAR</h3>
        <ol>
          <li>
            SATICI, sipariş edilen ürünlerin stok durumunu kontrol ederek,
            stokta bulunmayan ürünler için ALICI'ya bilgi verecektir.
          </li>
          <li>
            ALICI, siparişini iptal etmek istemesi durumunda, sipariş iptal
            işlemini 24 saat içerisinde gerçekleştirebilir.
          </li>
        </ol>

        <h3>18. GİZLİLİK VE GÜVENLİK</h3>
        <ol>
          <li>
            ALICI tarafından verilen kişisel bilgiler, SATICI tarafından
            korunacak ve üçüncü şahıslarla paylaşılmayacaktır.
          </li>
          <li>
            SATICI, ALICI'nın bilgilerini yalnızca sipariş ve teslimat
            süreçlerinde kullanacaktır.
          </li>
        </ol>

        <h3>19. YÜRÜRLÜK</h3>
        <ol>
          <li>
            İşbu Sözleşme, ALICI tarafından elektronik ortamda onaylandığı
            tarihte yürürlüğe girer.
          </li>
          <li>
            Taraflar, bu Sözleşme'de yer alan tüm maddeleri okuduklarını,
            anladıklarını ve kabul ettiklerini beyan ederler.
          </li>
        </ol>

        <h3>20. İLETİŞİM BİLGİLERİ</h3>
        <p>
          <strong>SATICI:</strong>
        </p>
        <ul>
          <li>
            Ünvanı:{" "}
            <span className="text-sm">Pandora Hali Tekstil Tic. Ltd. Sti.</span>
          </li>
          <li>
            Adres:{" "}
            <span className="text-sm">
              Etiler mah. Evliya Celebi Cad. No:2/E
            </span>
          </li>
          <li>
            Telefon: <span className="text-sm">+90 552 448 3327</span>
          </li>
          <li>Faks:</li>
          <li>
            Eposta: <span className="text-sm">pandorahali07@gmail.com</span>
          </li>
        </ul>

        <p>
          <strong>ALICI:</strong>
        </p>
        <ul>
          <li>Ad/Soyad/Unvan:</li>
          <li>Adres:</li>
          <li>Telefon:</li>
          <li>Faks:</li>
          <li>Eposta/kullanıcı adı:</li>
        </ul>

        <p>
          İşbu Sözleşme'de belirtilen tüm şartlar, tarafların karşılıklı olarak
          hak ve yükümlülüklerini düzenlemekte olup, herhangi bir ihtilaf
          durumunda, Tüketici Hakem Heyetleri ve Tüketici Mahkemeleri yetkili
          olacaktır.
        </p>
        <p>
          <strong>SATICI</strong> ve <strong>ALICI</strong> olarak işbu
          Sözleşme'yi okuyup, anlayarak kabul ettiğimizi ve onayladığımızı beyan
          ederiz.
        </p>
      </div>
    </div>
  );
};

export default page;
