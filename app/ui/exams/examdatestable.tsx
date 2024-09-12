import Image from 'next/image';
import { UpdateStudent, DeleteStudent, EnrollStudent, AddFeesPayment, FeesPaymentHistory, ViewExamDates } from '@/app/ui/exams/buttons';
import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
import { fetchExamDates } from '@/app/lib/data';

export default async function ExamDatesTable({
  testid,
}: {
  testid: string;
}) {
  const examdates = await fetchExamDates(testid);

  return (

    <div className="mt-6 flow-root">
        
      <div className="inline-block min-w-full align-middle">
        <div className="rou nded-lg bg-gray-50 p-2 md:pt-0">
          {/* <div className="md:hidden">
            {students?.map((student) => (
              <div
                key={student.studentid}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <p>{student.name}</p>
                    </div>
                    <p className="text-sm text-gray-500">{student.surname}</p>
                  </div>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p>{formatDateToLocal(student.dob)}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateStudent id={student.studentid} />
                    <DeleteStudent id={student.studentid} />
                  </div>
                </div>
              </div>
            ))}
          </div> */}
        
          <table className="hidden min-w-full text-gray-900 md:table">
          <caption className="text-lg font-semibold text-gray-800 p-4 bg-gray-100"> Standard : {examdates[0].standardid} <p></p>
            Board : {examdates[0].board}  <p></p>
            Exam Type : {examdates[0].type}</caption>
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                {/* <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Exam ID
                </th> */}
                <th scope="col" className="px-3 py-5 font-medium">
                 Date
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Subject
                </th>
              
                <th scope="col" className="px-3 py-5 font-medium">
                  Total Marks
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Passing Marks
                </th>
                {/* <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th> */}
              </tr>
            </thead>
            <tbody className="bg-white">
              {examdates?.map((date) => (
                <tr
                  key={date.subjectid}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  {/* <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                     
                      <p>{date.testid}</p>
                    </div>
                  </td> */}
                 
                  <td className="whitespace-nowrap px-3 py-3">
                  {formatDateToLocal(date.date.toString())}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                  {date.subjectname}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                  {date.totalmarks}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                  {date.passingmarks}
                  </td>
                
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">

                      {/* {student.standardid ? <> </>: <EnrollStudent id={student.studentid} />}
                      {student.feespaymentstatus === 'pending' ? <AddFeesPayment id={student.studentid} /> : <></> }
                      {student.standardid ? <FeesPaymentHistory id={student.studentid} /> : <></>} */}
                      {/* <ViewExamDates id={exam.testid.toString()} /> */}
                    </div>
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
