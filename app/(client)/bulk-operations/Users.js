'use client';

import { deleteUsers } from './actions';

export default function Users() {
  return (
    <button
      onClick={async () => {
        const res = await deleteUsers();
        console.log(res);
      }}
      className="btn"
    >
      Delete Users
    </button>
  );
}
