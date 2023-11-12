'use client';

import { useState } from 'react';
import classNames from 'classnames';
import dynamic from 'next/dynamic';
import { Accordion } from '@/components/ui/accordion';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Material = dynamic(() => import('../tracking/Material'), { ssr: false });

export default function MaterialsList({ materials }) {
  const [mode, setMode] = useState('manage');
  return (
    <Tabs defaultValue="manage">
      <TabsList>
        <TabsTrigger value="manage">Manage</TabsTrigger>
        <TabsTrigger value="weapons">Weapons</TabsTrigger>
      </TabsList>
      <Accordion type="single" collapsible>
        {materials.map(material => {
          return <Material key={material.id} {...material} mode={mode} />;
        })}
      </Accordion>
    </Tabs>
  );
}
