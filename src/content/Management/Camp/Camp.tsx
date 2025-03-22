import { Card } from '@mui/material';
import CampTable from './CampTable';
import { subDays } from 'date-fns';

function Camp() {
  const camps = [
    {
      id: 'C001',
      name: 'Health Awareness Camp',
      type: 'Medical',
      description: 'A camp to raise health awareness in rural areas.',
      status: 'Ongoing',
      startDate: '2024-01-15',
      endDate: '2024-02-10',
      country: 'India',
      state: 'Maharashtra',
      district: 'Pune',
      village: 'Hinjewadi',
      gpsLatitude: "18.5912",
      gpsLongitude: "73.7389",
      assignedProjectManager: 'Manager C',
      assignedMedicalStaff: ['Dr. Michael Brown', 'Nurse Sarah Wilson'],
      driverName: 'Driver A',
      clientSponsorName: 'HealthOrg Pvt Ltd',
      created_at: new Date().getTime(),
    },
    {
      id: 'C002',
      name: 'Eye Check-up Camp',
      type: 'Medical',
      description: 'A free eye check-up camp for the elderly.',
      status: 'Planned',
      startDate: '2024-03-10',
      endDate: '2024-03-15',
      country: 'USA',
      state: 'California',
      district: 'Los Angeles',
      village: 'Downtown',
      gpsLatitude: "34.0522",
      gpsLongitude: "-118.2437",
      assignedProjectManager: 'Manager B',
      assignedMedicalStaff: ['Dr. Emily Davis', 'Nurse Robert Johnson'],
      driverName: 'Driver B',
      clientSponsorName: 'VisionCare Inc.',
      created_at: subDays(new Date(), 2).getTime(),
    },
    {
      id: 'C003',
      name: 'Dental Check-up Camp',
      type: 'Medical',
      description: 'A free dental check-up for school children.',
      status: 'Completed',
      startDate: '2023-06-20',
      endDate: '2023-06-25',
      country: 'UK',
      state: 'England',
      district: 'London',
      village: 'Camden',
      gpsLatitude: "51.5074",
      gpsLongitude: "-0.1278",
      assignedProjectManager: 'Manager C',
      assignedMedicalStaff: ['Dr. Michael Brown', 'Nurse Sarah Wilson'],
      driverName: 'Driver C',
      clientSponsorName: 'Smile Dental Foundation',
      created_at: subDays(new Date(), 5).getTime(),
    },
    {
      id: 'C004',
      name: 'Vaccination Drive',
      type: 'Medical',
      description: 'A vaccination drive for children and elderly.',
      status: 'Ongoing',
      startDate: '2024-02-05',
      endDate: '2024-02-20',
      country: 'India',
      state: 'Karnataka',
      district: 'Bangalore',
      village: 'Whitefield',
      gpsLatitude: "12.9716",
      gpsLongitude: "77.5946",
      assignedProjectManager: 'Manager C',
      assignedMedicalStaff: ['Dr. Michael Brown', 'Nurse Sarah Wilson'],
      driverName: null,
      clientSponsorName: 'HealthFirst Organization',
      created_at: subDays(new Date(), 10).getTime(),
    },
    {
      id: 'C005',
      name: 'Blood Donation Camp',
      type: 'Medical',
      description: 'A camp to collect blood donations for hospitals.',
      status: 'Planned',
      startDate: '2024-04-01',
      endDate: '2024-04-02',
      country: 'Canada',
      state: 'Ontario',
      district: 'Toronto',
      village: 'Scarborough',
      gpsLatitude: "43.65107",
      gpsLongitude: "-79.347015",
      assignedProjectManager: 'Manager B',
      assignedMedicalStaff: ['Dr. Sarah Lee', 'Nurse Kevin Smith'],
      driverName: 'Driver D',
      clientSponsorName: 'Red Cross Canada',
      created_at: subDays(new Date(), 15).getTime(),
    }
];
  

  return (
    <Card>
      <CampTable camps={camps} />
    </Card>
  );
}

export default Camp;
