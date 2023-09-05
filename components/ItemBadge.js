'use client';
import classNames from 'classnames';
import { useSelector } from 'react-redux';

export default function ItemBadge({ tracking, completed }) {
  return (
    <div
      className={classNames('badge', {
        'badge-success': !completed && tracking,
        'badge-warning': completed,
        hidden: !tracking && !completed,
      })}
    >
      {!completed && tracking ? 'Tracking' : completed ? 'Completed' : ''}
    </div>
  );
}
