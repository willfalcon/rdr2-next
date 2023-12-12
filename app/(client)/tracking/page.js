import Back from '@/components/Back';
import Title from '@/components/Title';

import ItemsList from './ItemsList';
import MaterialsList from './MaterialsList';

import SectionSkeleton from './SectionSkeleton';
import { Suspense } from 'react';

export default function Page(props) {
  return (
    <>
      <Suspense fallback={<SectionSkeleton />}>
        <MaterialsList />
      </Suspense>

      <Title>Items</Title>

      <ItemsList />
    </>
  );
}
