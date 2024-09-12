import { CalendarDaysIcon, CurrencyDollarIcon, PencilIcon, PlusIcon, ScaleIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { deleteStudent } from '@/app/lib/actions';
import { PlusCircleIcon, RectangleStackIcon } from '@heroicons/react/24/solid';



export function ViewExamDates({ id }: { id: string }) {
  return (
    <Link
    href={`/dashboard/exams/${id}/examdates`}
    className="rounded-md border p-2 hover:bg-gray-100"
    >
      <CalendarDaysIcon className="w-5 fill-yellow-500" />
    </Link>
  );
}

export function EnterResult({ tdid }: { tdid: string }) {
  return (
    <Link
    href={`/dashboard/results/${tdid}/entry`}
    className="rounded-md border p-2 hover:bg-gray-100"
    >
      <ScaleIcon className="w-5 fill-yellow-500" />
    </Link>
  );
}