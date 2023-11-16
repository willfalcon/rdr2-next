import React from 'react';
import { AiFillMinusCircle, AiFillPlusCircle } from 'react-icons/ai';

import { Progress } from '../ui/progress';
import { Button } from '../ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { decrementCounter, incrementCounter } from '@/reducers/challengesSlice';

export default function Counter({ challenge, goal }) {
  const count = useSelector(state => state.challenges.tasks.find(task => task.id === challenge)?.count || 0);

  const progress = (count / goal) * 100;
  const dispatch = useDispatch();

  return (
    <div>
      <h3 className="text-xl font-bold my-3">Progress:</h3>

      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            dispatch(decrementCounter(challenge));
          }}
        >
          <AiFillMinusCircle className="w-8 h-8" />
        </Button>
        <span className="text-lg font-bold">{count}</span>
        <Button
          variant="secondary"
          size="icon"
          onClick={() => {
            dispatch(incrementCounter(challenge));
          }}
        >
          <AiFillPlusCircle className="w-8 h-8" />
        </Button>
      </div>

      <Progress className="my-3" value={progress} />
    </div>
  );
}
