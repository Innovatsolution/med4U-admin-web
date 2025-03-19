import { Card } from '@mui/material';
import RecentOrdersTable from './RecentOrdersTable';

function RecentOrders() {
  const RoleManagements: any = [
    {
      id: '1',
      name: 'Admin',
    },
    {
      id: '2',
      name: 'Project Manager',
    },
    {
      id: '3',
      name: 'Doctor',
    },
    {
      id: '4',
      name: 'Nurse',
    },
    {
      id: '5',
      name: 'Office Assistant',
    },
    {
      id: '6',
      name: 'Project Manager',
    },
    {
      id: '7',
      name: 'Client Sponsor',
    },
    {
      id: '8',
      name: 'Paypal Withdraw',
    }
  ];

  return (
    <Card>
      <RecentOrdersTable RoleManagements={RoleManagements} />
    </Card>
  );
}

export default RecentOrders;
