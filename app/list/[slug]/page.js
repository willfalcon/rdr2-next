import classNames from 'classnames';
import Back from '@/components/Back';
import Title from '@/components/Title';
import client from '@/lib/client';
import { alphabetical } from '@/lib/utils';
import { useSelector } from 'react-redux';
import { AiFillCaretRight } from 'react-icons/ai';
import ListItem from '@/components/ListItem';

async function getList(slug) {
  const { items, category } = await client.fetch(
    `{
      "items": *[_type == "item" && $slug in categories[]->slug.current] {
      _id,
      name,
      materials[] {
        material-> {
          _id,
          name,
          "type": type->name,
        },
        quantity
      }
    },
      "category": *[_type == "category" && slug.current == $slug][0] {
        _id,
        name
      }
    }`,
    { slug }
  );

  return { items, category };
}
export default async function Page({ params }) {
  const slug = params.slug;
  const { items, category } = await getList(slug);

  items.sort(alphabetical);

  return (
    <>
      <Back />
      <Title h1>{category.name}</Title>
      {items.map(item => {
        // const isTracking = tracking.includes(satchel.id);

        // return <ListItem key={item._id} {...item} />;
        return <ListItem {...item} key={item._id} />;
      })}
    </>
  );
}
