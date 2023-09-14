import Title from '@/components/Title';

import { getVendorLists } from '@/lib/fetching';
import Link from 'next/link';
import React from 'react';

export default async function Home() {
  const vendors = await getVendorLists();
  return (
    <>
      <Title h1>Checklists</Title>
      <div className="px-4">
        <nav>
          <Link className="text-2xl font-medium block mb-3 border-b" href="/tracking">
            Tracking
          </Link>
          {vendors.map(vendor => {
            return (
              <React.Fragment key={vendor._id}>
                <h3 className="text-2xl font-medium">{vendor.name}</h3>
                <ul className="grid grid-cols-1 divide-y mb-3">
                  {vendor.lists.map(list => {
                    return (
                      <li className="flex justify-between items-center" key={list._id}>
                        <Link className="block grow py-4 font-medium" href={`/list/${list.slug}`}>
                          {list.name}
                        </Link>
                        <span className="text-gray-500 font-medium">{list.items}</span>
                      </li>
                    );
                  })}
                </ul>
              </React.Fragment>
            );
          })}
          <Link className="text-2xl font-medium block mb-3 border-b" href="/all">
            All Materials
          </Link>
        </nav>
      </div>
    </>
  );
}
