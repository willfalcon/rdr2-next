'use client';

import Title from '@/components/Title';
import { getTrackedItems } from '@/lib/fetching';
import { alphabetical } from '@/lib/utils';
import { trackingSelector } from '@/reducers/statusSlice';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Material from './Material';

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
  const [mode, setMode] = useState('manage');
  return (
    <>
      <Title>Materials</Title>

      <div className="px-4">
        <div className="tabs tabs-boxed inline-flex">
          <button className={classNames('tab', { 'tab-active': mode === 'manage' })} onClick={() => setMode('manage')}>
            Manage
          </button>
          <button className={classNames('tab', { 'tab-active': mode === 'weapons' })} onClick={() => setMode('weapons')}>
            Weapons
          </button>
        </div>
      </div>

      <ul className="mb-3">
        {materials.map(material => {
          return <Material key={material.id} {...material} mode={mode} />;
        })}
      </ul>
    </>
  );
}
