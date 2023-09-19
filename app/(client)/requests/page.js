import Back from '@/components/Back';
import Title from '@/components/Title';
import { getRequests } from '@/lib/fetching';
import dynamic from 'next/dynamic';

const Item = dynamic(() => import('./Item'), { ssr: false });

export default async function Page() {
  const items = await getRequests();

  return (
    <>
      <Back />
      <Title h1>Companion Item Requests</Title>

      <ul className="mb-3 mt-8">
        {items.map(item => {
          return <Item key={item._id} {...item} />;
        })}
      </ul>
    </>
  );
}
