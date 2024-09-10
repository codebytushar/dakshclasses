import { sql } from '@vercel/postgres';
import {
  AcademicTermForm,
  CustomerField,
  CustomersTableType,
  InvoiceForm,
  InvoicesTable,
  LatestInvoiceRaw,
  Revenue,
  StandardsForm,
  StandardsTable,
  StudentForm,
  StudentsTable,
} from './definitions';
import { formatCurrency } from './utils';

export async function fetchRevenue() {
  try {
    // Artificially delay a response for demo purposes.
    // Don't do this in production :)

    // console.log('Fetching revenue data...');
    // await new Promise((resolve) => setTimeout(resolve, 3000));

    const data = await sql<Revenue>`SELECT * FROM revenue`;

    // console.log('Data fetch completed after 3 seconds.');

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

export async function fetchLatestInvoices() {
  try {
    const data = await sql<LatestInvoiceRaw>`
      SELECT invoices.amount, customers.name, customers.image_url, customers.email, invoices.id
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      ORDER BY invoices.date DESC
      LIMIT 5`;

    const latestInvoices = data.rows.map((invoice) => ({
      ...invoice,
      amount: formatCurrency(invoice.amount),
    }));
    return latestInvoices;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest invoices.');
  }
}

export async function fetchCardData() {
  try {
    // You can probably combine these into a single SQL query
    // However, we are intentionally splitting them to demonstrate
    // how to initialize multiple queries in parallel with JS.
    const invoiceCountPromise = sql`SELECT COUNT(*) FROM invoices`;
    const customerCountPromise = sql`SELECT COUNT(*) FROM customers`;
    const invoiceStatusPromise = sql`SELECT
         SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
         SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
         FROM invoices`;

    const data = await Promise.all([
      invoiceCountPromise,
      customerCountPromise,
      invoiceStatusPromise,
    ]);

    const numberOfInvoices = Number(data[0].rows[0].count ?? '0');
    const numberOfCustomers = Number(data[1].rows[0].count ?? '0');
    const totalPaidInvoices = formatCurrency(data[2].rows[0].paid ?? '0');
    const totalPendingInvoices = formatCurrency(data[2].rows[0].pending ?? '0');

    return {
      numberOfCustomers,
      numberOfInvoices,
      totalPaidInvoices,
      totalPendingInvoices,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredInvoices(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const invoices = await sql<InvoicesTable>`
      SELECT
        invoices.id,
        invoices.amount,
        invoices.date,
        invoices.status,
        customers.name,
        customers.email,
        customers.image_url
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      WHERE
        customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`} OR
        invoices.amount::text ILIKE ${`%${query}%`} OR
        invoices.date::text ILIKE ${`%${query}%`} OR
        invoices.status ILIKE ${`%${query}%`}
      ORDER BY invoices.date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return invoices.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices.');
  }
}

export async function fetchFilteredStudents(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const studentmaster = await sql<StudentsTable>`
    SELECT 
    sm.studentid,
    sm.name,
    sm.fathername,
    sm.surname,
    sm.dob,
    sm.mobile1,
    sm.mobile2,
    sm.address,
    s.standardid,
    s.board,
    e.termid,
    f.amount,
    e.feespaymentstatus
FROM 
    StudentMaster as sm
LEFT JOIN 
    Enrollment as e ON sm.studentid = e.studentid
LEFT JOIN 
    Standard as s ON e.standardid = s.standardid
LEFT JOIN
    Fees as f ON s.standardid = f.standardid
      WHERE
        sm.name ILIKE ${`%${query}%`} OR
        sm.surname ILIKE ${`%${query}%`} OR
        sm.address ILIKE ${`%${query}%`} OR
        sm.dob::text ILIKE ${`%${query}%`}
      ORDER BY sm.studentid DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return studentmaster.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch studentmaster.');
  }
}

export async function fetchStudentssPages(query: string) {
  console.log(query)
  try {
    const count = await sql`SELECT COUNT(*)
    FROM studentmaster
    WHERE
      studentmaster.name ILIKE ${`%${query}%`} OR
      studentmaster.surname ILIKE ${`%${query}%`} OR
      studentmaster.address ILIKE ${`%${query}%`} OR
      studentmaster.dob::text ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of students.');
  }
}

export async function fetchInvoicesPages(query: string) {
  try {
    const count = await sql`SELECT COUNT(*)
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE
      customers.name ILIKE ${`%${query}%`} OR
      customers.email ILIKE ${`%${query}%`} OR
      invoices.amount::text ILIKE ${`%${query}%`} OR
      invoices.date::text ILIKE ${`%${query}%`} OR
      invoices.status ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}

export async function fetchInvoiceById(id: string) {
  try {
    const data = await sql<InvoiceForm>`
      SELECT
        invoices.id,
        invoices.customer_id,
        invoices.amount,
        invoices.status
      FROM invoices
      WHERE invoices.id = ${id};
    `;

    const invoice = data.rows.map((invoice) => ({
      ...invoice,
      // Convert amount from cents to dollars
      amount: invoice.amount / 100,
    }));

    return invoice[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoice.');
  }
}

export async function fetchStudentById(id: string) {
  try {
    const data = await sql<StudentForm>`
      SELECT
        studentmaster.studentid,
        studentmaster.name,
        studentmaster.fathername,
        studentmaster.surname,
        studentmaster.dob,
        studentmaster.mobile1,
        studentmaster.mobile2,
        studentmaster.address
      FROM studentmaster
      WHERE studentmaster.studentid = ${id};
    `;

    return data.rows[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch student.');
  }
}

export async function fetchTerms() {
  try {
    const data = await sql<AcademicTermForm>`
      SELECT
        termid,
        year,
        semester,
        startdate,
        enddate
      FROM academicterms
      ORDER BY termid ASC
    `;

    const terms = data.rows;
    return terms;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch academic terms.');
  }
}

export async function fetchStandards() {
  try {
    const data = await sql<StandardsForm>`
      SELECT
        standardid,
        board,
        termid
      FROM standard
      ORDER BY standardid ASC
    `;

    const standards = data.rows;
    return standards;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch Standards.');
  }
}

export async function fetchFilteredStandards(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const standards = await sql<StandardsTable>`
    SELECT 
    s.standardid, 
    s.board, 
    s.termid, 
    at.year, 
    COUNT(e.studentid) AS students
FROM 
    Standard s
JOIN 
    AcademicTerms at ON s.termid = at.termid
LEFT JOIN 
    enrollment e ON s.standardid = e.standardid AND e.termid = s.termid AND e.enrollmentstatus = 'active'
GROUP BY 
    s.standardid, s.board, s.termid, at.year
ORDER BY s.standardid;
    `;

    return standards.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch studentmaster.');
  }
}

export async function fetchCustomers() {
  try {
    const data = await sql<CustomerField>`
      SELECT
        id,
        name
      FROM customers
      ORDER BY name ASC
    `;

    const customers = data.rows;
    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all customers.');
  }
}

export async function fetchFilteredCustomers(query: string) {
  try {
    const data = await sql<CustomersTableType>`
		SELECT
		  customers.id,
		  customers.name,
		  customers.email,
		  customers.image_url,
		  COUNT(invoices.id) AS total_invoices,
		  SUM(CASE WHEN invoices.status = 'pending' THEN invoices.amount ELSE 0 END) AS total_pending,
		  SUM(CASE WHEN invoices.status = 'paid' THEN invoices.amount ELSE 0 END) AS total_paid
		FROM customers
		LEFT JOIN invoices ON customers.id = invoices.customer_id
		WHERE
		  customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`}
		GROUP BY customers.id, customers.name, customers.email, customers.image_url
		ORDER BY customers.name ASC
	  `;

    const customers = data.rows.map((customer) => ({
      ...customer,
      total_pending: formatCurrency(customer.total_pending),
      total_paid: formatCurrency(customer.total_paid),
    }));

    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch customer table.');
  }
}
