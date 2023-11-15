import { groq } from 'next-sanity';
import { cache } from 'react';
import client from './client';

export const getUser = cache(async email => {
  const user = await client.fetch(
    groq`*[email == $email][0] {
      _id, email, password, name
    }`,
    { email }
  );
  return user;
});

export const getUserById = cache(async id => {
  const user = await client.fetch(
    groq`
        *[_id == $id][0] {
          email,
          _id,
          name
        }
      `,
    { id }
  );
  return user;
});

export const checkUser = cache(async token => {
  const user = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/auth/checkUser`, {
    method: 'POST',
    body: JSON.stringify({ token }),
  }).then(res => res.json());
  return user;
});

export const getList = cache(async slug => {
  const list = await client.fetch(
    groq`{
      "items": *[_type == "item" && $slug in categories[]->slug.current] {
        _id,
        name,
        materials[] {
          material-> {
            _id,
            name,
            "type": type->name,
          },
          quantity
        }
      },
      "category": *[_type == "category" && slug.current == $slug][0] {
        _id,
        name,
        vendor->{
          _id,
          name
        }
      }
    }`,
    { slug }
  );
  return list;
});

export const getTrackedItems = cache(async trackedItems => {
  const items = await client.fetch(
    groq`*[_id in $items] {
        _id,
        name,
        categories[]-> {
          _id,
          "slug": slug.current,
          name,
          vendor->{
            _id,
            name
          }
        },
        materials[] {
          quantity,
          material->{
            _id,
            name,
            "type": type->name,
            weapons[] {
              _key,
              "weapon": weapon->name,
              "ammo": ammo->name
            }
          }
        }
      }
    `,
    { items: trackedItems }
  );
  return items;
});

export const getVendorLists = cache(async () => {
  const vendors = await client.fetch(
    groq`
      *[_type == "vendor"][] | order(name asc) {
        name,
        _id,
        "lists": *[_type == "category" && vendor._ref == ^._id] | order(name asc) {
          name,
          "slug": slug.current,
          _id,
          "items": count(*[_type == "item" && ^._id in categories[]._ref])
        }
      }
    `
  );
  return vendors;
});

export const allItems = cache(async () => {
  const items = await client.fetch(groq`
    *[_type == "item"][] {
      name,
      _id,
      categories[]-> {
        _id,
        "slug": slug.current,
        name,
        vendor->{
          _id,
          name
        }
      },
      materials[] {
          quantity,
          material->{
            _id,
            name,
            "type": type->name,
            weapons[] {
              "weapon": weapon->name,
              "ammo": ammo->name,
              _key
            }
          }
        }
    }
  `);
  return items;
});

export const getRequests = cache(async () => {
  const items = await client.fetch(groq`
  *[_type == 'request'][] {
    ...,
    'name': person
  }`);
  return items;
});

export const getChallengeTypes = cache(async () => {
  const challengeTypes = await client.fetch(groq`
    *[_type == 'challengeType'][] {
      ...,
      'challenges': *[_type == 'challenge' && type._ref == ^._id] | order(tier asc) {
        ...
      }
    }
  `);
  return challengeTypes;
});
