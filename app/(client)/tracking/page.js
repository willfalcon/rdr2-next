import Back from '@/components/Back';
import Title from '@/components/Title';

import ItemsList from './ItemsList';
import MaterialsList from './MaterialsList';

export default function Page() {
  return (
    <>
      <Back />
      <Title h1>Tracking</Title>

      <MaterialsList />

      <Title>Items</Title>

      <ItemsList />
    </>
  );
}
