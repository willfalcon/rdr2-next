'use client';

import { useDispatch, useSelector } from 'react-redux';

import Material from './Material';
import { Button } from '../ui/button';
import { changeStatus } from '@/reducers/statusSlice';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '../ui/table';
import { createSelector } from '@reduxjs/toolkit';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/alert-dialog';
import { ungiveItem } from '@/reducers/givenSlice';

const selectGiven = state => state.given;

export const getGivenMaterialForVendor = (givenState, vendor, material) => {
  if (givenState.length) {
    const i = givenState.findIndex(mat => mat.id === material);
    if (i >= 0) {
      return givenState[i].vendors.find(ven => ven.id === vendor)?.count || 0;
    }
  }
  return 0;
};

export default function ItemDetails({ item, status, materials, tracking, crafted }) {
  const dispatch = useDispatch();

  const allItemsGiven = useSelector(state => {
    return materials.every(material => {
      const given = getGivenMaterialForVendor(state.given, item.vendor._id, material.material._id);
      return given >= material.quantity;
    });
  });

  function craftItem() {
    const newStatus = !status ? 3 : status.status === 3 ? 2 : 3;
    dispatch(changeStatus({ item: item._id, status: newStatus }));
    materials.forEach(material => {
      dispatch(ungiveItem({ item: material.material._id, vendor: item.vendor._id, count: material.quantity }));
      dispatch(useItem({ item: material.material._id, vendor: item.vendor._id, count: material.quantity }));
    });
  }

  return (
    <>
      <div className="space-x-2 px-4">
        <Button
          variant="ghost"
          className={tracking ? 'bg-yellow-400 hover:bg-yellow-400' : 'bg-secondary'}
          onClick={() => {
            const newStatus = !status ? 2 : status.status === 2 ? 1 : 2;
            dispatch(changeStatus({ item: item._id, status: newStatus }));
          }}
        >
          {tracking ? 'Tracking' : 'Track'}
        </Button>
        {allItemsGiven || crafted ? (
          <Button variant="ghost" className={crafted ? 'bg-green-400 hover:bg-green-400' : 'bg-secondary'} onClick={craftItem}>
            {crafted ? 'Crafted' : 'Craft'}
          </Button>
        ) : (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" className={crafted ? 'bg-green-400 hover:bg-green-400' : 'bg-secondary'}>
                {crafted ? 'Crafted' : 'Craft'}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Not all materials given!</AlertDialogTitle>
                <AlertDialogDescription>Not all necessary items have been given. Craft anyway?</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={craftItem}>Craft anyway</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>

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
    </>
  );
}
