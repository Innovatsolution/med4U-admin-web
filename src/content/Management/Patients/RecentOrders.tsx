import { Card } from '@mui/material';
import RecentOrdersTable from './RecentOrdersTable';
import { subYears } from 'date-fns';

function RecentOrders() {
  const patients: any = [
    {
      id: 'P001',
      patientName: 'John Doe',
      dateOfBirth: subYears(new Date(), 30).toISOString().split('T')[0], // 30 years old
      gender: 'Male',
      bloodGroup: 'O+',
      maritalStatus: 'Married',
      nationality: 'American',
      profilePicture: 'https://via.placeholder.com/150', // Placeholder for profile pic
      aadharCardNumber: '1234-5678-9101',
      aadharCardPicture: 'https://via.placeholder.com/150', // Placeholder for Aadhar pic
      email: 'johndoe@example.com',
      mobileNumber: '+1 234 567 890',
      emergencyContactNumber: '+1 987 654 321',
      address: '1234 Elm Street, New York, NY',
      height: '175 cm',
      weight: '80 kg',
      medicalHistory: ['Diabetes', 'Hypertension'],
      doctorAssigned: 'Dr. Smith',
      checkingDate: new Date().toISOString().split('T')[0], // Today's date
      lifestyleHabits: ['Smoking', 'Alcohol'],
      pregnancyStatus: 'N/A'
    },
    {
      id: 'P002',
      patientName: 'Jane Smith',
      dateOfBirth: subYears(new Date(), 25).toISOString().split('T')[0], // 25 years old
      gender: 'Female',
      bloodGroup: 'A-',
      maritalStatus: 'Single',
      nationality: 'Canadian',
      profilePicture: 'https://via.placeholder.com/150',
      aadharCardNumber: '2234-5678-9102',
      aadharCardPicture: 'https://via.placeholder.com/150',
      email: 'janesmith@example.com',
      mobileNumber: '+1 987 654 321',
      emergencyContactNumber: '+1 123 456 789',
      address: '5678 Maple Avenue, Los Angeles, CA',
      height: '160 cm',
      weight: '60 kg',
      medicalHistory: ['None'],
      doctorAssigned: 'Dr. Brown',
      checkingDate: new Date().toISOString().split('T')[0],
      lifestyleHabits: ['Exercise'],
      pregnancyStatus: 'Not Pregnant'
    },
    {
      id: 'P003',
      patientName: 'Robert Johnson',
      dateOfBirth: subYears(new Date(), 40).toISOString().split('T')[0], // 40 years old
      gender: 'Male',
      bloodGroup: 'B+',
      maritalStatus: 'Married',
      nationality: 'British',
      profilePicture: 'https://via.placeholder.com/150',
      aadharCardNumber: '3234-5678-9103',
      aadharCardPicture: 'https://via.placeholder.com/150',
      email: 'robertj@example.com',
      mobileNumber: '+44 123 456 789',
      emergencyContactNumber: '+44 987 654 321',
      address: '910 Oak Street, London, UK',
      height: '180 cm',
      weight: '85 kg',
      medicalHistory: ['Hypertension'],
      doctorAssigned: 'Dr. Green',
      checkingDate: new Date().toISOString().split('T')[0],
      lifestyleHabits: ['No Smoking', 'Occasional Alcohol'],
      pregnancyStatus: 'N/A'
    }
  ];

  return (
    <Card>
      <RecentOrdersTable patients={patients} />
    </Card>
  );
}

export default RecentOrders;
