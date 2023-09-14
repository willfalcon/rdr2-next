import { decrementHolding, incrementHolding } from '@/reducers/holdingSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AiFillCaretRight, AiFillPlusCircle } from 'react-icons/ai';
import { giveItem, ungiveItem } from '@/reducers/givenSlice';
import { CiCircleMore } from 'react-icons/ci';

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
    <>
      <tr>
        <td className="pl-0">
          <input type="checkbox" className="checkbox" checked={false} onChange={() => {}} />
        </td>
        <td className="">
          {material.name} {material.type}
        </td>
        <td>{quantity}</td>

        <td>
          <button
            className="flex items-center"
            onClick={() => {
              dispatch(incrementHolding(material._id));
            }}
          >
            <AiFillPlusCircle className="fill-warning mr-1" />
            {holding}
          </button>
        </td>
        <td>
          <button
            className="flex items-center"
            onClick={() => {
              if (holding < 1) {
                document.getElementById(`${item}-${material._id}`).showModal();
              } else {
                dispatch(giveItem({ vendor: vendor._id, item: material._id }));
                dispatch(decrementHolding(material._id));
              }
            }}
          >
            <span className="bg-success rounded-full mr-1">
              <AiFillCaretRight className="fill-white translate-x-[1px]" />
            </span>
            {given}
          </button>
        </td>
        <td>
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="h-5 flex items-center">
              <CiCircleMore />
            </label>
            <ul tabIndex={0} className="dropdown-content z-[2] menu p-2 shadow bg-base-100 rounded-box w-64">
              <li>
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
              </li>
              <li>
                <button
                  onClick={() => {
                    if (holding > 0) {
                      dispatch(decrementHolding(material._id));
                    }
                  }}
                >
                  Lose one
                </button>
              </li>
            </ul>
          </div>
        </td>
      </tr>
    </>
  );
}
