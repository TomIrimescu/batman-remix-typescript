// /expenses/add

import { ActionArgs, MetaFunction, redirect } from '@remix-run/node';
import { useNavigate } from '@remix-run/react';

import Modal from '~/components/util/Modal';
import ExpenseForm from '~/components/expenses/ExpenseForm';

import { addExpense } from '~/data/expenses.server';
import { validateExpenseInput } from '~/data/validation.server';
import { requireUserSession } from '~/data/auth.server';

export default function AddExpensesPage() {
  const navigate = useNavigate();

  function closeHandler() {
    // navigate programmatically
    navigate('..');
  }

  return (
    <>
      <Modal onClose={closeHandler}>
        <ExpenseForm title={''} amount={0} date={''} />
      </Modal>
    </>
  );
}

export async function action({ request }: ActionArgs) {
  const userId = await requireUserSession(request);

  const formData = await request.formData();
  const expenseData = Object.fromEntries(formData);

  try {
    validateExpenseInput(expenseData);
  } catch (error) {
    return error;
  }

  await addExpense(expenseData, userId);
  return redirect('/expenses');
}

export const meta: MetaFunction = () => {
  return {
    title: 'Add an expense',
    description: 'Add an expense with ease.',
  };
};
