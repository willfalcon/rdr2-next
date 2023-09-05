'use client';
import Back from '@/components/Back';
import ListItem from '@/components/ListItem';
import Title from '@/components/Title';
import client from '@/lib/client';
import { alphabetical } from '@/lib/utils';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Material from './Material';

async function getData(trackedItems) {
  const items = await client.fetch(
    `*[_id in $items] {
        _id,
        name,
        categories[]-> {
          _id,
          "slug": slug.current,
          name,
          vendor->{
            _id,
            name
          }
        },
        materials[] {
          quantity,
          material->{
            _id,
            name,
            "type": type->name
          }
        }
      }
    `,
    { items: trackedItems.map(item => item.id) }
  );

  return items;
}

const MaterialsContext = React.createContext();

export default function Page() {
  const { lists, tracking } = useSelector(store => ({ lists: store.lists, tracking: store.tracking }));

  const [items, setItems] = useState([]);
  const [materials, setMaterials] = useState([]);

  useEffect(() => {
    async function doIt() {
      const items = await getData(lists.statuses.filter(({ status }) => status === 2));

      let obtainedMaterials = [];
      lists.items.forEach(item => {
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

      let materialsList = [];
      items.forEach(item => {
        item.materials.forEach(material => {
          const index = materialsList.findIndex(m => m.id === material.material._id);
          const obtained = obtainedMaterials.findIndex(m => m.id === material.material._id);
          const count = obtained < 0 ? 0 : obtainedMaterials[obtained].count;

          if (index < 0) {
            materialsList.push({
              ...material.material,
              id: material.material._id,
              quantity: material.quantity,
              count,
              vendors: [{ ...item.categories[0].vendor, quantity: material.quantity }],
            });
          } else {
            materialsList[index].quantity += material.quantity;
            const vendorIndex = materialsList[index].vendors.findIndex(i => i._id === item.categories[0].vendor._id);
            if (vendorIndex < 0) {
              materialsList[index].vendors.push({ ...item.categories[0].vendor, quantity: material.quantity });
            } else {
              materialsList[index].vendors[vendorIndex].quantity += material.quantity;
            }
          }
        });
      });

      materialsList.forEach(material => {
        const materialItem = lists.holding.find(item => item.material === material.id);
        material.count = materialItem?.count || 0;
        material.vendors.forEach(vendor => {
          const givenItem = lists.given.find(item => item.material === material.id && item.vendor === vendor._id);
          vendor.given = givenItem?.count || 0;
        });
        // const givenItem = lists.given.find(
        //   item => item.material === material.id && material.vendors.some(vendor => vendor._id === material.vendor)
        // );
      });
      materialsList.sort(alphabetical);
      console.log(materialsList);
      items.sort(alphabetical);

      const joinedItems = items.map(item => {
        const stateItem = lists.items.find(i => i.id === item._id);
        const materials = item.materials.map(material => {
          const mat = stateItem ? stateItem.materials.find(m => m.id === material.material._id) : false;
          const count = mat ? mat.count : 0;
          return { ...material, count };
        });

        return {
          ...item,
          materials,
          tracking: tracking.items.includes(item._id),
        };
      });

      setItems(joinedItems);
      setMaterials(materialsList);
    }
    doIt();
  }, [lists]);

  return (
    <>
      <Back />
      <Title h1>Tracking</Title>
      <Title>Materials</Title>

      <ul className="mb-3">
        {materials.map(material => {
          return <Material key={material.id} {...material} />;
        })}
      </ul>
      <Title>Items</Title>
      <ul>
        {items.map(item => {
          return (
            <div className="border-b grid grid-cols-[1fr_auto]" key={item._id}>
              <ListItem {...item} />
            </div>
          );
        })}
      </ul>
    </>
  );
}
