"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type RefObject,
  type UIEventHandler,
} from "react";

const SCROLL_EDGE_THRESHOLD_PX = 2;

type UseScrollSnapCarouselOptions = {
  itemCount: number;
  axis?: "x";
};

type UseScrollSnapCarouselResult = {
  scrollerRef: RefObject<HTMLDivElement | null>;
  activeIndex: number;
  pageCount: number;
  scrollToIndex: (index: number) => void;
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
  hasOverflow: boolean;
  onScrollerScroll: UIEventHandler<HTMLDivElement>;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function prefersReducedMotion() {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getChildScrollLeft(scroller: HTMLElement, child: HTMLElement) {
  return (
    child.getBoundingClientRect().left -
    scroller.getBoundingClientRect().left +
    scroller.scrollLeft
  );
}

function getMaxScrollLeft(scroller: HTMLElement) {
  return Math.max(0, scroller.scrollWidth - scroller.clientWidth);
}

/**
 * Last page index that navigation (dots/arrows) can meaningfully target.
 * When only a fractional card peeks, the final page maps to maxScrollLeft
 * even if that child's snap start is not fully reachable.
 */
function getMaxScrollIndex(scroller: HTMLElement, itemCount: number) {
  const limit = Math.min(itemCount, scroller.children.length);
  if (limit <= 0) return 0;

  const maxScrollLeft = getMaxScrollLeft(scroller);
  if (maxScrollLeft <= SCROLL_EDGE_THRESHOLD_PX) return 0;

  let lastAligned = 0;
  for (let i = 0; i < limit; i += 1) {
    const child = scroller.children[i] as HTMLElement;
    const childLeft = getChildScrollLeft(scroller, child);
    if (childLeft <= maxScrollLeft + SCROLL_EDGE_THRESHOLD_PX) {
      lastAligned = i;
    } else {
      break;
    }
  }

  const alignedLeft = getChildScrollLeft(
    scroller,
    scroller.children[lastAligned] as HTMLElement
  );

  // Extra scroll remains past the last alignable card start (peek leftover).
  if (
    lastAligned < limit - 1 &&
    alignedLeft < maxScrollLeft - SCROLL_EDGE_THRESHOLD_PX
  ) {
    return lastAligned + 1;
  }

  return lastAligned;
}

function getClosestIndex(
  scroller: HTMLElement,
  itemCount: number,
  maxScrollIndex: number
) {
  const limit = Math.min(itemCount, scroller.children.length);
  if (limit <= 0) return 0;

  const scrollLeft = scroller.scrollLeft;
  const maxScrollLeft = getMaxScrollLeft(scroller);

  // At the end of a peek layout, prefer the last navigable page.
  if (
    maxScrollIndex > 0 &&
    scrollLeft >= maxScrollLeft - SCROLL_EDGE_THRESHOLD_PX
  ) {
    return maxScrollIndex;
  }

  let closest = 0;
  let minDist = Number.POSITIVE_INFINITY;
  const pageLimit = Math.min(limit, maxScrollIndex + 1);

  for (let i = 0; i < pageLimit; i += 1) {
    const child = scroller.children[i] as HTMLElement;
    const childLeft = getChildScrollLeft(scroller, child);
    const targetLeft = Math.min(childLeft, maxScrollLeft);
    // Slight start bias keeps peek layouts from flickering mid-scroll.
    const dist = Math.abs(targetLeft - scrollLeft - 1);
    if (dist < minDist) {
      minDist = dist;
      closest = i;
    }
  }

  return closest;
}

function getScrollMetrics(scroller: HTMLElement, itemCount: number) {
  const { scrollLeft } = scroller;
  const maxScrollLeft = getMaxScrollLeft(scroller);
  const hasOverflow = maxScrollLeft > SCROLL_EDGE_THRESHOLD_PX;
  const maxScrollIndex = getMaxScrollIndex(scroller, itemCount);

  return {
    hasOverflow,
    maxScrollIndex,
    pageCount: maxScrollIndex + 1,
    canScrollPrev: hasOverflow && scrollLeft > SCROLL_EDGE_THRESHOLD_PX,
    canScrollNext:
      hasOverflow && scrollLeft < maxScrollLeft - SCROLL_EDGE_THRESHOLD_PX,
  };
}

export function useScrollSnapCarousel({
  itemCount,
  axis = "x",
}: UseScrollSnapCarouselOptions): UseScrollSnapCarouselResult {
  void axis;

  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const targetIndexRef = useRef(0);
  const maxScrollIndexRef = useRef(0);
  const isProgrammaticRef = useRef(false);
  const scrollRafRef = useRef<number | null>(null);
  const settleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [pageCount, setPageCount] = useState(1);
  const [hasOverflow, setHasOverflow] = useState(false);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const syncScrollMetrics = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const metrics = getScrollMetrics(scroller, itemCount);
    maxScrollIndexRef.current = metrics.maxScrollIndex;

    setHasOverflow((prev) =>
      prev === metrics.hasOverflow ? prev : metrics.hasOverflow
    );
    setPageCount((prev) =>
      prev === metrics.pageCount ? prev : metrics.pageCount
    );
    setCanScrollPrev((prev) =>
      prev === metrics.canScrollPrev ? prev : metrics.canScrollPrev
    );
    setCanScrollNext((prev) =>
      prev === metrics.canScrollNext ? prev : metrics.canScrollNext
    );

    if (targetIndexRef.current > metrics.maxScrollIndex) {
      targetIndexRef.current = metrics.maxScrollIndex;
      setActiveIndex(metrics.maxScrollIndex);
    }
  }, [itemCount]);

  const clearSettleTimer = useCallback(() => {
    if (settleTimerRef.current !== null) {
      clearTimeout(settleTimerRef.current);
      settleTimerRef.current = null;
    }
  }, []);

  const syncIndexFromScroll = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller || itemCount <= 0) return;

    const maxScrollIndex = maxScrollIndexRef.current;
    const nextIndex = getClosestIndex(scroller, itemCount, maxScrollIndex);
    targetIndexRef.current = nextIndex;
    setActiveIndex((prev) => (prev === nextIndex ? prev : nextIndex));
    syncScrollMetrics();
  }, [itemCount, syncScrollMetrics]);

  const markProgrammaticSettled = useCallback(() => {
    isProgrammaticRef.current = false;
    syncIndexFromScroll();
  }, [syncIndexFromScroll]);

  const scheduleSettle = useCallback(() => {
    clearSettleTimer();
    settleTimerRef.current = setTimeout(() => {
      markProgrammaticSettled();
    }, 140);
  }, [clearSettleTimer, markProgrammaticSettled]);

  const scrollToIndex = useCallback(
    (index: number) => {
      const scroller = scrollerRef.current;
      if (!scroller || itemCount <= 0) return;

      syncScrollMetrics();
      const maxScrollIndex = maxScrollIndexRef.current;
      const nextIndex = clamp(index, 0, maxScrollIndex);
      targetIndexRef.current = nextIndex;
      setActiveIndex(nextIndex);

      const child = scroller.children[nextIndex] as HTMLElement | undefined;
      if (!child) return;

      const maxScrollLeft = getMaxScrollLeft(scroller);
      const left = Math.min(getChildScrollLeft(scroller, child), maxScrollLeft);

      isProgrammaticRef.current = true;
      const behavior = prefersReducedMotion() ? "auto" : "smooth";
      scroller.scrollTo({ left, behavior });

      if (behavior === "auto") {
        markProgrammaticSettled();
        return;
      }

      scheduleSettle();
    },
    [itemCount, markProgrammaticSettled, scheduleSettle, syncScrollMetrics]
  );

  const scrollPrev = useCallback(() => {
    scrollToIndex(targetIndexRef.current - 1);
  }, [scrollToIndex]);

  const scrollNext = useCallback(() => {
    scrollToIndex(targetIndexRef.current + 1);
  }, [scrollToIndex]);

  const onScrollerScroll = useCallback<UIEventHandler<HTMLDivElement>>(() => {
    if (scrollRafRef.current !== null) return;

    scrollRafRef.current = window.requestAnimationFrame(() => {
      scrollRafRef.current = null;
      syncScrollMetrics();

      if (isProgrammaticRef.current) {
        scheduleSettle();
        return;
      }

      syncIndexFromScroll();
    });
  }, [scheduleSettle, syncIndexFromScroll, syncScrollMetrics]);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const onScrollEnd = () => {
      clearSettleTimer();
      markProgrammaticSettled();
    };

    scroller.addEventListener("scrollend", onScrollEnd);

    const resizeObserver = new ResizeObserver(() => {
      syncScrollMetrics();
      const current = clamp(
        targetIndexRef.current,
        0,
        maxScrollIndexRef.current
      );
      targetIndexRef.current = current;
      setActiveIndex(current);

      const child = scroller.children[current] as HTMLElement | undefined;
      if (child) {
        const maxScrollLeft = getMaxScrollLeft(scroller);
        const left = Math.min(
          getChildScrollLeft(scroller, child),
          maxScrollLeft
        );
        scroller.scrollTo({ left, behavior: "auto" });
      }

      syncScrollMetrics();
    });

    resizeObserver.observe(scroller);
    for (const child of Array.from(scroller.children)) {
      resizeObserver.observe(child);
    }
    syncScrollMetrics();

    return () => {
      scroller.removeEventListener("scrollend", onScrollEnd);
      resizeObserver.disconnect();
      clearSettleTimer();
      if (scrollRafRef.current !== null) {
        window.cancelAnimationFrame(scrollRafRef.current);
      }
    };
  }, [clearSettleTimer, itemCount, markProgrammaticSettled, syncScrollMetrics]);

  useEffect(() => {
    syncScrollMetrics();
  }, [itemCount, syncScrollMetrics]);

  return {
    scrollerRef,
    activeIndex,
    pageCount,
    scrollToIndex,
    scrollPrev,
    scrollNext,
    canScrollPrev,
    canScrollNext,
    hasOverflow,
    onScrollerScroll,
  };
}
