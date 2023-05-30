import { useRef, useEffect, useState } from "react";
import type {ImgHTMLAttributes} from 'react'

type LazyImageProps = { image: string };

type ImageNative = ImgHTMLAttributes<HTMLImageElement>;

type Props = LazyImageProps & ImageNative;

export const LazyImage = ({ image,...imgProps}: Props): JSX.Element => {
  const node = useRef<HTMLImageElement>(null);
  const [src, setSrc] = useState(
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4="
  );
  useEffect(() => {
    //nuevo observador
    const observer = new window.IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        // on intersection -> console.log
        if (entry.isIntersecting) {
          setSrc(image);
        }
      });
    });
    //oberve.node
    if (node.current) {
      observer.observe(node.current);
    }
    //desconectar
    return () => {
      observer.disconnect();
    };
  }, [image]);

  return (
    <img
      ref={node}
      width="320"
      height="auto"
      src={src}
      className="mx-auto rounded-md bg-gray-300"
      {...imgProps}
    />
  );
};
