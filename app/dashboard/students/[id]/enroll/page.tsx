import Form from '@/app/ui/students/enroll-form'
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
          { label: 'Students', href: '/dashboard/students' },
          {
            label: 'Enroll Student',
            href: `/dashboard/students/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form student={student} terms={terms} standards={standards}/>
    </main>
  );
}