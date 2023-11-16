import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '../ui/button';
import { updateChallengeRank } from '@/reducers/challengesSlice';
import Content from '../Content';
import Counter from './Counter';
import Checklist from './Checklist';

export default function Challenge({ type, challenge, rank }) {
  const dispatch = useDispatch();

  const { trackingType, counter, checklist, _id } = challenge;
  return (
    <div className="px-4">
      <div className="space-x-2">
        <Button
          variant="secondary"
          onClick={() => {
            dispatch(updateChallengeRank({ type, rank: rank <= 0 ? 0 : rank - 1 }));
          }}
        >
          Go Back
        </Button>
        <Button
          onClick={() => {
            dispatch(updateChallengeRank({ type, rank: rank >= 11 ? 11 : rank + 1 }));
          }}
        >
          Complete
        </Button>
      </div>
      {trackingType === 'counter' && counter && <Counter goal={counter} challenge={challenge._id} />}
      {trackingType === 'checklist' && checklist && <Checklist list={checklist} challenge={challenge._id} />}
      <Content>{challenge.details}</Content>
    </div>
  );
}
