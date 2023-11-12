import { decrementHolding, incrementHolding } from '@/reducers/holdingSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AiFillCaretRight, AiFillPlusCircle, AiFillRightCircle } from 'react-icons/ai';
import { giveItem, ungiveItem } from '@/reducers/givenSlice';
import { CiCircleMore } from 'react-icons/ci';
import { TableCell, TableRow } from '../ui/table';

import { Button } from '../ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';

export default function Material({ material, quantity, holding, vendor, item }) {
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

  return (
    <TableRow key={material._id}>
      <TableCell>
        {quantity} {material.name} {material.type}
        {quantity > 1 && 's'}
      </TableCell>
      <TableCell>
        <div className="flex items-center justify-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              dispatch(incrementHolding(material._id));
            }}
          >
            <AiFillPlusCircle className="h-6 w-6 fill-yellow-500" />
          </Button>
          {holding}
        </div>
      </TableCell>

      <TableCell>
        <div className="flex items-center justify-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              if (holding < 1) {
                document.getElementById(`${item}-${material._id}`).showModal();
              } else {
                dispatch(giveItem({ vendor: vendor._id, item: material._id }));
                dispatch(decrementHolding(material._id));
              }
            }}
          >
            <AiFillRightCircle className="fill-green-500 translate-x-[1px] h-6 w-6" />
          </Button>
          {given}
        </div>
      </TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <CiCircleMore />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem asChild>
              <button
                onClick={() => {
                  if (given > 0) {
                    dispatch(ungiveItem({ vendor: vendor._id, item: material._id }));
                    dispatch(incrementHolding(material._id));
                  }
                }}
              >
                Take one back
              </button>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <button
                onClick={() => {
                  if (holding > 0) {
                    dispatch(decrementHolding(material._id));
                  }
                }}
              >
                Lose one
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}
