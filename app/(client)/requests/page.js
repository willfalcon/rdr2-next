import Back from '@/components/Back';
import Title from '@/components/Title';
import { Accordion } from '@/components/ui/accordion';
import { getRequests } from '@/lib/fetching';
import { alphabetical } from '@/lib/utils';
import dynamic from 'next/dynamic';

const Item = dynamic(() => import('./Item'), { ssr: false });

export default async function Page() {
  const items = await getRequests();

  items.sort(alphabetical);
  return (
    <>
      <Back />
      <Title h1>Companion Item Requests</Title>

      <Accordion collapsible>
        {items.map(item => {
          return <Item key={item._id} {...item} />;
        })}
      </Accordion>
    </>
  );
}
