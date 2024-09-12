import ExamDatesTable from '@/app/ui/exams/examdatestable';
import Breadcrumbs from '@/app/ui/students/breadcrumbs';
import { fetchStandards, fetchStudentById, fetchTerms } from '@/app/lib/data';
import { notFound } from 'next/navigation';


 
export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const [student] = await Promise.all([
        fetchStudentById(id),
      ]);
      if (!student) {
        notFound();
      }
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
          { label: 'Exams', href: '/dashboard/exams' },
          {
            label: 'Exam Dates',
            href: `/dashboard/exams/${id}/examdates`,
            active: false,
          },
          {
            label: `Exam ID : ${id}`,
            href: `/dashboard/exams/${id}/examdates`,
            active: true,
          },
        ]}
      />
      <ExamDatesTable testid={id}/>
    </main>
  );
}