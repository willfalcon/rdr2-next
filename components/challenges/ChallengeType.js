'use client';
import React from 'react';
import { AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { useDispatch, useSelector } from 'react-redux';
import { PortableText } from '@portabletext/react';
import { Button } from '../ui/button';
import { updateChallengeRank } from '@/reducers/challengesSlice';

export default function ChallengeType(props) {
  const { _id, name, challenges } = props;

  const rank = useSelector(state => {
    return state.challenges.find(ch => ch.id === _id)?.rank || 1;
  });

  const challenge = challenges.find(ch => ch.rank === rank);

  const dispatch = useDispatch();

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
        <div className="px-4">
          <Button
            variant="secondary"
            onClick={() => {
              dispatch(updateChallengeRank({ type: _id, rank: rank <= 0 ? 0 : rank - 1 }));
            }}
          >
            Go Back
          </Button>
          <Button
            onClick={() => {
              dispatch(updateChallengeRank({ type: _id, rank: rank >= 11 ? 11 : rank + 1 }));
            }}
          >
            Complete
          </Button>
          <PortableText
            value={challenge.details}
            components={{
              types: {
                image: ({ value }) => <img src={value.imageUrl} />,
                callToAction: ({ value, isInline }) =>
                  isInline ? <a href={value.url}>{value.text}</a> : <div className="callToAction">{value.text}</div>,
              },

              marks: {
                link: ({ children, value }) => {
                  const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined;
                  return (
                    <a href={value.href} rel={rel}>
                      {children}
                    </a>
                  );
                },
              },
            }}
          />
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
