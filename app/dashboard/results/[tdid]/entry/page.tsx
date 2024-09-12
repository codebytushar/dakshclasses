import ResultEntry from '@/app/ui/results/resultsentry';
import Breadcrumbs from '@/app/ui/students/breadcrumbs';
import { fetchStandards, fetchStudentById, fetchTerms } from '@/app/lib/data';
import { notFound } from 'next/navigation';


 
export default async function Page({ params }: { params: { tdid: string } }) {
    const id = params.tdid;
    console.log("HHHHH" + id)
    const [student] = await Promise.all([
        fetchStudentById(id),
      ]);
      // if (!student) {
      //   notFound();
      // }
      const [terms] = await Promise.all([
        fetchTerms(),
      ]);
      const [standards] = await Promise.all([
        fetchStandards(),
      ]);
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Results', href: '/dashboard/exams' },
          {
            label: 'Result Entry',
            href: `/dashboard/exams/${id}/examdates`,
            active: false,
          },
        
        ]}
      />
      {/* <ExamDatesTable testid={id}/> */}
      <ResultEntry tdid={id}/>
    </main>
  );
}