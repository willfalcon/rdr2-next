'use client';
import { useSelector } from 'react-redux';
import ItemDetails from './ItemDetails';
import classNames from 'classnames';
import CompletedModal from './CompletedModal';
import { useState } from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible';
import { Separator } from '../ui/separator';
import { Button } from '../ui/button';
import { LiaAngleDownSolid } from 'react-icons/lia';

const btnClass = statusCode => {
  switch (statusCode) {
    case 2:
      return 'bg-gradient-to-r from-warning/25 via-warning/50 to-warning/25';
    case 3:
      return 'bg-gradient-to-r from-success/25 via-success/50 to-success/25';
    case 1:
    default:
      '';
  }
};

export default function ListItem(item) {
  const status = useSelector(state => state.status.find(i => i.id === item._id));
  const hideCompleted = useSelector(state => state.settings.hideCompleted);
  const holding = useSelector(state => state.holding) || [];

  const materials = item.materials.map(({ material, quantity }) => {
    const holdingCount = holding.find(i => i.id === material._id)?.count || 0;

    return { material, quantity, holding: holdingCount };
  });

  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className={classNames('', {
          hidden: hideCompleted && status?.status === 3,
        })}
      >
        <CollapsibleTrigger className={classNames('text-lg font-medium p-0 w-full text-left')}>
          <div className={classNames('w-full p-4 flex justify-between', btnClass(status?.status))}>
            <span className="">{item.name}</span>
            <Button variant="ghost" size="sm">
              <LiaAngleDownSolid className={classNames('w-4 h-8', { 'rotate-180': isOpen })} />
            </Button>
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <ItemDetails item={item} status={status} materials={materials} />
        </CollapsibleContent>
      </Collapsible>
      <Separator />
      <CompletedModal materials={materials} vendor={item.vendor} item={item._id} />
    </>
  );
}
