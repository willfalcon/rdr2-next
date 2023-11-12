'use client';
import { useSelector } from 'react-redux';
import ItemDetails from './ItemDetails';
import classNames from 'classnames';
import CompletedModal from './CompletedModal';
import { AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';

export default function ListItem(item) {
  const status = useSelector(state => state.status.find(i => i.id === item._id));
  const hideCompleted = useSelector(state => state.settings.hideCompleted);
  const holding = useSelector(state => state.holding) || [];

  const materials = item.materials.map(({ material, quantity }) => {
    const holdingCount = holding.find(i => i.id === material._id)?.count || 0;

    return { material, quantity, holding: holdingCount };
  });

  return (
    <>
      <AccordionItem value={item._id} className="border-y py-3 first:border-t-2">
        <AccordionTrigger>{item.name}</AccordionTrigger>
        <AccordionContent>
          <ItemDetails item={item} status={status} materials={materials} />
        </AccordionContent>
      </AccordionItem>
      <CompletedModal materials={materials} vendor={item.vendor} item={item._id} />
    </>
  );
}
