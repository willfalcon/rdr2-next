import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Table, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { giveItem, ungiveItem } from '@/reducers/givenSlice';
import { decrementHolding, incrementHolding } from '@/reducers/holdingSlice';

import { AiFillCaretRight, AiFillPlusCircle, AiFillRightCircle } from 'react-icons/ai';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import { CiCircleMore } from 'react-icons/ci';
import { useDispatch, useSelector } from 'react-redux';

function Vendor({ vendor, material, holding }) {
  const given = useSelector(state => state.given.find(g => g.id === material)?.vendors.find(v => v.id === vendor.id)?.count || 0);
  const used = useSelector(state => state.used.find(u => u.id === material)?.vendors.find(v => v.id === vendor.id)?.count || 0);
  const dispatch = useDispatch();

  return (
    <TableRow>
      <TableCell className="pl-0">{vendor.name}</TableCell>
      <TableCell>{vendor.count}</TableCell>
      <TableCell>
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
          className="space-x-1"
        >
          <AiFillRightCircle className="fill-green-500 translate-x-[1px] h-6 w-6" />
          <span>{given}</span>
        </Button>
      </TableCell>
      <TableCell className="pr-0">{used}</TableCell>
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
                    dispatch(ungiveItem({ vendor: vendor.id, item: material }));
                    dispatch(incrementHolding(material));
                  }
                }}
              >
                Take one back
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}

export default function Manage(props) {
  const { id, vendors } = props;

  const dispatch = useDispatch();
  const holding = useSelector(state => state.holding.find(h => h.id === id)?.count || 0);
  return (
    <>
      <div className="text-sm grid items-center grid-rows-1 grid-cols-[auto,auto,1fr] w-full">
        <span>Holding: {holding}</span>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            dispatch(incrementHolding(material._id));
          }}
        >
          <AiFillPlusCircle className="h-6 w-6 fill-yellow-500" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger tabIndex={0} className="justify-self-end">
            <CiCircleMore />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem asChild>
              <button
                onClick={() => {
                  dispatch(decrementHolding(id));
                }}
              >
                Lose one
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="pl-0">Vendor</TableHead>
            <TableHead>Needed</TableHead>
            <TableHead>Given</TableHead>
            <TableHead className="pr-0">Used</TableHead>
          </TableRow>
        </TableHeader>
        <tbody>
          {vendors.map(vendor => {
            // const given = givenList.find(item => item.vendor === vendor._id && item.material === id);
            return <Vendor key={vendor.id} material={id} vendor={vendor} holding={holding} />;
          })}
        </tbody>
      </Table>
      {vendors.map(vendor => (
        <dialog key={`${id}-${vendor.id}`} id={`${id}-${vendor.id}`} className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Are you sure?</h3>
            <p className="py-4">You're not holding any of this item. Are you sure you want to increase the number of items you've given?</p>
            <div className="modal-action">
              <form method="dialog">
                <button className="btn mr-1">Cancel</button>
                <button
                  className="btn btn-warning"
                  onClick={() => {
                    dispatch(giveItem({ vendor: vendor.id, item: id }));
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
