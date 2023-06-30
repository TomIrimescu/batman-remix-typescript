// /expenses/raw

import { getExpenses } from '~/data/expenses.server';
import { requireUserSession } from '~/data/auth.server';
import { LoaderArgs } from '@remix-run/node';

export async function loader({ request }: LoaderArgs) {
  const userId = await requireUserSession(request);
  return getExpenses(userId);
}
