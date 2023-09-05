import Link from 'next/link';
import { IoIosArrowBack } from 'react-icons/io';

export default function Back() {
  return (
    <Link href="/" className="flex items-center mb-3 px-2">
      <IoIosArrowBack /> Back
    </Link>
  );
}
