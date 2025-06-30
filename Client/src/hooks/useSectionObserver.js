import React, { useEffect, useRef, useState } from 'react';

function useSectionObserver(sectionIds = [], options = { threshold: 1 }) {
  const [currentSection, setCurrentSection] = useState(null);

  // Create a ref for each section ID
  const sectionRefs = useRef({});
  sectionIds.forEach((id) => {
    if (!sectionRefs.current[id]) {
      sectionRefs.current[id] = React.createRef();
    }
  });

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const visibleId = Object.entries(sectionRefs.current).find(
            ([, ref]) => ref.current === entry.target,
          )?.[0];
          if (visibleId) setCurrentSection(visibleId);
        }
      });
    }, options);

    // Observe all available refs
    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => {
      Object.values(sectionRefs.current).forEach((ref) => {
        if (ref.current) observer.unobserve(ref.current);
      });
    };
  }, [sectionIds, options.threshold]);

  const scrollToSection = (id) => {
    const ref = sectionRefs.current[id];
    if (ref?.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return {
    currentSection,
    sectionRefs: sectionRefs.current,
    scrollToSection,
  };
}

export default useSectionObserver;
