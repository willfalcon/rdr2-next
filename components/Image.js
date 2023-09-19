import client from '@/lib/client';
import imageUrlBuilder from '@sanity/image-url';

const builder = imageUrlBuilder(client);
function urlFor(source) {
  return builder.image(source);
}

export default function Image({ image }) {
  return <img src={urlFor(image).url()} />;
}
