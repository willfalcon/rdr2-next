import client from '@/lib/client';
import imageUrlBuilder from '@sanity/image-url';
import Image from 'next/image';

const builder = imageUrlBuilder(client);
function urlFor(source) {
  return builder.image(source);
}

export default function ImageComponent({ image, alt }) {
  if (!image) {
    return null;
  }
  const src = urlFor(image).url();
  return (
    <Image
      src={src}
      width={image.asset.metadata.dimensions.width}
      height={image.asset.metadata.dimensions.height}
      placeholder="blur"
      blurDataURL={image.asset.metadata.lqip}
      alt={alt}
    />
  );
}
