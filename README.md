# Next.js & GSAP Page Transition

Bu proje, Next.js App Router yapısı içinde GSAP kullanarak sayfa geçişi animasyonu oluşturan küçük bir demo uygulamasıdır. Ana hedef, menü linklerine tıklandığında sayfanın aniden değişmesi yerine, özel bir kırılma / kapatma / açılma animasyonu ile daha akıcı bir navigasyon deneyimi sunmaktır.

## Proje Özeti

- Next.js 16 ile oluşturulmuştur.
- React 19 tabanlıdır.
- GSAP 3 kullanılarak custom page transition animasyonu uygulanmıştır.
- App Router yapısıyla çalışan modern Next.js yapısı kullanılır.
- Üç ana sayfa vardır: Ana Sayfa, Hakkında, İletişim.
- Navbar sabit konumlu olup tüm sayfalarda görünür.
- Link clickleri yakalanarak yönlendirme, manuel animasyon ile kontrol edilir.

## Kullanılan Teknolojiler

- Next.js 16.3.1
- React 19.2.8
- GSAP 3.15.0
- @gsap/react 2.1.2
- Tailwind CSS 4
- TypeScript 5

## Özellikler

### 1. Custom Page Transition

`src/components/PageTransition.tsx` içerisinde tüm geçiş mantığı yer alır. Bu bileşen şunları yapar:

- Link tıklamalarını yakalar.
- `event.preventDefault()` ile varsayılan yönlendirmeyi durdurur.
- Animasyon öncesinde geçiş durumunu başlatır.
- Üst ve alt kısımlarda beyaz bloklar oluşturur.
- GSAP timeline ile blokların açılıp kapanmasını sağlar.
- Yönlendirme tamamlandıktan sonra yeni route'a geçiş yapar.

### 2. GSAP ile iki satırlı blok animasyonu

Ana animasyon, ekranın yarısını kapatan iki sıra blok üzerinden çalışır:

- `row-1`: üst kısım
- `row-2`: alt kısım
- Her satırda 5 adet blok bulunur.
- Blokların her biri stagger animasyonla hareket eder.
- `scaleY` animasyonu kullanılarak sayfa görünümünü kapatma / açma hissi yaratılır.

### 3. Next.js App Router uyumlu yapısı

- `src/app/layout.tsx` ana layout olarak kullanılır.
- `Navbar` ve `PageTransition` komponentleri layout içinde yer alır.
- `src/app/page.tsx`, `src/app/about/page.tsx`, `src/app/contact/page.tsx` ayrı sayfalar olarak oluşturulmuştur.

### 4. Modern tipografi ve arayüz yaklaşımı

- `next/font/google` ile Boldonse ve IBM Plex Mono fontları yüklenir.
- Tailwind CSS ile arayüz stilize edilir.
- Açık siyah arka plan ve beyaz yazı kullanımı ile minimal, güçlü bir tasarım hedeflenmiştir.

## Proje Yapısı

```text
nextjs-n-gsap-page-transition/
├── public/
├── src/
│   ├── app/
│   │   ├── about/
│   │   │   └── page.tsx
│   │   ├── contact/
│   │   │   └── page.tsx
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   └── components/
│       ├── Navbar.tsx
│       └── PageTransition.tsx
├── .eslintrc.*
├── eslint.config.mjs
├── next.config.ts
├── next-env.d.ts
├── package.json
├── postcss.config.mjs
├── tsconfig.json
├── README.md
└── public/
```

## Ana Dosyalar

### `src/app/layout.tsx`

- Global layout oluşturur.
- `Navbar` ve `PageTransition` bileşenlerini sayfa içerisine ekler.
- `next/font/google` ile kullanılan fontları tanımlar.
- `metadata` alanıyla sayfa başlığı ve açıklaması belirlenir.

### `src/components/Navbar.tsx`

- Üstte sabit duran navigasyon çubuğunu oluşturur.
- `next/link` ile `/`, `/about`, `/contact` sayfalarına navigasyon sağlar.
- Responsive tasarım destekler.

### `src/components/PageTransition.tsx`

- Tüm sayfa geçiş mantığının merkezidir.
- `usePathname()` ile mevcut yolu izler.
- `useRouter()` ile yönlendirme yapar.
- Link click sonrası animasyonu başlatır.
- Route değişince animasyonu geri oynatır.

### `src/app/page.tsx`

- Ana sayfa içeriğini temsil eder.
- Büyük, sade ve yüksek kontrastlı “HOME” başlığı içerir.

### `src/app/about/page.tsx`

- Hakkında sayfasını temsil eder.
- Ana sayfa benzeri görsel yaklaşım kullanır.

### `src/app/contact/page.tsx`

- İletişim sayfasını temsil eder.
- Aynı konsept ile tasarlanmıştır.

## Çalıştırma Adımları

Projeyi yerelde çalıştırmak için aşağıdaki adımları izleyin:

```bash
npm install
npm run dev
```

Sonrasında tarayıcıda şu adresi açın:

```text
http://localhost:3000
```

## Scriptler

`package.json` içinde tanımlı scriptler şunlardır:

```bash
npm run dev
```

Geliştirme sunucusunu başlatır.

```bash
npm run build
```

Production build oluşturur.

```bash
npm run start
```

Build edilmiş uygulamayı çalıştırır.

```bash
npm run lint
```

ESLint ile kod kalitesini kontrol eder.

## Geçiş Mantığı

Sayfa değişimi şu sırayla gerçekleşir:

1. Kullanıcı bir linke tıklar.
2. O anki sayfa animasyon katmanının önüne gelir.
3. Üst ve alt bloklar kapatılır.
4. Loading metni görünür.
5. `router.push(href)` ile yeni route çalıştırılır.
6. Yeni sayfa yüklendikten sonra bloklar tekrar açılır.
7. Geçiş katmanı gizlenir.

Bu akış, kullanıcıya “sayfa geçişi” hissi verir ve uygulamanın daha premium görünmesini sağlar.

## Tasarım Felsefesi

Proje, minimal ama güçlü bir animasyon yaklaşımı kullanır:

- sade arka plan
- büyük başlıklar
- beyaz ve siyah kontrast
- animasyonlu navigasyon
- sanatsal, editorial tarzı görsel dil

Bu sayede sayfa geçişi sadece teknik bir efekt değil, marka/temaya ait bir deneyim haline gelir.

## Notlar ve Olası Sorunlar

### Font uyumu

Bu sürümde fontlar CSS üzerinden doğrudan yüklenmektedir. `Boldonse` ve `IBM Plex Mono` için `@import` kullanılarak `globals.css` içinde tanımlanmış olup, `next/font/google` kaynaklı override uyarısı ortadan kaldırılmıştır. Bu yaklaşım, karakter görünümünü koruyarak daha güvenilir bir çalışma sunar.

### Son doğrulama

Uygulama yerelde doğrulanmıştır:

```bash
npm run dev
```

Sunucu çalışırken ana sayfa başarıyla yanıt vermektedir. Bu demo için görsel akış ve sayfa geçişleri dev modunda sorunsuz şekilde çalışmaktadır.

## Geliştirme İpuçları

- Animasyon sürelerini ve blok sayısını değiştirmek için `BLOCK_COUNT` ve `OVERLAP` sabitlerini düzenleyebilirsiniz.
- Geçiş efekti için `ease`, `duration`, `stagger` değerlerini değiştirebilirsiniz.
- Yeni sayfalar eklerken aynı tasarım dili korunmalıdır.
- Navbar ve sayfaların metinleri kolayca özelleştirilebilir.

## Sonuç

Bu proje, Next.js ile GSAP kullanarak modern, premium hisseden sayfa geçişleri gerçekleştiren küçük ama öğretici bir örnektir. Özellikle App Router ile custom client-side navigation etkileşimlerini öğrenmek isteyenler için değerli bir örnek niteliğindedir.

## Lisans

Bu proje örnek / demo amaçlıdır. Kullanım ve geliştirme için özel bir lisans zorunluluğu bulunmaz; ancak projenin işlevselliği ve tasarımı için gerekli düzenlemeler kullanıcı tarafından yapılabilir.
