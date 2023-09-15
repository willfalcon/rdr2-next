'use client';

import { useState } from 'react';
import classNames from 'classnames';
import dynamic from 'next/dynamic';

const Material = dynamic(() => import('../tracking/Material'), { ssr: false });

export default function MaterialsList({ materials }) {
  const [mode, setMode] = useState('manage');
  return (
    <>
      <div className="px-4">
        <div className="tabs tabs-boxed inline-flex">
          <button className={classNames('tab', { 'tab-active': mode === 'manage' })} onClick={() => setMode('manage')}>
            Manage
          </button>
          <button className={classNames('tab', { 'tab-active': mode === 'weapons' })} onClick={() => setMode('weapons')}>
            Weapons
          </button>
        </div>
      </div>
      <ul className="mb-3">
        {materials.map(material => {
          return <Material key={material.id} {...material} mode={mode} />;
        })}
      </ul>
    </>
  );
}
