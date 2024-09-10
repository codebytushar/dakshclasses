import Image from 'next/image';
import { UpdateStudent, DeleteStudent, EnrollStudent } from '@/app/ui/students/buttons';
import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
import { fetchFilteredStandards } from '@/app/lib/data';

export default async function StandardsTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const standards = await fetchFilteredStandards(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {standards?.map((standard) => (
              <div
                key={standard.standardid}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <p>{standard.standardid}</p>
                    </div>
                    <p className="text-sm text-gray-500">{standard.board}</p>
                  </div>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p>{standard.termid}</p>
                  </div>
                  <div>
                    <p>{standard.year}</p>
                  </div>
                  <div>
                    <p>{standard.students}</p>
                  </div>
                  {/* <div className="flex justify-end gap-2">
                    <UpdateStudent id={student.studentid} />
                    <DeleteStudent id={student.studentid} />
                  </div> */}
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Standard ID
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Board
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Term ID
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Year
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Students
                </th>
              
                {/* <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th> */}
              </tr>
            </thead>
            <tbody className="bg-white">
              {standards?.map((standard) => (
                <tr
                  key={standard.standardid}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                     
                      <p>{standard.standardid}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {standard.board}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                  {standard.termid}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                  {standard.year}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {standard.students}
                  </td>
                 
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
