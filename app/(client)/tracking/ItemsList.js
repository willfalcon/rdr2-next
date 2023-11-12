'use client';
import ListItem from '@/components/item/ListItem';
import { Accordion } from '@/components/ui/accordion';
import { getTrackedItems } from '@/lib/fetching';
import { alphabetical } from '@/lib/utils';
import { trackingSelector } from '@/reducers/statusSlice';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function ItemsList() {
  const tracking = useSelector(trackingSelector);

  const [items, setItems] = useState([]);

  useEffect(() => {
    async function callGetItems() {
      const trackedItems = await getTrackedItems(tracking);
      console.log(tracking);
      console.log(trackedItems);
      trackedItems.sort(alphabetical);
      // console.log(trackedItems);
      setItems(trackedItems);
    }
    callGetItems();
  }, []);

  return (
    <Accordion type="single" collapsible>
      {items.map(item => {
        return <ListItem {...item} vendor={item.categories[0].vendor} key={item._id} />;
      })}
    </Accordion>
  );
}
