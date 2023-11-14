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
import { useItem } from '@/reducers/usedSlice';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTrigger } from '../ui/dialog';
import { DialogTitle } from '@radix-ui/react-dialog';
import Craft from './Craft';

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
        <Craft crafted={crafted} item={item} vendor={item.vendor} materials={materials} status={status} />
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
