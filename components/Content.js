import { PortableText } from '@portabletext/react';
import { ConfigResolutionError } from 'sanity';
import Image from 'next/image';
import { useWindowSize } from '@uidotdev/usehooks';

export default function Content({ children }) {
  const size = useWindowSize();

  return (
    <div className="block-content">
      <PortableText
        value={children}
        components={{
          list: {
            bullet: ({ children }) => <ul className="list-disc pl-4">{children}</ul>,
            number: ({ children }) => <ol className="list-decimal">{children}</ol>,
          },

          types: {
            image: ({ value: { asset } }) => {
              if (!size.width) return null;

              const width = size.width;
              const aspect = asset.metadata.dimensions.aspectRatio;
              // w / h = a
              const height = Math.round(aspect / width);
              return (
                <Image
                  className="my-3"
                  src={asset.url}
                  width={size.width}
                  height={height}
                  placeholder="blur"
                  blurDataURL={asset.metadata.lqip}
                  alt=""
                />
              );
            },
          },

          marks: {
            link: ({ children, value }) => {
              const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined;
              return (
                <a href={value.href} rel={rel}>
                  {children}
                </a>
              );
            },
          },
        }}
      />
    </div>
  );
}
