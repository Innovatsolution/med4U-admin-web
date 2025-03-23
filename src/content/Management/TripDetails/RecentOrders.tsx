import { Card } from '@mui/material';
import RecentOrdersTable from './RecentOrdersTable';
import { subDays } from 'date-fns';

function RecentOrders() {
  const trips: any = [
    {
      id: '1',
      vehicleNumber: 'ABC-1234',
      tripType: 'Camp Visit',
      driverName: 'John Doe',
      tripDate: new Date().toISOString().split('T')[0], // Today's date
      tripStatus: 'Completed',
      startLocation: 'New York, NY',
      startGPS: '40.7128, -74.0060',
      startTime: '08:30 AM',
      endLocation: 'Philadelphia, PA',
      endGPS: '39.9526, -75.1652',
      endTime: '12:45 PM',
      totalDistance: 150, // KM
      fuelRefillingAmount: 50, // In currency
      fuelRefillingLocation: 'Gas Station NYC',
      speedometerBefore: 10500,
      speedometerAfter: 10650,
      vehicleIssues: 'No',
      issueDescription: '',
      attachments: []
    },
    {
      id: '2',
      vehicleNumber: 'XYZ-5678',
      tripType: 'Emergency Response',
      driverName: 'Jane Smith',
      tripDate: subDays(new Date(), 2).toISOString().split('T')[0], // 2 days ago
      tripStatus: 'Ongoing',
      startLocation: 'Los Angeles, CA',
      startGPS: '34.0522, -118.2437',
      startTime: '07:15 AM',
      endLocation: 'San Diego, CA',
      endGPS: '32.7157, -117.1611',
      endTime: '10:30 AM',
      totalDistance: 200, // KM
      fuelRefillingAmount: 60, // In currency
      fuelRefillingLocation: 'Fuel Stop LA',
      speedometerBefore: 7800,
      speedometerAfter: 8000,
      vehicleIssues: 'Yes',
      issueDescription: 'Brake issue reported',
      attachments: ['brake_issue_photo.jpg']
    },
    {
      id: '3',
      vehicleNumber: 'LMN-4321',
      tripType: 'Supply Delivery',
      driverName: 'Robert Johnson',
      tripDate: subDays(new Date(), 5).toISOString().split('T')[0], // 5 days ago
      tripStatus: 'Completed',
      startLocation: 'London, UK',
      startGPS: '51.5074, -0.1278',
      startTime: '09:00 AM',
      endLocation: 'Manchester, UK',
      endGPS: '53.4808, -2.2426',
      endTime: '12:30 PM',
      totalDistance: 300, // KM
      fuelRefillingAmount: 80, // In currency
      fuelRefillingLocation: 'Shell Gas Station London',
      speedometerBefore: 15000,
      speedometerAfter: 15300,
      vehicleIssues: 'No',
      issueDescription: '',
      attachments: []
    }
  ];

  return (
    <Card>
      <RecentOrdersTable trips={trips} />
    </Card>
  );
}

export default RecentOrders;
