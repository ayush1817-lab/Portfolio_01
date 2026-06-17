import { useEffect, useRef } from "react";

/**
 * Adds click-and-drag scrolling to an overflow-x container.
 * Also lets vertical wheel events translate into horizontal scroll
 * while the cursor is over the shelf.
 *
 * Mouse / pen: drag anywhere on the shelf (including cards) to scroll.
 * Touch: left untouched so native swipe scrolling stays smooth.
 */
export function useDragScroll<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let isDown = false;
    let startX = 0;
    let startScroll = 0;
    let moved = false;

    const onPointerDown = (e: PointerEvent) => {
      // leave touch to the browser's native swipe
      if (e.pointerType === "touch") return;

      isDown = true;
      moved = false;
      startX = e.clientX;
      startScroll = el.scrollLeft;
      el.setPointerCapture(e.pointerId);
      el.classList.add("is-dragging");
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDown) return;
      const dx = e.clientX - startX;
      if (Math.abs(dx) > 4) moved = true;
      el.scrollLeft = startScroll - dx;
    };

    const onPointerUp = (e: PointerEvent) => {
      isDown = false;
      el.classList.remove("is-dragging");
      try {
        el.releasePointerCapture(e.pointerId);
      } catch {
        /* noop */
      }
      if (moved) {
        // swallow the click that follows a drag so cards stay clickable on tap
        const swallow = (ev: MouseEvent) => {
          ev.preventDefault();
          ev.stopPropagation();
          el.removeEventListener("click", swallow, true);
        };
        el.addEventListener("click", swallow, true);
      }
    };

    const onWheel = (e: WheelEvent) => {
      // translate dominant vertical wheel to horizontal
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        el.scrollLeft += e.deltaY;
        e.preventDefault();
      }
    };

    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("pointermove", onPointerMove);
    el.addEventListener("pointerup", onPointerUp);
    el.addEventListener("pointercancel", onPointerUp);
    el.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerup", onPointerUp);
      el.removeEventListener("pointercancel", onPointerUp);
      el.removeEventListener("wheel", onWheel);
    };
  }, []);

  const scrollBy = (delta: number) => {
    ref.current?.scrollBy({ left: delta, behavior: "smooth" });
  };

  return { ref, scrollBy };
}
