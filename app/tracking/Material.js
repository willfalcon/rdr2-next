import { incrementGiven, incrementHolding } from '@/reducers/listsSlice';
import { AiFillCaretRight } from 'react-icons/ai';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import { CiCircleMore } from 'react-icons/ci';
import { useDispatch, useSelector } from 'react-redux';
export default function Material({ id, name, type, quantity, count, vendors }) {
  const dispatch = useDispatch();
  const givenList = useSelector(state => state.lists.given);
  return (
    <li className="collapse collapse-arrow border-b grid grid-cols-[1fr_auto] overflow-visible">
      <input type="checkbox" />
      <h2 className="collapse-title text-lg font-medium">
        <div className="w-[95%]">
          <span className="">
            {name} {type}
          </span>
          <span className="ml-2">
            {count} / {quantity}
          </span>
        </div>
      </h2>
      <div className="collapse-content">
        <div className="overflow-x-auto">
          <button
            onClick={() => {
              dispatch(incrementHolding(id));
            }}
            className="text-sm grid items-center grid-rows-1 grid-cols-[auto,auto,1fr]"
          >
            Holding: {count}
            <BsFillPlusCircleFill className="fill-warning ml-1" />
            <CiCircleMore className="justify-self-end" />
          </button>
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
                const given = givenList.find(item => item.vendor === vendor._id && item.material === id);
                return (
                  <tr key={vendor._id}>
                    <td className="pl-0">{vendor.name}</td>
                    <td>{vendor.quantity}</td>
                    <td className="pr-0">
                      <button
                        className="flex items-center"
                        onClick={() => {
                          dispatch(incrementGiven({ material: id, vendor: vendor._id }));
                        }}
                      >
                        <span className="bg-success rounded-full mr-1">
                          <AiFillCaretRight className="fill-white translate-x-[1px]" />
                        </span>
                        {given?.count || 0}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </li>
  );
}
