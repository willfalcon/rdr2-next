'use client';
import Back from '@/components/Back';
// import ListItem from '@/components/item/ListItem';
import Title from '@/components/Title';
// import client from '@/lib/client';
import { alphabetical } from '@/lib/utils';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Material from './Material';
import { getTrackedItems } from '@/lib/fetching';
// import MaterialsList from './MaterialsList';
import ItemsList from './ItemsList';

function buildObtainedMaterials(items) {
  let obtainedMaterials = [];
  items.forEach(item => {
    item.materials.forEach(({ id, count, given }) => {
      const index = obtainedMaterials.findIndex(m => m.id === id);
      if (index < 0) {
        obtainedMaterials.push({ id, count });
      } else {
        obtainedMaterials[index].count += count;
        obtainedMaterials[index].given += given;
      }
    });
  });
  return obtainedMaterials;
}

export default function Page() {
  const { lists } = useSelector(store => ({ lists: store.lists, tracking: store.tracking }));

  const [materials, setMaterials] = useState([]);
  const tracking = useSelector(state => state.status.filter(item => item.status === 2).map(item => item.id));

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
  }, [lists]);

  const [mode, setMode] = useState('manage');

  return (
    <>
      <Back />
      <Title h1>Tracking</Title>

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

      <Title>Items</Title>

      <ItemsList />
    </>
  );
}
