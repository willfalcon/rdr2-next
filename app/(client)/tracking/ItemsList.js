import ListItem from '@/components/item/ListItem';
import { getTrackedItems } from '@/lib/fetching';
import { alphabetical } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function ItemsList() {
  const tracking = useSelector(state => state.status.filter(item => item.status === 2).map(item => item.id));
  // console.log(tracking);
  const [items, setItems] = useState([]);
  useEffect(() => {
    async function callGetItems() {
      const trackedItems = await getTrackedItems(tracking);
      // console.log(trackedItems);
      trackedItems.sort(alphabetical);
      // console.log(trackedItems);
      setItems(trackedItems);
    }
    callGetItems();
  }, []);

  return (
    <ul>
      {items.map(item => {
        return (
          <div className="border-b grid grid-cols-[1fr_auto]" key={item._id}>
            <ListItem {...item} vendor={item.categories[0].vendor} />
          </div>
        );
      })}
    </ul>
  );
}
