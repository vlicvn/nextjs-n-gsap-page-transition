"use client";

import { useCallback, useEffect, useLayoutEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import gsap from "gsap";

const BLOCK_COUNT = 5;
const OVERLAP = 8;

export default function PageTransition() {
  const router = useRouter();
  const pathname = usePathname();

  const containerRef = useRef<HTMLDivElement>(null);
  const loadingRef = useRef<HTMLDivElement>(null);

  const isTransitioning = useRef(false);
  const isFirstLoad = useRef(true);

  /**
   * =====================================================
   * ELEMENTS
   * =====================================================
   */

  const getElements = useCallback(() => {
    const container = containerRef.current;

    if (!container) return null;

    const row1 = container.querySelectorAll<HTMLElement>(".row-1 .block");

    const row2 = container.querySelectorAll<HTMLElement>(".row-2 .block");

    const blocks = [...row1, ...row2];

    return {
      container,
      row1,
      row2,
      blocks,
    };
  }, []);

  /**
   * =====================================================
   * LOADING SHOW
   * =====================================================
   */

  const showLoading = useCallback(() => {
    const loading = loadingRef.current;

    if (!loading) return;

    gsap.set(loading, {
      autoAlpha: 1,
      y: 0,
    });
  }, []);

  /**
   * =====================================================
   * LOADING HIDE
   *
   * İlk blok açılmaya başladığı anda çalışır.
   * =====================================================
   */

  const hideLoading = useCallback(() => {
    const loading = loadingRef.current;

    if (!loading) return;

    gsap.to(loading, {
      autoAlpha: 0,
      y: -10,
      duration: 0.2,
      ease: "power2.out",
      overwrite: true,
    });
  }, []);

  /**
   * =====================================================
   * REVEAL
   *
   * Yeni sayfa geldikten sonra bloklar açılır.
   * =====================================================
   */

  const revealTransition = useCallback(() => {
    const elements = getElements();

    if (!elements) return;

    const { container, row1, row2 } = elements;

    gsap.killTweensOf([row1, row2]);

    /**
     * Container görünür
     */
    gsap.set(container, {
      autoAlpha: 1,
    });

    /**
     * Üst bloklar
     */
    gsap.set(row1, {
      scaleY: 1,
      transformOrigin: "top center",
    });

    /**
     * Alt bloklar
     */
    gsap.set(row2, {
      scaleY: 1,
      transformOrigin: "bottom center",
    });

    /**
     * Loading zaten görünür.
     *
     * İlk blok hareket etmeye başladığı anda
     * loading'i kaldırıyoruz.
     */
    hideLoading();

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set(container, {
          autoAlpha: 0,
        });
      },
    });

    /**
     * TOP
     */
    tl.to(
      row1,
      {
        scaleY: 0,

        duration: 0.9,

        stagger: {
          each: 0.1,
          from: "start",
          grid: [1, BLOCK_COUNT],
          axis: "x",
        },

        ease: "expo.inOut",
      },
      0,
    );

    /**
     * BOTTOM
     */
    tl.to(
      row2,
      {
        scaleY: 0,

        duration: 0.9,

        stagger: {
          each: 0.1,
          from: "start",
          grid: [1, BLOCK_COUNT],
          axis: "x",
        },

        ease: "expo.inOut",
      },
      0,
    );

    return tl;
  }, [getElements, hideLoading]);

  /**
   * =====================================================
   * ENTER TRANSITION
   *
   * Link'e basıldığında:
   *
   * LOADING hemen görünür
   * ↓
   * bloklar kapanır
   * ↓
   * ekran tamamen kapanır
   * ↓
   * router.push()
   * =====================================================
   */

  const animateTransition = useCallback(
    (href: string) => {
      const elements = getElements();

      if (!elements) return;

      const { container, row1, row2 } = elements;

      if (isTransitioning.current) return;

      isTransitioning.current = true;

      gsap.killTweensOf([row1, row2]);

      /**
       * Container görünür
       */
      gsap.set(container, {
        autoAlpha: 1,
      });

      /**
       * Loading başlangıçta kesinlikle gizli.
       */
      gsap.set(loadingRef.current, {
        autoAlpha: 0,
        y: 0,
      });

      /**
       * Başlangıç state
       */
      gsap.set(row1, {
        scaleY: 0,
        transformOrigin: "top center",
      });

      gsap.set(row2, {
        scaleY: 0,
        transformOrigin: "bottom center",
      });

      /**
       * TEK timeline
       *
       * Böylece iki row'un da tamamen
       * kapanmasını bekleyebiliyoruz.
       */
      const tl = gsap.timeline({
        onComplete: () => {
          /**
           * BURADA:
           *
           * - bütün block'lar tamamen kapandı
           * - ekran tamamen beyaz
           *
           * Şimdi loading göster.
           */
          showLoading();

          /**
           * Loading'in browser tarafından
           * render edilmesine fırsat ver.
           *
           * Sonra yeni route'a geç.
           */
          requestAnimationFrame(() => {
            router.push(href);
          });
        },
      });

      /**
       * TOP
       */
      tl.to(
        row1,
        {
          scaleY: 1,

          duration: 0.9,

          stagger: {
            each: 0.1,
            from: "end",
            grid: [1, BLOCK_COUNT],
            axis: "x",
          },

          ease: "expo.out",
        },
        0,
      );

      /**
       * BOTTOM
       */
      tl.to(
        row2,
        {
          scaleY: 1,

          duration: 0.9,

          stagger: {
            each: 0.1,
            from: "end",
            grid: [1, BLOCK_COUNT],
            axis: "x",
          },

          ease: "expo.out",
        },
        0,
      );
    },
    [getElements, router, showLoading],
  );

  /**
   * =====================================================
   * INITIAL LOAD
   * =====================================================
   */

  useLayoutEffect(() => {
    if (!isFirstLoad.current) return;

    isFirstLoad.current = false;

    const elements = getElements();

    if (!elements) return;

    const { container, blocks } = elements;

    /**
     * İlk açılışta loading göster.
     */
    gsap.set(container, {
      autoAlpha: 1,
    });

    gsap.set(blocks, {
      scaleY: 1,
    });

    showLoading();

    /**
     * Sayfa zaten hazır.
     *
     * Loading hemen kaybolur ve
     * reveal başlar.
     */
    revealTransition();
  }, [getElements, revealTransition, showLoading]);

  /**
   * =====================================================
   * ROUTE CHANGE
   * =====================================================
   */

  useEffect(() => {
    if (isFirstLoad.current) return;

    if (!isTransitioning.current) return;

    /**
     * Burada loading göstermiyoruz.
     *
     * Çünkü animateTransition() sırasında
     * zaten gösterildi.
     *
     * Böylece loading gecikmiyor.
     */
    revealTransition();

    isTransitioning.current = false;
  }, [pathname, revealTransition]);

  /**
   * =====================================================
   * LINK INTERCEPTION
   * =====================================================
   */

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      const link = target.closest("a");

      if (!link) return;

      const href = link.getAttribute("href");

      if (!href) return;

      /**
       * Cmd / Ctrl / Shift / Alt
       */
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }

      /**
       * Hash
       */
      if (href.startsWith("#")) return;

      /**
       * External
       */
      if (
        href.startsWith("http://") ||
        href.startsWith("https://") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:")
      ) {
        return;
      }

      /**
       * Aynı sayfa
       */
      if (href === pathname) return;

      /**
       * Animasyon devam ediyorsa
       */
      if (isTransitioning.current) {
        event.preventDefault();
        event.stopPropagation();

        return;
      }

      /**
       * Next.js navigation'ı engelle
       */
      event.preventDefault();
      event.stopPropagation();

      /**
       * Transition başlat
       */
      animateTransition(href);
    };

    document.addEventListener("click", handleClick, true);

    return () => {
      document.removeEventListener("click", handleClick, true);
    };
  }, [pathname, animateTransition]);

  /**
   * =====================================================
   * RENDER
   * =====================================================
   */

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="
        pointer-events-none
        fixed
        inset-0
        z-9999
        h-dvh
        min-h-svh
        w-full
        overflow-hidden
        bg-transparent
        opacity-0
      "
    >
      {/* =================================================
          LOADING
          ================================================= */}

      <div
        ref={loadingRef}
        className="
          pointer-events-none
          absolute
          inset-0
          z-20
          flex
          items-center
          justify-center
          opacity-0
        "
      >
        <span
          className="
            font-mono
            text-[clamp(0.65rem,1vw,1rem)]
            font-medium
            uppercase
            tracking-[0.25em]
            text-black
          "
        >
          Loading...
        </span>
      </div>

      {/* =================================================
          TOP
          ================================================= */}

      <div
        className="
          row-1
          absolute
          inset-x-0
          top-0
          h-1/2
        "
      >
        {Array.from({
          length: BLOCK_COUNT,
        }).map((_, index) => (
          <div
            key={`row-1-${index}`}
            className="
              block
              absolute
              top-0
              h-full
              origin-top
              bg-white
              will-change-transform
              transform-gpu
            "
            style={{
              left: `calc(${index * 20}% - ${OVERLAP / 2}px)`,

              width: `calc(20% + ${OVERLAP}px)`,

              height: `calc(100% + ${OVERLAP}px)`,
            }}
          />
        ))}
      </div>

      {/* =================================================
          BOTTOM
          ================================================= */}

      <div
        className="
          row-2
          absolute
          inset-x-0
          bottom-0
          h-1/2
        "
      >
        {Array.from({
          length: BLOCK_COUNT,
        }).map((_, index) => (
          <div
            key={`row-2-${index}`}
            className="
              block
              absolute
              bottom-0
              h-full
              origin-bottom
              bg-white
              will-change-transform
              transform-gpu
            "
            style={{
              left: `calc(${index * 20}% - ${OVERLAP / 2}px)`,

              width: `calc(20% + ${OVERLAP}px)`,

              height: `calc(100% + ${OVERLAP}px)`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
