// /expenses/analysis

import { LoaderArgs, MetaFunction, json } from '@remix-run/node';
import { useLoaderData, useCatch } from '@remix-run/react';

import ExpenseStatistics from '~/components/expenses/ExpenseStatistics';
import Chart from '~/components/expenses/Chart';
import { getExpenses } from '~/data/expenses.server';
import Error from '~/components/util/Error';
import { requireUserSession } from '~/data/auth.server';

export default function ExpensesAnalysisPage() {
  const expenses = useLoaderData();

  return (
    <main>
      <Chart expenses={expenses} />
      <ExpenseStatistics expenses={expenses} />
    </main>
  );
}

export async function loader({ request }: LoaderArgs) {
  const userId = await requireUserSession(request);

  const expenses = await getExpenses(userId);

  if (!expenses || expenses.length === 0) {
    throw json(
      {
        message: 'Could not load expenses for the requested analysis',
      },
      { status: 404, statusText: 'Expenses not found' }
    );
  }

  return expenses;
}

export function CatchBoundary() {
  const caughtResponse = useCatch();

  return (
    <main>
      <Error title={caughtResponse.statusText}>
        <p>
          {caughtResponse.data?.message ||
            'Something went wrong - could not load expenses.'}
        </p>
      </Error>
    </main>
  );
}

export const meta: MetaFunction = () => {
  return {
    title: 'Analyze expenses',
    description: 'View your monthly expenses.',
  };
};
