import Back from '@/components/Back';
import Title from '@/components/Title';

import { alphabetical } from '@/lib/utils';

import { getList } from '@/lib/fetching';

import dynamic from 'next/dynamic';
import { Accordion } from '@/components/ui/accordion';

const ListItem = dynamic(() => import('@/components/item/ListItem'), { ssr: false });

export default async function Page({ params }) {
  const slug = params.slug;
  const { items, category } = await getList(slug);

  items.sort(alphabetical);

  return (
    <>
      <Back />
      <Title h1>{category.name}</Title>
      <Accordion type="single" collapsible>
        {items.map(item => {
          // const isTracking = tracking.includes(satchel.id);

          // return <ListItem key={item._id} {...item} />;
          return <ListItem {...item} key={item._id} vendor={category.vendor} />;
        })}
      </Accordion>
    </>
  );
}
