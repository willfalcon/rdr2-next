'use client';
import { useDispatch, useSelector } from 'react-redux';
import ItemDetails from './ItemDetails';
import classNames from 'classnames';
import CompletedModal from './CompletedModal';
import { AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { Badge } from '../ui/badge';

export default function ListItem(item) {
  const status = useSelector(state => state.status.find(i => i.id === item._id));
  const hideCompleted = useSelector(state => state.settings.hideCompleted);
  const holding = useSelector(state => state.holding) || [];

  const materials = item.materials.map(({ material, quantity }) => {
    const holdingCount = holding.find(i => i.id === material._id)?.count || 0;

    return { material, quantity, holding: holdingCount };
  });

  const tracking = status.status === 2;
  const crafted = status.status === 3;

  if (hideCompleted && crafted) return null;

  return (
    <>
      <AccordionItem value={item._id} className="border-y py-3 first:border-t-2">
        <AccordionTrigger>
          <div className="flex gap-2 items-center">
            {item.name}
            {tracking && (
              <Badge variant="secondary" className="bg-yellow-400">
                Tracking
              </Badge>
            )}
            {crafted && (
              <Badge variant="secondary" className="bg-green-400">
                Crafted
              </Badge>
            )}
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <ItemDetails item={item} status={status} materials={materials} tracking={tracking} crafted={crafted} />
        </AccordionContent>
      </AccordionItem>
      <CompletedModal materials={materials} vendor={item.vendor} item={item._id} />
    </>
  );
}
