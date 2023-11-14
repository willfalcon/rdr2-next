'use client';

import Image from '@/components/Image';
import classNames from 'classnames';

import { useSelector } from 'react-redux';

import Status from './Status';
import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';

export default function Item(props) {
  const { person, item, locationImage, _id, locationDescription, chapter, mission } = props;
  const status = useSelector(state => state.requests.find(i => i.id === _id)?.state);
  const hideCompleted = useSelector(state => state.settings.hideCompleted);
  const looking = status === 2;
  const found = status === 3;
  const given = status === 4;

  if (hideCompleted && given) return null;
  return (
    <AccordionItem value={_id} className={classNames('px-4', { hidden: status === 3 && hideCompleted })}>
      <AccordionTrigger>
        <div className="flex gap-2 items-center">
          <span className="text-left">
            <strong>{item}</strong> for <strong>{person}</strong>
          </span>
          {looking && (
            <Badge variant="secondary" className="bg-yellow-400">
              Looking
            </Badge>
          )}
          {found && (
            <Badge variant="secondary" className="bg-orange-400">
              Found
            </Badge>
          )}
          {given && (
            <Badge variant="secondary" className="bg-green-400">
              Given
            </Badge>
          )}
        </div>
      </AccordionTrigger>
      <AccordionContent>
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
      </AccordionContent>
    </AccordionItem>
  );
}
