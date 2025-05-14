import { useRef, useEffect, useLayoutEffect } from "react";

export default function useScroll(
  data,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  offset,
  friendID,
) {
  const prevScrollHeight = useRef(0);
  const isInitialScrollDone = useRef(false);
  const scrollContainerRef = useRef(null);
  const chatBottomRef = useRef(null);
  useEffect(() => {
    console.log(scrollContainerRef, chatBottomRef, data);
    if (!scrollContainerRef.current || !chatBottomRef.current || !data) return;

    const shouldScroll = () => {
      // On initial load, always scroll
      if (!isInitialScrollDone.current) return true;

      // Otherwise only if near bottom
      const { scrollTop, scrollHeight, clientHeight } =
        scrollContainerRef.current;
      return scrollHeight - (scrollTop + clientHeight) < 100;
    };

    if (shouldScroll()) {
      chatBottomRef.current.scrollIntoView({
        behavior: "instant",
      });
      isInitialScrollDone.current = true;
    }
  }, [data]);
  useEffect(() => {
    if (!data || !scrollContainerRef.current || !chatBottomRef.current) return;

    // always scroll on first load; afterwards only if near bottom
    const { scrollTop, scrollHeight, clientHeight } =
      scrollContainerRef.current;
    const shouldScroll =
      !isInitialScrollDone.current ||
      scrollHeight - (scrollTop + clientHeight) < 100;

    if (shouldScroll) {
      // ensure layout is stamped before scrolling
      chatBottomRef.current.scrollIntoView({ behavior: "instant" });
      isInitialScrollDone.current = true;
    }
  }, [friendID]);

  // Handle pagination on scroll up
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const onScroll = (e) => {
      const { scrollTop, clientHeight } = e.target;
      // console.log(clientHeight * offset);
      if (
        scrollTop < clientHeight * offset &&
        hasNextPage &&
        !isFetchingNextPage
      ) {
        prevScrollHeight.current = container.scrollHeight;
        fetchNextPage();
      }
    };

    container.addEventListener("scroll", onScroll);
    return () => container.removeEventListener("scroll", onScroll);
  }, [hasNextPage, isFetchingNextPage, fetchNextPage, scrollContainerRef]);

  // Adjust scroll position after loading older messages
  useEffect(() => {
    if (!isFetchingNextPage && prevScrollHeight.current > 0) {
      const container = scrollContainerRef.current;
      if (container) {
        const newScrollHeight = container.scrollHeight;
        container.scrollTop = newScrollHeight - prevScrollHeight.current;
        prevScrollHeight.current = 0;
      }
    }
  }, [isFetchingNextPage, data]);

  return { chatBottomRef, scrollContainerRef };
}
