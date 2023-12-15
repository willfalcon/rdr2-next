'use client';

import { useSelector } from 'react-redux';

export default function TrackingCount() {
  const count = useSelector(state => state.status.filter(item => item.status === 2).length);
  return <span className="text-gray-500 font-medium text-sm">{count} items</span>;
}
