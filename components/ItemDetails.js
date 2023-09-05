'use client';

import { checkMaterial, decrementMaterial, incrementGiven, incrementHolding, incrementMaterial } from '@/reducers/listsSlice';

import { useDispatch, useSelector } from 'react-redux';

import ItemStatus from './ItemStatus';

import { AiFillCaretRight, AiFillPlusCircle } from 'react-icons/ai';

export default function ItemDetails({ item }) {
  const stateItem = useSelector(state => state.lists.items.find(i => i.id === item._id));

  const status = useSelector(state => state.lists.statuses?.find(i => i.id === item._id));
  const holding = useSelector(state => state.lists.holding);
  console.log(holding);
  const materials = item.materials.map(({ material, quantity }) => {
    const mat = stateItem ? stateItem.materials.find(m => m.id === material._id) : false;
    const holdingCount = holding.find(i => i.material === material._id)?.count || 0;

    const given = mat ? mat.given : 0;
    const checked = mat ? mat.checked : false;
    return { material, quantity, count: holdingCount, given, checked };
  });

  const dispatch = useDispatch();

  return (
    <>
      <ItemStatus status={status} id={item._id} />
      <h3 className="font-bold mt-3">Materials</h3>
      <div className="overflow-x-auto">
        <table className="table table-sm">
          <thead>
            <tr>
              <th className="pl-0"></th>
              <th>Material</th>
              <th>Needed</th>
              <th>Holding</th>
              <th className="pr-0">Given</th>
            </tr>
          </thead>
          <tbody>
            {materials.map(({ material, quantity, count, given, checked }) => {
              return (
                material && (
                  <tr key={material._id}>
                    <td className="pl-0">
                      <input
                        type="checkbox"
                        className="checkbox"
                        checked={checked}
                        onChange={() => {
                          dispatch(checkMaterial({ item: item._id, material: material._id }));
                        }}
                      />
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
                        {count}
                      </button>
                    </td>
                    <td className="pr-0">
                      <button
                        className="flex items-center"
                        onClick={() => {
                          dispatch(incrementGiven({ item: item._id, material: material._id }));
                        }}
                      >
                        <span className="bg-success rounded-full mr-1">
                          <AiFillCaretRight className="fill-white translate-x-[1px]" />
                        </span>
                        {given}
                      </button>
                    </td>
                  </tr>
                )
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
