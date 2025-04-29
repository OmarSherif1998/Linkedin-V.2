import React, { useEffect } from "react";

function Test() {
  useEffect(() => {
    let isFetching = false;
    const onScroll = (e) => {
      const { scrollTop, scrollHeight, clientHeight } =
        e.target.scrollingElement;
      if (!isFetching && scrollHeight - scrollTop <= clientHeight * 1.5) {
        isFetching = true;
        console.log("hello");
        isFetching = false;
      }
    };

    document.addEventListener("scroll", onScroll);
    return () => {
      document.removeEventListener("scroll", onScroll);
    };
  }, []);

  return <div className="h-[120vh]">Test</div>;
}

export default Test;
