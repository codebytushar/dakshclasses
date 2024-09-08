// import Form from '@/app/ui/students/edit-form';
import Breadcrumbs from '@/app/ui/students/breadcrumbs';
import { fetchStudentById } from '@/app/lib/data';
import { notFound } from 'next/navigation';


 
export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const [student] = await Promise.all([
        fetchStudentById(id),
      ]);
      if (!student) {
        notFound();
      }
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Students', href: '/dashboard/students' },
          {
            label: 'Edit Student',
            href: `/dashboard/students/${id}/edit`,
            active: true,
          },
        ]}
      />
      {/* <Form student={student} /> */}
    </main>
  );
}