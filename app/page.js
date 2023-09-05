import Title from '@/components/Title';
import client from '@/lib/client';
import Link from 'next/link';
import React from 'react';

async function getLists() {
  const vendors = await client.fetch(`*[_type == "vendor"][] | order(name asc) {
    name,
    _id,
    "lists": *[_type == "category" && vendor._ref == ^._id] | order(name asc) {
      name,
      "slug": slug.current,
      _id,
      "items": count(*[_type == "item" && ^._id in categories[]._ref])
    }
  }`);
  return { vendors };
}

export default async function Home() {
  const { vendors } = await getLists();
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
                <ul className="grid grid-cols-1 divide-y gap-2 mb-3">
                  {vendor.lists.map(list => {
                    return (
                      <li className="flex justify-between" key={list._id}>
                        <Link className="block" href={`/list/${list.slug}`}>
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
