import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Button } from '../ui/button';
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
import { useDispatch, useSelector } from 'react-redux';
import { changeStatus } from '@/reducers/statusSlice';
import { giveItem, ungiveItem } from '@/reducers/givenSlice';
import { unuseItem, useItem } from '@/reducers/usedSlice';
import { getGivenMaterialForVendor } from './ItemDetails';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { AiFillRightCircle } from 'react-icons/ai';

export default function Craft({ crafted, vendor, item, materials, status }) {
  const allItemsGiven = useSelector(state => {
    return materials.every(material => {
      const given = getGivenMaterialForVendor(state.given, vendor._id, material.material._id);
      return given >= material.quantity;
    });
  });

  const dispatch = useDispatch();

  function craftItem() {
    const newStatus = !status ? 3 : status.status === 3 ? 2 : 3;
    dispatch(changeStatus({ item: item._id, status: newStatus }));
    if (newStatus === 3) {
      materials.forEach(material => {
        dispatch(ungiveItem({ item: material.material._id, vendor: vendor._id, count: material.quantity }));
        dispatch(useItem({ item: material.material._id, vendor: vendor._id, count: material.quantity }));
      });
    } else if (newStatus === 2) {
    }
  }

  if (crafted) {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="ghost" className="bg-green-400 hover:bg-green-400">
            Crafted
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Uncraft Item?</DialogTitle>
            <DialogDescription>Reset materials used in this item.</DialogDescription>
          </DialogHeader>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Material</TableHead>
                <TableHead className="text-center">Used</TableHead>
                <TableHead />
                <TableHead className="text-center">Given</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {materials.map(material => {
                return (
                  <UncraftTableRow key={material.material._id} material={material.material} vendor={vendor} quantity={material.quantity} />
                );
              })}
            </TableBody>
          </Table>
          <DialogFooter>
            <Button
              onClick={() => {
                dispatch(changeStatus({ item: item._id, status: 2 }));
              }}
            >
              Uncraft
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  if (allItemsGiven) {
    return (
      <Button variant="secondary" onClick={craftItem}>
        Craft
      </Button>
    );
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="secondary">Craft</Button>
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
  );
}

function UncraftTableRow({ material, vendor, quantity }) {
  const dispatch = useDispatch();

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

  const used = useSelector(state => {
    if (state.used.length) {
      const i = state.used.findIndex(mat => mat.id === material._id);
      if (i >= 0) {
        return state.used[i].vendors.find(ven => ven.id === vendor._id)?.count || 0;
      }
    }
    return 0;
  });

  const [moved, setMoved] = useState(0);

  return (
    <TableRow className="text-center">
      <TableCell className="text-left">
        {quantity} {material.name} {material.type}
      </TableCell>
      <TableCell>{used}</TableCell>
      <TableCell>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            if (used) {
              setMoved(moved + 1);
              dispatch(unuseItem({ item: material._id, vendor: vendor._id, count: 1 }));
              dispatch(giveItem({ item: material._id, vendor: vendor._id, count: 1 }));
            }
          }}
        >
          <AiFillRightCircle className={`${moved >= quantity ? 'fill-green-500' : 'fill-yellow-500'} translate-x-[1px] h-6 w-6`} />
        </Button>
      </TableCell>
      <TableCell>{given}</TableCell>
    </TableRow>
  );
}
