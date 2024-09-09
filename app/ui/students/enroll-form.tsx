'use client';

import { AcademicTermForm, StudentForm, StandardsForm } from '@/app/lib/definitions';
import {
  AcademicCapIcon,
  UserIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { enrollStudent, EnrollStudentState, StudentState } from '@/app/lib/actions';
import { useActionState, useState } from 'react';

export default function EnrollStudentForm({
  student,
  terms,
  standards
}: {
  student: StudentForm;
  terms: AcademicTermForm[];
  standards: StandardsForm[];
}) {
  const initialState: EnrollStudentState = { message: null, errors: {} };
  const [selectedTerm, setSelectedTerm] = useState('');
  const enrollStudentWithId = enrollStudent.bind(null, student.studentid);
  const [state, formAction] = useActionState(enrollStudentWithId, initialState);


  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <div className='flex flex-row gap-10'>
          <div className="mb-4">
            <label htmlFor="name" className="mb-2 block text-sm font-medium">
              Student ID
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id="studentid"
                  name="studentid"
                  type="text"
                  readOnly
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                  defaultValue={student.studentid}
                />
                <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="customer" className="mb-2 block text-sm font-medium">
              Select Term ID
            </label>
            <div className="relative">
              <select
                id="termid"
                name="termid"
                className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                defaultValue=""
                onChange={(e) => setSelectedTerm(e.target.value)}
                aria-describedby="termid-error"
              >
                <option value="" disabled>
                  Select Term ID
                </option>
                {terms.map((term) => (
                  <option key={term.termid} value={term.termid}>
                    {term.year}
                  </option>
                ))}
              </select>
              <AcademicCapIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
            {/* <div id="customer-error" aria-live="polite" aria-atomic="true">
              {state.errors?.customerId &&
                state.errors.customerId.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div> */}
          </div>

          <div className="mb-4">
            <label htmlFor="customer" className="mb-2 block text-sm font-medium">
              Select Standard
            </label>
            <div className="relative">
              <select
                id="standardid"
                name="standardid"
                className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="termid-error"
              >
                <option value="" disabled>
                  Select Standard
                </option>
                {standards.filter(
                  (standard) => standard.termid.toString() === selectedTerm).map((standard) => (
                    <option key={standard.standardid} value={standard.standardid}>
                      {standard.standardid + " ( " + standard.board + " ) "}
                    </option>
                  ))}
              </select>
              <AcademicCapIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
            {/* <div id="customer-error" aria-live="polite" aria-atomic="true">
              {state.errors?.customerId &&
                state.errors.customerId.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div> */}
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/students"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Enroll Student</Button>
      </div>
    </form>
  );
}
