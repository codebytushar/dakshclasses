import Image from 'next/image';
import { ViewExamDates, EnterResult } from '@/app/ui/exams/buttons';
import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
import { fetchStudentsForTDID } from '@/app/lib/data';

export default async function ResultEntry({
  tdid,
}: {
  tdid: string;
}) {
  const students = await fetchStudentsForTDID(tdid);
  return (

    <div className="mt-6 flow-root">
        
      <div className="inline-block min-w-full align-middle">
        <div className="rou nded-lg bg-gray-50 p-2 md:pt-0">
        
          <table className="hidden min-w-full text-gray-900 md:table">
          {/* <caption className="text-lg font-semibold text-gray-800 p-4 bg-gray-100"> Standard : {examdates[0].standardid} <p></p>
            Board : {examdates[0].board}  <p></p>
            Exam Type : {examdates[0].type}</caption> */}
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                {/* <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Exam ID
                </th> */}
                <th scope="col" className="px-3 py-5 font-medium">
                 Student ID
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Student Name
                </th>
              
                {/* <th scope="col" className="px-3 py-5 font-medium">
                  Total Marks
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Passing Marks
                </th> */}
                {/* <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th> */}
              </tr>
            </thead>
            <tbody className="bg-white">
              {students?.map((student) => (
                <tr
                  key={student.studentid}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  {/* <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                     
                      <p>{date.testid}</p>
                    </div>
                  </td> */}
                 
                  <td className="whitespace-nowrap px-3 py-3">
                  {student.studentid}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                  {student.name}
                  </td>
               
                
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-start gap-3">

                      {/* {student.standardid ? <> </>: <EnrollStudent id={student.studentid} />}
                      {student.feespaymentstatus === 'pending' ? <AddFeesPayment id={student.studentid} /> : <></> }
                      {student.standardid ? <FeesPaymentHistory id={student.studentid} /> : <></>} */}
                      {/* <ViewExamDates id={1.to} /> */}
                      {/* <EnterResult tdid={date.tdid.toString()} /> */}
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
