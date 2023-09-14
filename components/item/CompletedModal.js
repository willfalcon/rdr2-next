import { ungiveItem } from '@/reducers/givenSlice';
import classNames from 'classnames';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function ClearButton({ vendor, material, quantity }) {
  const given = useSelector(state => {
    // return state.given.find(mat => mat.id === material._id)?.vendors.find(ven => ven.id === vendor._id)
    if (state.given.length) {
      const i = state.given.findIndex(mat => mat.id === material._id);

      if (i >= 0) {
        return state.given[i].vendors.find(ven => ven.id === vendor._id)?.count || 0;
      }
    }
    return 0;
  });

  const count = quantity > given ? given : quantity;

  const dispatch = useDispatch();

  const [done, setDone] = useState(false);

  return (
    <button
      className={classNames('btn my-2', { 'btn-error': done })}
      onClick={() => {
        dispatch(ungiveItem({ item: material._id, vendor: vendor._id, count }));
        setDone(true);
      }}
      disabled={done}
    >
      Clear {count} {material.name} {material.type}
    </button>
  );
}

export default function CompletedModal({ materials, vendor, item }) {
  return (
    <dialog id={`${item}-completed`} className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Clear Given Items</h3>
        {materials.map(({ material, quantity }) => (
          <ClearButton key={material._id} quantity={quantity} material={material} vendor={vendor} />
        ))}
        <div className="modal-action">
          <form method="dialog">
            <button className="btn">Done</button>
          </form>
        </div>
      </div>
    </dialog>
  );
}
