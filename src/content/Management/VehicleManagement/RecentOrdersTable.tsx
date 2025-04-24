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
  CardHeader
} from '@mui/material';

import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import VehicleModals from './vehicleForm';
import DeleteVehicleModal from './DeleteConfirm';
import { deleteRequest } from '@/services/api';

interface Vehicle {
  id: string;
  vehicleNumber: string;
  driverName: string;
  driverEmail: string;
  driverMobileNumber: string;
  employeeID: string;
  gender: string;
  insuranceClosingDate: string;
  insuranceNumber: string;
  address: string;
}

interface VehicleTableProps {
  className?: string;
  vehicles: Vehicle[];
  onVehicleRefresh: any;
}

const applyPagination = (vehicles: Vehicle[], page: number, limit: number): Vehicle[] => {
  return vehicles.slice(page * limit, page * limit + limit);
};

const VehicleManagementTable: FC<VehicleTableProps> = ({ vehicles, onVehicleRefresh }) => {
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [openModal, setOpenModal] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [vehicleToDelete, setVehicleToDelete] = useState<Vehicle | null>(null);

  // Open Delete Modal
  const handleDeleteVehicle = (vehicle: Vehicle) => {
    setVehicleToDelete(vehicle);
    setOpenDeleteModal(true);
  };

  // Close Delete Modal
  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  // Confirm Delete
  const handleConfirmDelete = async (vehicleId: string) => {
    console.log(vehicleId);
    // Delete data
    const response = await deleteRequest(`/vehicles/${vehicleId}`); // Use the correct ID
    console.log('delete:', response.data);
    onVehicleRefresh?.();
    setOpenDeleteModal(false);
  };

  // Open Edit Modal
  const handleEditVehicle = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
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

  const paginatedVehicles = applyPagination(vehicles, page, limit);

  return (
    <Card>
      <CardHeader title="Vehicle Management" />
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Vehicle Number</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Mobile</TableCell>
              {/* <TableCell>Emp ID</TableCell> */}
              {/* <TableCell>Gender</TableCell> */}
              <TableCell>Insurance Closing Date</TableCell>
              <TableCell>Insurance Number</TableCell>
              {/* <TableCell>Address</TableCell> */}
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedVehicles.map((vehicle) => (
              <TableRow hover key={vehicle.id}>
                <TableCell>{vehicle.vehicleNumber}</TableCell>
                <TableCell>{vehicle.driverName}</TableCell>
                <TableCell>{vehicle.driverEmail}</TableCell>
                <TableCell>{vehicle.driverMobileNumber}</TableCell>
                {/* <TableCell>{vehicle.employeeID}</TableCell> */}
                {/* <TableCell>{vehicle.gender}</TableCell> */}
                <TableCell>{format(new Date(vehicle.insuranceClosingDate), 'MMMM dd yyyy')}</TableCell>
                <TableCell>{vehicle.insuranceNumber}</TableCell>
                {/* <TableCell>{vehicle.address}</TableCell> */}
                <TableCell align="right">
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    {/* Edit Button */}
                    <Tooltip title="Edit Vehicle">
                      <IconButton color="primary" onClick={() => handleEditVehicle(vehicle)}>
                        <EditTwoToneIcon />
                      </IconButton>
                    </Tooltip>
                    {/* Delete Button */}
                    <Tooltip title="Delete Vehicle">
                      <IconButton color="error" onClick={() => handleDeleteVehicle(vehicle)}>
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
          count={vehicles.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25, 30]}
        />
      </Box>
      {/* Vehicle Modal */}
      <VehicleModals open={openModal} handleClose={handleCloseModal} editVehicle={selectedVehicle} onVehicleSuccess={onVehicleRefresh}/>
      {/* Delete Vehicle Modal */}
      <DeleteVehicleModal open={openDeleteModal} handleClose={handleCloseDeleteModal} handleConfirm={handleConfirmDelete} vehicle={vehicleToDelete} />
    </Card>
  );
};

VehicleManagementTable.propTypes = {
  vehicles: PropTypes.array.isRequired
};

VehicleManagementTable.defaultProps = {
  vehicles: []
};

export default VehicleManagementTable;
