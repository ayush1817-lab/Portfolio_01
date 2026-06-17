import { useEffect, useRef } from "react";

/**
 * Adds click-and-drag scrolling to an overflow-x container.
 * Also lets vertical wheel events translate into horizontal scroll
 * while the cursor is over the shelf.
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
      // ignore drags that begin on interactive elements
      const target = e.target as HTMLElement;
      if (target.closest("a, button")) return;
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
        // swallow the click that follows a drag
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