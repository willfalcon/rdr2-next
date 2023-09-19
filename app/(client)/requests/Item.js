'use client';

import Image from '@/components/Image';
import classNames from 'classnames';

import { useSelector } from 'react-redux';

import Status from './Status';

export default function Item(props) {
  const { person, item, locationImage, _id, locationDescription, chapter, mission } = props;
  const status = useSelector(state => state.requests.find(i => i.id === _id)?.state);
  const hideCompleted = useSelector(state => state.settings.hideCompleted);
  return (
    <li className={classNames('px-4', { hidden: status === 3 && hideCompleted })}>
      <h2 className="text-lg">
        <strong>{item}</strong> for <strong>{person}</strong>
      </h2>
      <Status {...props} />
      {status && status >= 2 ? (
        <div>
          <p>{locationDescription}</p>
          {locationImage && (
            <button className="btn btn-neutral" onClick={() => document.getElementById(`${_id}-image`).showModal()}>
              View on Map
            </button>
          )}
        </div>
      ) : (
        <div>
          <p>
            Unlocked:{' '}
            {chapter.map((ch, i) => (
              <span key={ch}>
                {ch}
                {i < chapter.length - 1 && ', '}
              </span>
            ))}
          </p>
          <p>{mission}</p>
        </div>
      )}
      <div className="divider" />
      {locationImage && (
        <dialog id={`${_id}-image`} className="modal">
          <div className="modal-box">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">X</button>
            </form>
            <Image image={locationImage} />
          </div>
        </dialog>
      )}
    </li>
  );
}
