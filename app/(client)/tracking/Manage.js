import { giveItem, ungiveItem } from '@/reducers/givenSlice';
import { decrementHolding, incrementHolding } from '@/reducers/holdingSlice';

import { AiFillCaretRight } from 'react-icons/ai';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import { CiCircleMore } from 'react-icons/ci';
import { useDispatch, useSelector } from 'react-redux';

function Vendor({ vendor, material, holding }) {
  const given = useSelector(state => state.given.find(g => g.id === material)?.vendors.find(v => v.id === vendor.id)?.count || 0);
  const dispatch = useDispatch();

  return (
    <tr>
      <td className="pl-0">{vendor.name}</td>
      <td>{vendor.count}</td>
      <td className="pr-0">
        <button
          className="flex items-center"
          onClick={() => {
            // dispatch(incrementGiven({ material: id, vendor: vendor._id }));
            if (holding < 1) {
              document.getElementById(`${material}-${vendor.id}`).showModal();
            } else {
              dispatch(giveItem({ vendor: vendor.id, item: material }));
            }
            dispatch(decrementHolding(material));
          }}
        >
          <span className="bg-success rounded-full mr-1">
            <AiFillCaretRight className="fill-white translate-x-[1px]" />
          </span>
          {given}
        </button>
      </td>
      <td className="dropdown dropdown-end">
        <label tabIndex={0} className="">
          <CiCircleMore />
        </label>
        <div tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 z-[2] w-64">
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
        </div>
      </td>
    </tr>
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
        <button
          onClick={() => {
            dispatch(incrementHolding(id));
          }}
        >
          <BsFillPlusCircleFill className="fill-warning ml-1" />
        </button>
        <div className="dropdown flex justify-end z-[2]">
          <label tabIndex={0} className="">
            <CiCircleMore className="justify-self-end" />
          </label>
          <div tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 z-[1]">
            <button
              onClick={() => {
                dispatch(decrementHolding(id));
              }}
            >
              Lose one
            </button>
          </div>
        </div>
      </div>
      <table className="table table-sm">
        <thead>
          <tr>
            <th className="pl-0">Vendor</th>
            <th>Needed</th>
            <th className="pr-0">Given</th>
          </tr>
        </thead>
        <tbody>
          {vendors.map(vendor => {
            // const given = givenList.find(item => item.vendor === vendor._id && item.material === id);
            return <Vendor key={vendor.id} material={id} vendor={vendor} holding={holding} />;
          })}
        </tbody>
      </table>
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
