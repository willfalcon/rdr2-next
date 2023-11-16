'use client';
import React from 'react';
import { AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from '../ui/button';
import { updateChallengeRank } from '@/reducers/challengesSlice';
import Content from '../Content';
import Checklist from './Checklist';
import Counter from './Counter';
import Challenge from './Challenge';

export default function ChallengeType(props) {
  const { _id, name, challenges } = props;

  const rank = useSelector(state => {
    return state.challenges.ranks.find(ch => ch.id === _id)?.rank || 1;
  });

  const challenge = challenges.find(ch => ch.rank === rank);

  // if (name === 'Bandit') {
  //   console.log(challenge);
  // }

  return (
    <AccordionItem value={_id}>
      <AccordionTrigger>
        <div className="text-left">
          <h3 className="font-bold text-lg">
            {name} Challenges: Rank {rank}
          </h3>
          <span>{challenge.challenge}</span>
        </div>
      </AccordionTrigger>
      <AccordionContent>
        <Challenge type={_id} challenge={challenge} rank={rank} />
      </AccordionContent>
    </AccordionItem>
  );
}
