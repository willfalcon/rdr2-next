'use client';

import Title from '@/components/Title';
import { getTrackedItems } from '@/lib/fetching';
import { alphabetical } from '@/lib/utils';
import { trackingSelector } from '@/reducers/statusSlice';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Material from './Material';
import { Accordion } from '@/components/ui/accordion';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function MaterialsList() {
  const [materials, setMaterials] = useState([]);
  // const tracking = useSelector(state => state.status.filter(item => item.status === 2).map(item => item.id));
  const tracking = useSelector(trackingSelector);
  useEffect(() => {
    async function doIt() {
      const items = await getTrackedItems(tracking);

      let materialsList = [];
      items.forEach(item => {
        item.materials.forEach(({ material, quantity }) => {
          const index = materialsList.findIndex(m => m.id === material._id);
          if (index < 0) {
            materialsList.push({
              ...material,
              id: material._id,
              vendors: [{ id: item.categories[0].vendor._id, count: quantity, name: item.categories[0].vendor.name }],
            });
          } else {
            const vendorIndex = materialsList[index].vendors.findIndex(vendor => vendor.id === item.categories[0].vendor._id);
            if (vendorIndex < 0) {
              materialsList[index].vendors.push({
                id: item.categories[0].vendor._id,
                count: quantity,
                name: item.categories[0].vendor.name,
              });
            } else {
              materialsList[index].vendors[vendorIndex].count += quantity;
            }
          }
        });
      });

      materialsList.sort(alphabetical);

      setMaterials(materialsList);
    }
    doIt();
  }, [tracking]);
  return (
    <>
      <Title>Materials</Title>

      <Tabs defaultValue="manage">
        <TabsList>
          <TabsTrigger value="manage">Manage</TabsTrigger>
          <TabsTrigger value="weapons">Weapons</TabsTrigger>
        </TabsList>
        <Accordion className="mb-3" type="single" collapsible>
          {materials.map(material => {
            return <Material key={material.id} {...material} />;
          })}
        </Accordion>
      </Tabs>
    </>
  );
}
