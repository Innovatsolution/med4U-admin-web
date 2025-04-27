import { FC, ChangeEvent, useState } from 'react';
import { format } from 'date-fns';
import PropTypes from 'prop-types';
import {
  Tooltip,
  Divider,
  Box,
  Card,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  CardHeader,
  Avatar
} from '@mui/material';

import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import PatientModals from './PatientForm';
import DeletePatientModal from './DeleteConfirm';
import { deleteRequest } from '@/services/api';

interface Patient {
  id: string;
  patientName: string;
  dateOfBirth: string;
  gender: string;
  bloodGroup: string;
  email: string;
  mobileNumber: string;
  emergencyContactNumber: string;
  doctorAssigned: string;
  checkingDate: string;
  profilePicture: string;
}

interface PatientTableProps {
  className?: string;
  patients: Patient[];
  onPatientRefresh: any;
}

const applyPagination = (patients: Patient[], page: number, limit: number): Patient[] => {
  return patients.slice(page * limit, page * limit + limit);
};

const PatientManagementTable: FC<PatientTableProps> = ({ patients, onPatientRefresh }) => {
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [openModal, setOpenModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [patientToDelete, setPatientToDelete] = useState<Patient | null>(null);

  // Open Delete Modal
  const handleDeletePatient = (patient: Patient) => {
    setPatientToDelete(patient);
    setOpenDeleteModal(true);
  };

  // Close Delete Modal
  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  // Confirm Delete
  const handleConfirmDelete = async(patientId: string) => {
    console.log(patientId);
    // Delete data
    const response = await deleteRequest(`/patients/${patientId}`); // Use the correct ID
    console.log('delete:', response.data);
    onPatientRefresh?.();
    setOpenDeleteModal(false);
  };

  // Open Edit Modal
  const handleEditPatient = (patient: Patient) => {
    setSelectedPatient(patient);
    setOpenModal(true);
  };

  // Close Edit Modal
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handlePageChange = (_event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const paginatedPatients = applyPagination(patients, page, limit);

  return (
    <Card>
      <CardHeader title="Patient Management" />
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Profile</TableCell>
              <TableCell>Patient Name</TableCell>
              <TableCell>Date of Birth</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Blood Group</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Mobile</TableCell>
              <TableCell>Doctor Assigned</TableCell>
              <TableCell>Checking Date</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedPatients.map((patient) => (
              <TableRow hover key={patient.id}>
                <TableCell>
                  <Avatar src={patient.profilePicture} alt={patient.patientName} />
                </TableCell>
                <TableCell>{patient.patientName}</TableCell>
                <TableCell>
                  {patient.dateOfBirth && !isNaN(new Date(patient.dateOfBirth).getTime())
                  ? format(new Date(patient.dateOfBirth), 'MMMM dd yyyy')
                  : 'N/A'}
                </TableCell>
                <TableCell>{patient.gender}</TableCell>
                <TableCell>{patient.bloodGroup}</TableCell>
                <TableCell>{patient.email}</TableCell>
                <TableCell>{patient.mobileNumber}</TableCell>
                <TableCell>{patient.doctorAssigned}</TableCell>
                <TableCell>
                  {patient.checkingDate && !isNaN(new Date(patient.checkingDate).getTime())
                  ? format(new Date(patient.checkingDate), 'MMMM dd yyyy')
                  : 'N/A'}
                </TableCell>
                <TableCell align="right">
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    {/* Edit Button */}
                    <Tooltip title="Edit Patient">
                      <IconButton color="primary" onClick={() => handleEditPatient(patient)}>
                        <EditTwoToneIcon />
                      </IconButton>
                    </Tooltip>
                    {/* Delete Button */}
                    <Tooltip title="Delete Patient">
                      <IconButton color="error" onClick={() => handleDeletePatient(patient)}>
                        <DeleteTwoToneIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box p={2}>
        <TablePagination
          component="div"
          count={patients.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25, 30]}
        />
      </Box>
      {/* Patient Modal */}
      <PatientModals open={openModal} handleClose={handleCloseModal} editPatient={selectedPatient} onPatientSuccess={onPatientRefresh}/>
      {/* Delete Patient Modal */}
      <DeletePatientModal
        open={openDeleteModal}
        handleClose={handleCloseDeleteModal}
        handleConfirm={handleConfirmDelete}
        patient={patientToDelete}
      />
    </Card>
  );
};

PatientManagementTable.propTypes = {
  patients: PropTypes.array.isRequired
};

PatientManagementTable.defaultProps = {
  patients: []
};

export default PatientManagementTable;
