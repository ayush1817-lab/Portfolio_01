import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import type { Annotation } from "../content";
import { Pin } from "./Pin";

export type LightboxItem = {
  id: string;
  src: string;
  title: string;
  alt: string;
  caption: string;
  width?: number;
  height?: number;
  annotations?: Annotation[];
};

type Ctx = {
  register: (item: LightboxItem) => void;
  open: (id: string) => void;
};

const LightboxContext = createContext<Ctx | null>(null);

export function useLightbox() {
  const ctx = useContext(LightboxContext);
  if (!ctx) throw new Error("useLightbox must be used inside <LightboxProvider>");
  return ctx;
}

/**
 * Accessible full-size image viewer built on the native <dialog> element:
 * modal focus containment, Escape to close and focus returned to the trigger
 * come from the platform. Arrow keys step through figures in page order.
 */
export function LightboxProvider({ children }: { children: ReactNode }) {
  const items = useRef(new Map<string, LightboxItem>());
  const dialog = useRef<HTMLDialogElement>(null);
  const [order, setOrder] = useState<string[]>([]);
  const [current, setCurrent] = useState<string | null>(null);

  const register = useCallback((item: LightboxItem) => {
    items.current.set(item.id, item);
  }, []);

  const open = useCallback((id: string) => {
    // Page order = DOM order of the triggers, so prev/next follow the story.
    // Only sequence figures take part in prev/next; repeated crops open alone.
    const ids = Array.from(document.querySelectorAll<HTMLElement>("[data-lightbox-seq]"))
      .map((el) => el.dataset.lightboxId!)
      .filter((v, i, a) => a.indexOf(v) === i && items.current.has(v));
    setOrder(ids.includes(id) ? ids : [id]);
    setCurrent(id);
    const d = dialog.current;
    if (d && !d.open) d.showModal();
    document.documentElement.style.overflow = "hidden";
  }, []);

  const close = useCallback(() => {
    dialog.current?.close();
  }, []);

  const step = useCallback(
    (dir: 1 | -1) => {
      if (!current) return;
      const i = order.indexOf(current);
      const nextId = order[i + dir];
      if (nextId) setCurrent(nextId);
    },
    [current, order],
  );

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    const onClose = () => {
      setCurrent(null);
      document.documentElement.style.overflow = "";
    };
    d.addEventListener("close", onClose);
    return () => d.removeEventListener("close", onClose);
  }, []);

  const item = current ? items.current.get(current) : undefined;
  const index = current ? order.indexOf(current) : -1;

  return (
    <LightboxContext.Provider value={{ register, open }}>
      {children}
      <dialog
        ref={dialog}
        aria-labelledby="lightbox-title"
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") step(1);
          if (e.key === "ArrowLeft") step(-1);
        }}
        onClick={(e) => {
          // Clicking the backdrop (the dialog element itself) closes it.
          if (e.target === dialog.current) close();
        }}
        className="m-0 h-[100dvh] max-h-none w-screen max-w-none border-0 bg-ink p-0 text-paper backdrop:bg-transparent"
      >
        {item ? (
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-paper/70">
                {index + 1} / {order.length}
              </p>
              <button
                type="button"
                onClick={close}
                autoFocus
                className="grid h-11 w-11 place-items-center rounded-full border border-paper/25 text-paper transition-colors hover:bg-paper hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sun"
              >
                <X className="h-5 w-5" aria-hidden />
                <span className="sr-only">Close full-size image</span>
              </button>
            </div>

            <div className="relative flex min-h-0 flex-1 items-center justify-center px-3 sm:px-16">
              <img
                src={item.src}
                alt={item.alt}
                width={item.width}
                height={item.height}
                className="max-h-full w-auto max-w-full rounded-lg bg-paper object-contain shadow-2xl"
                style={{ imageRendering: "auto" }}
              />
              {order.length > 1 ? (
                <>
                  <button
                    type="button"
                    onClick={() => step(-1)}
                    disabled={index <= 0}
                    className="absolute left-2 top-1/2 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-paper/25 text-paper transition-colors hover:bg-paper hover:text-ink disabled:opacity-25 sm:grid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sun"
                  >
                    <ArrowLeft className="h-5 w-5" aria-hidden />
                    <span className="sr-only">Previous screenshot</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => step(1)}
                    disabled={index >= order.length - 1}
                    className="absolute right-2 top-1/2 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-paper/25 text-paper transition-colors hover:bg-paper hover:text-ink disabled:opacity-25 sm:grid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sun"
                  >
                    <ArrowRight className="h-5 w-5" aria-hidden />
                    <span className="sr-only">Next screenshot</span>
                  </button>
                </>
              ) : null}
            </div>

            <div className="mx-auto w-full max-w-3xl px-4 pb-5 pt-4 sm:px-6">
              <p
                id="lightbox-title"
                className="font-mono text-[11px] uppercase tracking-[0.18em] text-sun"
              >
                {item.title}
              </p>
              <p className="mt-1.5 text-[15px] leading-relaxed text-paper/90">{item.caption}</p>
              {item.annotations?.length ? (
                <ol className="mt-3 grid gap-2 sm:grid-cols-2">
                  {item.annotations.map((a) => (
                    <li key={a.n} className="flex gap-2.5 text-[13px] leading-snug text-paper/80">
                      <Pin n={a.n} size="sm" />
                      <span className="pt-0.5">{a.label}</span>
                    </li>
                  ))}
                </ol>
              ) : null}
              <div className="mt-4 flex justify-between gap-3 sm:hidden">
                <button
                  type="button"
                  onClick={() => step(-1)}
                  disabled={index <= 0}
                  className="flex-1 rounded-full border border-paper/25 py-2.5 text-sm disabled:opacity-25"
                >
                  Previous
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  disabled={index >= order.length - 1}
                  className="flex-1 rounded-full border border-paper/25 py-2.5 text-sm disabled:opacity-25"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </dialog>
    </LightboxContext.Provider>
  );
}
