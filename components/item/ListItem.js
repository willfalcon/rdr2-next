'use client';
import { useSelector } from 'react-redux';
import ItemDetails from './ItemDetails';
import classNames from 'classnames';

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

  return (
    <div
      className={classNames('collapse collapse-arrow border-b grid grid-cols-[1fr_auto] overflow-visible rounded-none', {
        hidden: hideCompleted && status?.status === 3,
      })}
    >
      <input type="checkbox" />

      <h2 className={classNames('collapse-title text-lg font-medium p-0')}>
        <div className={classNames('w-full p-4', btnClass(status?.status))}>
          <span className="">{item.name}</span>
        </div>
      </h2>
      <div className="collapse-content">
        <ItemDetails item={item} />
      </div>
    </div>
  );
}
