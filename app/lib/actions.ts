'use server';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string({
    invalid_type_error: 'Please select a customer.',
  }),
  amount: z.coerce
    .number()
    .gt(0, { message: 'Please enter an amount greater than $0.' }),
  status: z.enum(['pending', 'paid'], {
    invalid_type_error: 'Please select an invoice status.',
  }),
  date: z.string(),
});

const StudentSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name must be at most 100 characters"),
  fathername: z.string().min(1, "Father Name is required").max(100, "Father's Name must be at most 100 characters"),
  surname: z.string().min(1, "Surname is Required").max(100, "Surname must be at most 100 characters"),
  dob: z.string().regex(/^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) \d{1,2}, \d{4}$/, {
    message: "Date must be in the format mmm d, yyyy or mmm dd, yyyy",}),
  mobile1: z.string().regex(/^\d{10,15}$/, "Mobile number 1 must be between 10 and 15 digits").optional(),
  mobile2: z.string().regex(/^\d{10,15}$/, "Mobile number 2 must be between 10 and 15 digits"),
  address: z.string().min(5, "Address is Required").max(255, "Address must be at most 255 characters"),
});

export type StudentState = {
  errors?: {
    name?: string[];
    fathername?: string[];
    surname?: string[];
    dob?: string[];
    mobile1?: string[];
    mobile2?: string[];
    address?: string[];
  };
  message?: string | null;
};

export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};

const CreateInvoice = FormSchema.omit({ id: true, date: true });


export async function createInvoice(prevState: State, formData: FormData) {

  //   const rawFormData = Object.fromEntries(formData.entries())


  const validatedFields = CreateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice.',
    };
  }

  const { customerId, amount, status } = validatedFields.data;

  const amountInCents = amount * 100;
  const date = new Date().toISOString().split('T')[0];
  try {
    await sql`
          INSERT INTO invoices (customer_id, amount, status, date)
          VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
        `;
  } catch (error) {

    return {
      message: 'Database Error: Failed to Create Invoice.',
    };
  }

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');

}

const UpdateInvoice = FormSchema.omit({ id: true, date: true });


export async function updateInvoice(
  id: string,
  prevState: State,
  formData: FormData,
) {
  const validatedFields = UpdateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Invoice.',
    };
  }

  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;

  try {
    await sql`
      UPDATE invoices
      SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
      WHERE id = ${id}
    `;
  } catch (error) {
    return { message: 'Database Error: Failed to Update Invoice.' };
  }

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function deleteInvoice(id: string) {
  // throw new Error('Failed to Delete Invoice');

  try {
    await sql`DELETE FROM invoices WHERE id = ${id}`;
    revalidatePath('/dashboard/invoices');
    return { message: 'Deleted Invoice.' };
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Invoice.' };
  }
}

const CreateStudent = StudentSchema.omit({});


export async function createStudent(prevState: StudentState, formData: FormData) {

  //   const rawFormData = Object.fromEntries(formData.entries())


  const validatedFields = CreateStudent.safeParse({
    name: formData.get('name'),
    fathername: formData.get('fathername'),
    surname: formData.get('surname'),
    dob: formData.get('dob'),
    mobile1: formData.get('mobile1'),
    mobile2: formData.get('mobile2'),
    address: formData.get('address'),

  });

  console.log(validatedFields.success)

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Student.',
    };
  }

  const { name, fathername, surname, dob, mobile1, mobile2, address } = validatedFields.data;

  try {
    await sql`
          INSERT INTO studentmaster (name, fathername,surname,dob,mobile1,mobile2,address)
          VALUES (${name}, ${fathername}, ${surname}, ${dob}, ${mobile1}, ${mobile2}, ${address})
        `;
  } catch (error) {
    console.log(error)
    return {
      message: 'Database Error: Failed to Create Student.',
    };
  }

  revalidatePath('/dashboard/students');
  redirect('/dashboard/students');

}

const UpdateStudent = StudentSchema.omit({});
export async function updateStudent(
  id: string,
  prevState: StudentState,
  formData: FormData,
) {
  const validatedFields = UpdateStudent.safeParse({
    name: formData.get('name'),
    fathername: formData.get('fathername'),
    surname: formData.get('surname'),
    dob: formData.get('dob'),
    mobile1: formData.get('mobile1'),
    mobile2: formData.get('mobile2'),
    address: formData.get('address'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Student.',
    };
  }

  const { name, fathername, surname, dob, mobile1, mobile2, address } = validatedFields.data;

  try {
    await sql`
      UPDATE studentmaster
      SET name = ${name}, fathername = ${fathername}, surname = ${surname}, dob = ${dob}, mobile1 = ${mobile1}, mobile2 = ${mobile2}, address = ${address}
      WHERE studentid = ${id}
    `;
  } catch (error) {
    return { message: 'Database Error: Failed to Update Student.' };
  }

  revalidatePath('/dashboard/students');
  redirect('/dashboard/students');
}

export async function deleteStudent(id: string) {
  // throw new Error('Failed to Delete Invoice');
  console.log("In deleteStudent " + id)
  try {
    await sql`DELETE FROM studentmaster WHERE studentid = ${id}`;
    revalidatePath('/dashboard/students');
    return { message: 'Deleted Student.' };
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Student.' };
  }
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}
