import { useState } from 'react';
import Box from '@mui/material/Box';
import {
  Card,
  CardHeader,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  IconButton,
  Tooltip
} from '@mui/material';

import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import CampModal from './CampForm';
import DeleteCampModal from '../../common/DeleteConfirm';
import { format } from 'date-fns';

const CampManagementTable = ({ camps }) => {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);
  const [filters, setFilters] = useState({ status: '' });
  const [openModal, setOpenModal] = useState(false);
  const [selectedCamp, setSelectedCamp] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [campToDelete, setCampToDelete] = useState(null);

  const applyFilters = (camps, filters) => {
    return camps.filter((camp) => !filters.status || camp.status === filters.status);
  };

  const applyPagination = (camps, page, limit) => {
    return camps.slice(page * limit, page * limit + limit);
  };

  const handleDeleteCamp = (camp) => {
    setCampToDelete(camp);
    setOpenDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  const handleConfirmDelete = (campId) => {
    console.log(campId);
    setOpenDeleteModal(false);
  };

  const handleEditCamp = (camp) => {
    setSelectedCamp(camp);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleStatusChange = (e) => {
    setFilters({ status: e.target.value !== 'all' ? e.target.value : '' });
  };

  const handlePageChange = (_event, newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value));
  };

  const filteredCamps = applyFilters(camps, filters);
  const paginatedCamps = applyPagination(filteredCamps, page, limit);

  return (
    <Card>
      <CardHeader
        action={
          <Box width={200}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Status</InputLabel>
              <Select value={filters.status || 'all'} onChange={handleStatusChange} label="Status">
                <MenuItem value="all">All Status</MenuItem>
                <MenuItem value="Planned">Planned</MenuItem>
                <MenuItem value="Ongoing">Ongoing</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
              </Select>
            </FormControl>
          </Box>
        }
        title="Camps"
      />
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>End Date</TableCell>
              <TableCell>Country</TableCell>
              <TableCell>State</TableCell>
              <TableCell>District/City</TableCell>
              <TableCell>Village/Area</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedCamps.map((camp) => (
              <TableRow hover key={camp.id}>
                <TableCell>{camp.name}</TableCell>
                <TableCell>{camp.type}</TableCell>
                <TableCell>{camp.status}</TableCell>
                <TableCell>{format(new Date(camp.startDate), 'MMMM dd yyyy')}</TableCell>
                <TableCell>{format(new Date(camp.endDate), 'MMMM dd yyyy')}</TableCell>
                <TableCell>{camp.country}</TableCell>
                <TableCell>{camp.state}</TableCell>
                <TableCell>{camp.district}</TableCell>
                <TableCell>{camp.village}</TableCell>
                <TableCell align="right">
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Tooltip title="Edit Camp">
                      <IconButton color="primary" onClick={() => handleEditCamp(camp)}>
                        <EditTwoToneIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Camp">
                      <IconButton color="error" onClick={() => handleDeleteCamp(camp)}>
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
          count={filteredCamps.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25, 30]}
        />
      </Box>
      <CampModal open={openModal} handleClose={handleCloseModal} editCamp={selectedCamp} />
      <DeleteCampModal open={openDeleteModal} handleClose={handleCloseDeleteModal} handleConfirm={handleConfirmDelete} data={campToDelete} />
    </Card>
  );
};

export default CampManagementTable;
