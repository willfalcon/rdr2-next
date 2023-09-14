'use client';

import { useDispatch, useSelector } from 'react-redux';

import ItemStatus from './ItemStatus';

import Material from './Material';
import { giveItem } from '@/reducers/givenSlice';
import CompletedModal from './CompletedModal';

export default function ItemDetails({ item }) {
  const dispatch = useDispatch();

  const status = useSelector(state => state.status.find(i => i.id === item._id));
  const holding = useSelector(state => state.holding) || [];

  const materials = item.materials.map(({ material, quantity }) => {
    const holdingCount = holding.find(i => i.id === material._id)?.count || 0;

    return { material, quantity, holding: holdingCount };
  });

  return (
    <>
      <ItemStatus status={status} id={item._id} />
      <h3 className="font-bold mt-3">Materials</h3>
      <div className="">
        <table className="table table-sm">
          <thead>
            <tr>
              <th className="pl-0"></th>
              <th>Material</th>
              <th>Needed</th>
              <th>Holding</th>
              <th className="pr-0">Given</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {materials.map(material => {
              return material.material && <Material key={material.material._id} item={item._id} {...material} vendor={item.vendor} />;
            })}
          </tbody>
        </table>
      </div>
      {materials.map(material => (
        <dialog id={`${item._id}-${material.material._id}`} className="modal" key={material.material._id}>
          <div className="modal-box">
            <h3 className="font-bold text-lg">Are you sure?</h3>
            <p className="py-4">You're not holding any of this item. Are you sure you want to increase the number of items you've given?</p>
            <div className="modal-action">
              <form method="dialog">
                <button className="btn mr-1">Cancel</button>
                <button
                  className="btn btn-warning"
                  onClick={() => {
                    dispatch(giveItem({ vendor: item.vendor._id, item: material.material._id }));
                  }}
                >
                  Give item anyway
                </button>
              </form>
            </div>
          </div>
        </dialog>
      ))}
      <CompletedModal materials={materials} vendor={item.vendor} item={item._id} />
    </>
  );
}
