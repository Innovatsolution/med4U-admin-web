import { Card } from '@mui/material';
import { RoleManagement } from '@/models/crypto_order';
import RecentOrdersTable from './RecentOrdersTable';
import { subDays } from 'date-fns';

function RecentOrders() {
  const RoleManagements: RoleManagement[] = [
    {
      id: '1',
      roleName: 'Fiat Deposit',
      status: 'completed',
    },
    {
      id: '2',
      roleName: 'Fiat Deposit',
      status: 'completed',
    },
    {
      id: '3',
      roleName: 'Fiat Deposit',
      status: 'failed',
    },
    {
      id: '4',
      roleName: 'Fiat Deposit',
      status: 'completed',
    },
    {
      id: '5',
      roleName: 'Fiat Deposit',
      status: 'pending',
    },
    {
      id: '6',
      roleName: 'Fiat Deposit',
      status: 'completed',
    },
    {
      id: '7',
      roleName: 'Fiat Deposit',
      status: 'pending',
    },
    {
      id: '8',
      roleName: 'Paypal Withdraw',
      status: 'completed',
    },
    {
      id: '9',
      roleName: 'Fiat Deposit',
      status: 'completed',
    },
    {
      id: '10',
      roleName: 'Wallet Transfer',
      status: 'failed',
    }
  ];

  return (
    <Card>
      <RecentOrdersTable RoleManagements={RoleManagements} />
    </Card>
  );
}

export default RecentOrders;
