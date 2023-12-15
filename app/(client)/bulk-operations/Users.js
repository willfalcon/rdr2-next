'use client';

import { deleteUsers } from './actions';

export default function Users() {
  return (
    <button
      onClick={async () => {
        const res = await deleteUsers();
      }}
      className="btn"
    >
      Delete Users
    </button>
  );
}
