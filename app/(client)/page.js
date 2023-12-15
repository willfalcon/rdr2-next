import Title from '@/components/Title';
import TrackingCount from '@/components/TrackingCount';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import { getVendorLists } from '@/lib/fetching';
import Link from 'next/link';

import { Fragment } from 'react';

export default async function Home() {
  const vendors = await getVendorLists();

  return (
    <>
      <Title h1>Checklists</Title>
      <div className="px-4 space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>
              <Link className="" href="/tracking">
                Tracking
              </Link>
            </CardTitle>
            <CardDescription>
              <TrackingCount />
            </CardDescription>
          </CardHeader>
        </Card>
        <Title>Craftables</Title>
        <Accordion type="multiple">
          {vendors.map(vendor => {
            return (
              <Fragment key={vendor._id}>
                <AccordionItem value={vendor._id}>
                  <AccordionTrigger>{vendor.name}</AccordionTrigger>
                  <AccordionContent>
                    <ul className="">
                      {vendor.lists.map(list => {
                        return (
                          <li className="" key={list._id}>
                            <Button variant="ghost" className="w-full flex justify-between">
                              <Link className="" href={`/list/${list.slug}`}>
                                {list.name}
                              </Link>
                              <span className="">{list.items}</span>
                            </Button>
                          </li>
                        );
                      })}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Fragment>
            );
          })}
        </Accordion>
        <div className="flex flex-col gap-3 items-start">
          <Button variant="secondary">
            <Link className="" href="/all">
              All Materials
            </Link>
          </Button>
          <Button variant="secondary">
            <Link className="" href="/requests">
              Companion Item Requests
            </Link>
          </Button>
          <Button variant="secondary">
            <Link className="" href="/challenges">
              Challenges
            </Link>
          </Button>
        </div>
      </div>
    </>
  );
}
