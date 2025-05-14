import { useRef, useEffect } from "react";

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
  const isInitialScrollDone = useRef(false);

  useEffect(() => {
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
