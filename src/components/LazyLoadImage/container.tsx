import React, { useRef, useEffect, useState } from 'react';
import LazyLoadContext from './context';

interface LazyLoadImageContainerProps extends React.HTMLAttributes<HTMLDivElement> {}

const LazyLoadImageContainer = React.forwardRef<HTMLDivElement, LazyLoadImageContainerProps>(
  ({ children, ...otherProps }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [containerDom, setContainerDom] = useState<HTMLDivElement | null>(null);

    useEffect(() => {
      setContainerDom(containerRef.current);

      if (typeof ref === 'function') {
        ref(containerRef.current);
      } else if (ref != null) {
        // eslint-disable-next-line
        ref.current = containerRef.current;
      }
    }, []);

    return (
      <div {...otherProps} ref={containerRef}>
        {containerDom && (
          <LazyLoadContext.Provider value={containerDom}>{children}</LazyLoadContext.Provider>
        )}
      </div>
    );
  },
);

export default React.memo(LazyLoadImageContainer);
