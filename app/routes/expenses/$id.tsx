// /expenses/<some-id> => /expenses/expense-1, /expenses/e-1

import { ActionArgs, MetaFunction, redirect } from '@remix-run/node';
import { useNavigate } from '@remix-run/react';

import ExpenseForm from '~/components/expenses/ExpenseForm';
import ModalRoute from '~/components/util/ModalRoute';
import { deleteExpense, updateExpense } from '~/data/expenses.server';
import { validateExpenseInput } from '~/data/validation.server';

export default function UpdateExpensesPage() {
  const navigate = useNavigate();

  function closeHandler() {
    // navigate programmatically
    navigate('..');
  }

  return (
    <ModalRoute onClose={closeHandler}>
      <ExpenseForm title={''} amount={0} date={''} />
    </ModalRoute>
  );
}

export async function action({ params, request }: ActionArgs) {
  const expenseId = params.id;

  if (request.method === 'PATCH') {
    const formData = await request.formData();
    const expenseData = Object.fromEntries(formData);

    try {
      validateExpenseInput(expenseData);
    } catch (error) {
      return error;
    }

    await updateExpense(expenseId, expenseData);
    return redirect('/expenses');
  } else if (request.method === 'DELETE') {
    await deleteExpense(expenseId);
    return { deletedId: expenseId };
    // return redirect('/expenses');
  }
}

export const meta: MetaFunction = ({ params, parentsData }) => {
  const expense = parentsData['routes/__app/expenses'].find(
    (expense: { id: string | undefined }) => expense.id === params.id
  );
  return {
    title: expense.title,
    description: 'Update expense.',
  };
};
