import React, { useEffect, useRef, useContext } from 'react';
import LazyLoadContext from './context';
import LazyLoadImageContainer from './container';

interface LazyLoadImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  loadingClassName?: string;
  mainImgClassName?: string;
  mainImgOnLoad?: ((event: React.SyntheticEvent<HTMLImageElement, Event>) => void) | undefined;
  placeholderClassName?: string;
  placeholderOnLoad?: ((event: React.SyntheticEvent<HTMLImageElement, Event>) => void) | undefined;
  placeholderSrc?: string;
  placeholderSrcSet?: string;
}

const LazyLoadImage: React.FC<LazyLoadImageProps> = React.memo(
  ({
    src = '',
    srcSet = '',
    className = '',
    mainImgClassName = '',
    mainImgOnLoad = null,
    placeholderSrc = '',
    placeholderSrcSet = '',
    placeholderClassName = '',
    placeholderOnLoad = null,
    loadingClassName = '',
    onLoad = null,
    ...props
  }) => {
    const container = useContext(LazyLoadContext) || document;

    const imgRef = useRef<HTMLImageElement>(null);
    const observerRef = useRef<IntersectionObserver>();
    const activeRef = useRef<boolean>(false);

    const handleImgLoad = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
      const isMainImg =
        // @ts-ignore
        (src && event.target.src === src) || (srcSet && event.target.srcset === srcSet);

      if (isMainImg) {
        imgRef.current!.className = `${className} ${mainImgClassName}`;

        if (mainImgOnLoad) {
          mainImgOnLoad(event);
        }
      } else if (placeholderOnLoad) {
        placeholderOnLoad(event);
      }

      if (onLoad) {
        onLoad(event);
      }
    };

    const loadMainImg = () => {
      if (imgRef.current!.src !== src || imgRef.current!.srcset !== srcSet) {
        imgRef.current!.className = `${className} ${mainImgClassName} ${loadingClassName}`;
        imgRef.current!.src = src;
        imgRef.current!.srcset = srcSet;
      }
    };

    const lazyLoad = (entries: any) => {
      if (observerRef.current) {
        entries.forEach((entry: any) => {
          if (entry.isIntersecting) {
            loadMainImg();
            observerRef.current!.unobserve(imgRef.current!);
          }
        });
      } else if (!activeRef.current) {
        activeRef.current = true;

        setTimeout(() => {
          if (
            imgRef.current!.getBoundingClientRect().top <= window.innerHeight &&
            imgRef.current!.getBoundingClientRect().bottom >= 0 &&
            getComputedStyle(imgRef.current!).display !== 'none'
          ) {
            container.removeEventListener('scroll', lazyLoad);
            window.removeEventListener('resize', lazyLoad);
            window.removeEventListener('orientationchange', lazyLoad);

            loadMainImg();
          }

          activeRef.current = false;
        }, 200);
      }
    };

    const reset = () => {
      activeRef.current = false;

      if (observerRef.current && imgRef.current) {
        observerRef.current.unobserve(imgRef.current);
      }

      container.removeEventListener('scroll', lazyLoad);
      window.removeEventListener('resize', lazyLoad);
      window.removeEventListener('orientationchange', lazyLoad);
    };

    const init = () => {
      if ('IntersectionObserver' in window) {
        observerRef.current = new IntersectionObserver(lazyLoad);
        observerRef.current.observe(imgRef.current!);
      } else if (
        imgRef.current!.getBoundingClientRect().top <= window.innerHeight &&
        imgRef.current!.getBoundingClientRect().bottom >= 0 &&
        getComputedStyle(imgRef.current!).display !== 'none'
      ) {
        loadMainImg();
      } else {
        container.addEventListener('scroll', lazyLoad);
        window.addEventListener('resize', lazyLoad);
        window.addEventListener('orientationchange', lazyLoad);
      }
    };

    useEffect(() => {
      init();
      return reset;
    }, [src, srcSet, container, init]);

    return (
      <img
        {...props}
        src={placeholderSrc}
        srcSet={placeholderSrcSet}
        className={`${className} ${placeholderClassName}`}
        onLoad={handleImgLoad}
        ref={imgRef}
      />
    );
  },
);

export default LazyLoadImage;
export { LazyLoadImageContainer, LazyLoadContext };
