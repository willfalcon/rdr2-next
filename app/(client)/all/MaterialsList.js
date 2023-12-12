'use client';

import dynamic from 'next/dynamic';
import { Accordion } from '@/components/ui/accordion';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Material = dynamic(() => import('../tracking/Material'), { ssr: false });

export default function MaterialsList({ materials }) {
  return (
    <Tabs defaultValue="manage" className="ml-4">
      <TabsList>
        <TabsTrigger value="manage">Manage</TabsTrigger>
        <TabsTrigger value="weapons">Weapons</TabsTrigger>
      </TabsList>
      <Accordion type="single" collapsible>
        {materials.map(material => {
          return <Material key={material.id} {...material} />;
        })}
      </Accordion>
    </Tabs>
  );
}
