import { Card } from '@mui/material';
import RecentOrdersTable from './RecentOrdersTable';
import { subDays } from 'date-fns';

function RecentOrders() {
  const vehicles: any = [
    {
      id: '1',
      vehicleNumber: 'ABC-1234',
      driverName: 'John Doe',
      driverEmail: 'johndoe@example.com',
      driverMobileNumber: '+1 234 567 890',
      employeeID: 'EMP001',
      gender: 'Male',
      insuranceClosingDate: new Date().toISOString().split('T')[0], // Today's date
      insuranceNumber: 'INS-98765',
      address: '1234 Elm Street, New York, NY'
    },
    {
      id: '2',
      vehicleNumber: 'XYZ-5678',
      driverName: 'Jane Smith',
      driverEmail: 'janesmith@example.com',
      driverMobileNumber: '+1 987 654 321',
      employeeID: 'EMP002',
      gender: 'Female',
      insuranceClosingDate: subDays(new Date(), 2).toISOString().split('T')[0], // 2 days ago
      insuranceNumber: 'INS-12345',
      address: '5678 Maple Avenue, Los Angeles, CA'
    },
    {
      id: '3',
      vehicleNumber: 'LMN-4321',
      driverName: 'Robert Johnson',
      driverEmail: 'robertj@example.com',
      driverMobileNumber: '+44 123 456 789',
      employeeID: 'EMP003',
      gender: 'Male',
      insuranceClosingDate: subDays(new Date(), 5).toISOString().split('T')[0], // 5 days ago
      insuranceNumber: 'INS-54321',
      address: '910 Oak Street, London, UK'
    },
    {
      id: '4',
      vehicleNumber: 'DEF-7890',
      driverName: 'Emily Davis',
      driverEmail: 'emilyd@example.com',
      driverMobileNumber: '+91 98765 43210',
      employeeID: 'EMP004',
      gender: 'Female',
      insuranceClosingDate: subDays(new Date(), 10).toISOString().split('T')[0], // 10 days ago
      insuranceNumber: 'INS-67890',
      address: '111 Pine Road, Mumbai, India'
    },
    {
      id: '5',
      vehicleNumber: 'PQR-4567',
      driverName: 'Michael Brown',
      driverEmail: 'michaelb@example.com',
      driverMobileNumber: '+33 654 321 987',
      employeeID: 'EMP005',
      gender: 'Male',
      insuranceClosingDate: subDays(new Date(), 15).toISOString().split('T')[0], // 15 days ago
      insuranceNumber: 'INS-34567',
      address: '222 Birch Lane, Paris, France'
    },
    {
      id: '6',
      vehicleNumber: 'GHI-6543',
      driverName: 'Sarah Wilson',
      driverEmail: 'sarahw@example.com',
      driverMobileNumber: '+49 111 222 333',
      employeeID: 'EMP006',
      gender: 'Female',
      insuranceClosingDate: subDays(new Date(), 20).toISOString().split('T')[0], // 20 days ago
      insuranceNumber: 'INS-45678',
      address: '333 Cedar Street, Berlin, Germany'
    },
    {
      id: '7',
      vehicleNumber: 'TUV-9876',
      driverName: 'David Martinez',
      driverEmail: 'davidm@example.com',
      driverMobileNumber: '+61 400 500 600',
      employeeID: 'EMP007',
      gender: 'Male',
      insuranceClosingDate: subDays(new Date(), 30).toISOString().split('T')[0], // 30 days ago
      insuranceNumber: 'INS-78901',
      address: '444 Redwood Avenue, Sydney, Australia'
    }
  ];

  return (
    <Card>
      <RecentOrdersTable vehicles={vehicles} />
    </Card>
  );
}

export default RecentOrders;
