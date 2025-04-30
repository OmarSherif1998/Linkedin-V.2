import { useRef, useLayoutEffect, useEffect } from "react";

export default function useChatScroll(
  data,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  offset,
  scrollContainerRef,
  chatBottomRef,
) {
  const prevScrollHeight = useRef(0);
  const isInitialLoad = useRef(true); // Track initial load

  useEffect(() => {
    if (!scrollContainerRef.current || !chatBottomRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } =
      scrollContainerRef.current;
    const threshold = 50;
    console.log(scrollTop, scrollHeight, clientHeight);
    if (scrollHeight - (scrollTop + clientHeight) < threshold) {
      chatBottomRef.current.scrollIntoView({ behavior: "instant" });
    }
  }, [scrollContainerRef, chatBottomRef]);

  // Auto-scroll to bottom whena chat is opened
  useLayoutEffect(() => {
    if (isInitialLoad.current && chatBottomRef.current && data) {
      chatBottomRef.current.scrollIntoView({ behavior: "instant" });
      isInitialLoad.current = false; // Mark as done
    }
  }, [scrollContainerRef, chatBottomRef, data]);

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
