import React from 'react';
import dynamic from 'next/dynamic';

import { Accordion } from '@/components/ui/accordion';
import { getChallengeTypes } from '@/lib/fetching';
import Back from '@/components/Back';
import Title from '@/components/Title';
import { alphabetical } from '@/lib/utils';

// import ChallengeType from '@/components/challenges/ChallengeType';
const ChallengeType = dynamic(() => import('@/components/challenges/ChallengeType'), { ssr: false });

export default async function page() {
  const challengeTypes = await getChallengeTypes();
  challengeTypes.sort(alphabetical);
  return (
    <>
      <Back />
      <Title h1>Challenges</Title>
      <Accordion type="single" collapsible>
        {challengeTypes.map(type => {
          return <ChallengeType key={type._id} {...type} />;
        })}
      </Accordion>
    </>
  );
}
