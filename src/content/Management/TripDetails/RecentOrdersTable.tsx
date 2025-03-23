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

interface VehicleTrip {
  id: string;
  vehicleNumber: string;
  tripType: string;
  driverName: string;
  tripDate: string;
  tripStatus: string;
  startLocation: string;
  startGPS: string;
  startTime: string;
  endLocation: string;
  endGPS: string;
  endTime: string;
  totalDistance: number;
  fuelRefillingAmount: number;
  fuelRefillingLocation: string;
  speedometerBefore: number;
  speedometerAfter: number;
  vehicleIssues: string;
  issueDescription: string;
  attachments: string[];
}

interface VehicleTripTableProps {
  className?: string;
  trips: VehicleTrip[];
}

const applyPagination = (trips: VehicleTrip[], page: number, limit: number): VehicleTrip[] => {
  return trips.slice(page * limit, page * limit + limit);
};

const VehicleManagementTable: FC<VehicleTripTableProps> = ({ trips }) => {
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [openModal, setOpenModal] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState<VehicleTrip | null>(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [tripToDelete, setTripToDelete] = useState<VehicleTrip | null>(null);

  // Open Delete Modal
  const handleDeleteTrip = (trip: VehicleTrip) => {
    setTripToDelete(trip);
    setOpenDeleteModal(true);
  };

  // Close Delete Modal
  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  // Confirm Delete
  const handleConfirmDelete = (tripId: string) => {
    console.log(tripId);
    setOpenDeleteModal(false);
  };

  // Open Edit Modal
  const handleEditTrip = (trip: VehicleTrip) => {
    setSelectedTrip(trip);
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

  const paginatedTrips = applyPagination(trips, page, limit);

  return (
    <Card>
      <CardHeader title="Vehicle Trip Management" />
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Vehicle Number</TableCell>
              <TableCell>Trip Type</TableCell>
              <TableCell>Driver Name</TableCell>
              <TableCell>Trip Date</TableCell>
              <TableCell>Trip Status</TableCell>
              <TableCell>Start Location</TableCell>
              <TableCell>End Location</TableCell>
              <TableCell>Total Distance (KM)</TableCell>
              <TableCell>Fuel Refilling Amount</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedTrips.map((trip) => (
              <TableRow hover key={trip.id}>
                <TableCell>{trip.vehicleNumber}</TableCell>
                <TableCell>{trip.tripType}</TableCell>
                <TableCell>{trip.driverName}</TableCell>
                <TableCell>{format(new Date(trip.tripDate), 'MMMM dd yyyy')}</TableCell>
                <TableCell>{trip.tripStatus}</TableCell>
                <TableCell>{trip.startLocation}</TableCell>
                <TableCell>{trip.endLocation}</TableCell>
                <TableCell>{trip.totalDistance} KM</TableCell>
                <TableCell>${trip.fuelRefillingAmount}</TableCell>
                <TableCell align="right">
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    {/* Edit Button */}
                    <Tooltip title="Edit Trip">
                      <IconButton color="primary" onClick={() => handleEditTrip(trip)}>
                        <EditTwoToneIcon />
                      </IconButton>
                    </Tooltip>
                    {/* Delete Button */}
                    <Tooltip title="Delete Trip">
                      <IconButton color="error" onClick={() => handleDeleteTrip(trip)}>
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
          count={trips.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25, 30]}
        />
      </Box>
      {/* Vehicle Trip Modal */}
      <VehicleModals open={openModal} handleClose={handleCloseModal} editTrip={selectedTrip} />
      {/* Delete Vehicle Trip Modal */}
      <DeleteVehicleModal open={openDeleteModal} handleClose={handleCloseDeleteModal} handleConfirm={handleConfirmDelete} trip={tripToDelete} />
    </Card>
  );
};

VehicleManagementTable.propTypes = {
  trips: PropTypes.array.isRequired
};

VehicleManagementTable.defaultProps = {
  trips: []
};

export default VehicleManagementTable;
