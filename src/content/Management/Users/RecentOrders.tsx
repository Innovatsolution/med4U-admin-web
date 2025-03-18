import { Card } from '@mui/material';
import RecentOrdersTable from './RecentOrdersTable';
import { subDays } from 'date-fns';

function RecentOrders() {
  const users: any = [
    {
      id: '1',
      name: 'John Doe',
      email: 'johndoe@example.com',
      mobileNumber: '+1 234 567 890',
      role: 'Admin',
      designation: 'System Administrator',
      employeeID: 'EMP001',
      created_at: new Date().getTime()
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'janesmith@example.com',
      mobileNumber: '+1 987 654 321',
      role: 'Project Manager',
      designation: 'Senior Project Manager',
      employeeID: 'EMP002',
      created_at: subDays(new Date(), 2).getTime()
    },
    {
      id: '3',
      name: 'Robert Johnson',
      email: 'robertj@example.com',
      mobileNumber: '+44 123 456 789',
      role: 'Doctor',
      designation: 'Medical Officer',
      employeeID: 'EMP003',
      created_at: subDays(new Date(), 5).getTime()
    },
    {
      id: '4',
      name: 'Emily Davis',
      email: 'emilyd@example.com',
      mobileNumber: '+91 98765 43210',
      role: 'Nurse',
      designation: 'Head Nurse',
      employeeID: 'EMP004',
      created_at: subDays(new Date(), 10).getTime()
    },
    {
      id: '5',
      name: 'Michael Brown',
      email: 'michaelb@example.com',
      mobileNumber: '+33 654 321 987',
      role: 'Office Assistant',
      designation: 'Administrative Assistant',
      employeeID: 'EMP005',
      created_at: subDays(new Date(), 15).getTime()
    },
    {
      id: '6',
      name: 'Sarah Wilson',
      email: 'sarahw@example.com',
      mobileNumber: '+49 111 222 333',
      role: 'Client Project Manager',
      designation: 'Client Representative',
      employeeID: 'EMP006',
      created_at: subDays(new Date(), 20).getTime()
    },
    {
      id: '7',
      name: 'David Martinez',
      email: 'davidm@example.com',
      mobileNumber: '+61 400 500 600',
      role: 'Client Sponsor',
      designation: 'Sponsorship Coordinator',
      employeeID: 'EMP007',
      created_at: subDays(new Date(), 30).getTime()
    }
  ];
  
  

  return (
    <Card>
      <RecentOrdersTable users={users} />
    </Card>
  );
}

export default RecentOrders;
