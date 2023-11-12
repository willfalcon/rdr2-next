'use client';

import { useDispatch, useSelector } from 'react-redux';

import ItemStatus from './ItemStatus';

import Material from './Material';
import { giveItem } from '@/reducers/givenSlice';
import CompletedModal from './CompletedModal';
import { Button } from '../ui/button';
import { changeStatus } from '@/reducers/statusSlice';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '../ui/table';
import classNames from 'classnames';

const btnClass = statusCode => {
  switch (statusCode) {
    case 2:
      return 'btn-warning';
    case 3:
      return 'btn-success';
    case 1:
    default:
      '';
  }
};

export default function ItemDetails({ item, status, materials }) {
  const dispatch = useDispatch();
  const tracking = status.status === 2;
  const crafted = status.status === 3;

  return (
    <>
      {/* <ItemStatus status={status} id={item._id} /> */}
      <div className="space-x-2">
        <Button
          variant="ghost"
          className={tracking ? 'bg-yellow-400 hover:bg-yellow-400' : 'bg-yellow-100'}
          onClick={() => {
            const newStatus = !status ? 2 : status.status === 2 ? 1 : 2;
            dispatch(changeStatus({ item: item._id, status: newStatus }));
          }}
        >
          {tracking ? 'Tracking' : 'Track'}
        </Button>

        <Button
          variant="ghost"
          className={crafted ? 'bg-green-400 hover:bg-yellow0400' : 'bg-green-100'}
          onClick={() => {
            const newStatus = !status ? 3 : status.status === 3 ? 2 : 3;
            dispatch(changeStatus({ item: item._id, status: newStatus }));
          }}
        >
          {crafted ? 'Crafted' : 'Craft'}
        </Button>
      </div>
      {/* <h3 className="font-bold mt-3 px-4">Materials</h3> */}

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="">Material</TableHead>
            <TableHead className="text-center">Holding</TableHead>
            <TableHead className="text-center">Given</TableHead>
            <TableHead className="text-center"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {materials.map(material => {
            return material.material && <Material key={material.material._id} item={item._id} {...material} vendor={item.vendor} />;
          })}
        </TableBody>
      </Table>
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
    </>
  );
}
