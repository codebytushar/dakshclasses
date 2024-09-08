'use client';

import { CustomerField } from '@/app/lib/definitions';
import Link from 'next/link';
import {
  UserIcon,
  DocumentIcon,
  PhoneIcon,
  DocumentTextIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createStudent, StudentState } from '@/app/lib/actions';
import { useActionState } from 'react';



export default function Form({ customers }: { customers: CustomerField[] }) {
  const initialState: StudentState = { message: '', errors: {} };
  const [state, formAction] = useActionState(createStudent, initialState);

  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <div className='flex flex-row gap-10'>
          <div className="mb-4">
            <label htmlFor="name" className="mb-2 block text-sm font-medium">
              Enter Stuent Name
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter Student Name"
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                  aria-describedby="name-error"
                />
                <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
              <div id="name-error" aria-live="polite" aria-atomic="true">
                {state.errors?.name &&
                  state.errors.name.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="fathername" className="mb-2 block text-sm font-medium">
              Enter Parent Name
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id="fathername"
                  name="fathername"
                  type="text"
                  placeholder="Enter Parent Name"
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                  aria-describedby="fathername-error"
                />
                <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
              <div id="fathername-error" aria-live="polite" aria-atomic="true">
                {state.errors?.fathername &&
                  state.errors.fathername.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="surname" className="mb-2 block text-sm font-medium">
              Enter SurName
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id="surname"
                  name="surname"
                  type="text"
                  placeholder="Enter SurName"
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                  aria-describedby="surname-error"
                />
                <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
              <div id="surname-error" aria-live="polite" aria-atomic="true">
                {state.errors?.surname &&
                  state.errors.surname.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
            </div>
          </div>
        </div>
        <div className='flex flex-row gap-10'>

          <div className="mb-5">
            <label htmlFor="dob" className="mb-2 block text-sm font-medium">
              Enter Birth Date
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id="dob"
                  name="dob"
                  type="text"
                  placeholder="Birthdate(YYYY-MM-DD)"
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                  aria-describedby="dob-error"
                />
                <CalendarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
              <div id="dob-error" aria-live="polite" aria-atomic="true">
                {state.errors?.dob &&
                  state.errors.dob.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="mobile1" className="mb-2 block text-sm font-medium">
              Enter Mobile 1
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id="mobile1"
                  name="mobile1"
                  type="text"
                  placeholder="Enter Mobile 1"
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                  aria-describedby="mobile1-error"
                />
                <PhoneIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
              <div id="mobile1-error" aria-live="polite" aria-atomic="true">
                {state.errors?.mobile1 &&
                  state.errors.mobile1.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="mobile2" className="mb-2 block text-sm font-medium">
              Enter Mobile 2
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id="mobile2"
                  name="mobile2"
                  type="text"
                  placeholder="Enter Mobile 2"
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                  aria-describedby="mobile2-error"
                />
                <PhoneIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
              <div id="mobile1-error" aria-live="polite" aria-atomic="true">
                {state.errors?.mobile2 &&
                  state.errors.mobile2.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
            </div>
          </div>
        </div>




        <div className="mb-4">
          <label htmlFor="address" className="mb-2 block text-sm font-medium">
            Enter Address
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="address"
                name="address"
                type="text"
                placeholder="Enter Address"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="address-error"
              />
              <DocumentTextIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="address-error" aria-live="polite" aria-atomic="true">
              {state.errors?.address &&
                state.errors.address.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
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
        <Button type="submit">Create Student</Button>
      </div>
    </form>
  );
}
