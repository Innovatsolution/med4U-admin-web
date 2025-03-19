// 
import { Card } from '@mui/material';
import RoleManagementTable from './RecentOrdersTable';

function RecentOrders() {
  const roles: any = [
    { id: '1', roleName: 'Admin' },
    { id: '2', roleName: 'Project Manager' },
    { id: '3', roleName: 'Doctor' },
    { id: '4', roleName: 'Nurse' },
    { id: '5', roleName: 'Office Assistant' },
    { id: '6', roleName: 'Client Project Manager' },
    { id: '7', roleName: 'Client Sponsor' },
    { id: '8', roleName: 'Finance Manager' }
  ];

  return (
    <Card>
      <RoleManagementTable roles={roles} />
    </Card>
  );
}

export default RecentOrders;
