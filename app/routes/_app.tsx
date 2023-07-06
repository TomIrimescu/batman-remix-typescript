import { LinksFunction, LoaderArgs } from '@remix-run/node';
import { Outlet } from '@remix-run/react';
import ExpensesHeader from '~/components/navigation/ExpenseHeader';

import { getUserFromSession } from '~/data/auth.server';
import expensesStyles from '~/styles/expenses.css';

export default function ExpensesAppLayout() {
  return (
    <>
      <ExpensesHeader />
      <Outlet />
    </>
  );
}

export function loader({ request }: LoaderArgs) {
  return getUserFromSession(request);
}

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: expensesStyles }];
};
