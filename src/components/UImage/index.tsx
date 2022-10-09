import React, { useState } from 'react';
// @ts-ignore
import { useNetworkStatus } from 'react-adaptive-hooks/network';
import LazyLoadImage from '@/components/LazyLoadImage';
import { ossImageProcess } from '@/utils/imageProcess';
import defaultImage from '@/assets/default.png';
import styles from './index.less';

const defaultResizeEnums: any = {
  'slow-2g': ['w_100'],
  '2g': ['w_150'],
  '3g': ['w_300'],
  '4g': ['w_500'],
};
const getDefaultResize = (effectiveConnectionType: string, unsupported: boolean) => {
  const defaultResize = ['w_500'];
  if (unsupported) {
    return defaultResize;
  }
  return defaultResizeEnums[effectiveConnectionType] || defaultResize;
};

interface UImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  // 特殊Props
  // 宽高比，同原CoverImage用法
  heightRatio?: number;
  // oss resize数组
  ossResize?: string[];
  // 加载中cls
  loadingClassName?: string;
  // src 加载完成时的 cls
  mainImgClassName?: string;
  // src加载完成时触发
  mainImgOnLoad?: (event: React.SyntheticEvent) => void;
  // 图片未加载完成显示的cls
  placeholderClassName?: string;
  // palceholderSrc加载完成时触发
  placeholderOnLoad?: (event: React.SyntheticEvent) => void;
  // 图片未加载完成显示的图片
  placeholderSrc?: string;
  placeholderSrcSet?: string;
}

const UImage: React.FC<UImageProps> = ({
  onError,
  onClick,
  src,
  ossResize,
  heightRatio,
  placeholderSrc = defaultImage,
  ...otherProps
}) => {
  const [isError, handleIsError] = useState<boolean>(false);
  const { effectiveConnectionType, unsupported } = useNetworkStatus();

  const getUrl = (url: string | undefined, error: boolean) => {
    if (error || !url) {
      return placeholderSrc;
    }
    if (url && url.includes('http') && url.includes('x-oss-process') === false) {
      // 网络图片
      if (url.includes('.svg')) {
        return url;
      }
      return ossImageProcess(url, {
        resize: ossResize || getDefaultResize(effectiveConnectionType, unsupported),
      });
    }
    return url;
  };

  const handleImageError = () => {
    handleIsError(true);
  };
  return heightRatio ? (
    <div
      className={styles.ratioImage}
      style={{
        paddingTop: `${heightRatio}%`,
      }}
    >
      <LazyLoadImage
        onClick={onClick}
        src={getUrl(src, isError)}
        onError={handleImageError}
        placeholderSrc={placeholderSrc}
        {...otherProps}
      />
    </div>
  ) : (
    <LazyLoadImage
      className={styles.img}
      onClick={onClick}
      src={getUrl(src, isError)}
      onError={handleImageError}
      placeholderSrc={placeholderSrc}
      {...otherProps}
    />
  );
};

export default React.memo(UImage);
