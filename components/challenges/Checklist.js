import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Checkbox } from '../ui/checkbox';
import { toggleItem } from '@/reducers/challengesSlice';

export default function Checklist({ list, challenge }) {
  const checkedItems = useSelector(state => state.challenges.tasks.find(task => task.id === challenge)?.checked || []);

  const dispatch = useDispatch();

  return (
    <div>
      <h3 className="text-xl font-bold my-3">Checklist:</h3>

      <div>
        {list.map(item => {
          const checked = checkedItems.indexOf(item) >= 0;

          return (
            <div className="flex items-center space-x-2 my-2" key={item}>
              <Checkbox
                id={item}
                className="w-5 h-5"
                checked={checked}
                onCheckedChange={() => {
                  dispatch(toggleItem({ challenge, item }));
                }}
              />
              <label htmlFor={item} className="flex-1 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {item}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
}
