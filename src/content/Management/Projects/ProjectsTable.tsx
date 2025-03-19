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
import ProjectModal from './ProjectsForm';
import DeleteProjectModal from './DeleteConfirm';
import { format } from 'date-fns';

const ProjectManagementTable = ({ projects }) => {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);
  const [filters, setFilters] = useState({ status: '' });
  const [openModal, setOpenModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);

  const applyFilters = (projects, filters) => {
    return projects.filter((project) => !filters.status || project.status === filters.status);
  };

  const applyPagination = (projects, page, limit) => {
    return projects.slice(page * limit, page * limit + limit);
  };

  const handleDeleteProject = (project) => {
    setProjectToDelete(project);
    setOpenDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  const handleConfirmDelete = (projectId) => {
    console.log(projectId);
    setOpenDeleteModal(false);
  };

  const handleEditProject = (project) => {
    setSelectedProject(project);
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

  const filteredProjects = applyFilters(projects, filters);
  const paginatedProjects = applyPagination(filteredProjects, page, limit);

  return (
    <Card>
      <CardHeader
        action={
          <Box width={200}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Status</InputLabel>
              <Select value={filters.status || 'all'} onChange={handleStatusChange} label="Status">
                <MenuItem value="all">All Status</MenuItem>
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="Ongoing">Ongoing</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
              </Select>
            </FormControl>
          </Box>
        }
        title="Projects"
      />
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Project Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>End Date</TableCell>
              <TableCell>Client Sponsor</TableCell>
              <TableCell>Assigned Manager</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedProjects.map((project) => (
              <TableRow hover key={project.id}>
                <TableCell>{project.name}</TableCell>
                <TableCell>{project.description}</TableCell>
                <TableCell>{project.type}</TableCell>
                <TableCell>{project.status}</TableCell>
                <TableCell>{format(new Date(project.startDate), 'MMMM dd yyyy')}</TableCell>
                <TableCell>{format(new Date(project.endDate), 'MMMM dd yyyy')}</TableCell>
                <TableCell>{project.clientSponsor}</TableCell>
                <TableCell>{project.assignedManager}</TableCell>
                <TableCell align="right">
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Tooltip title="Edit Project">
                      <IconButton color="primary" onClick={() => handleEditProject(project)}>
                        <EditTwoToneIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Project">
                      <IconButton color="error" onClick={() => handleDeleteProject(project)}>
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
          count={filteredProjects.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25, 30]}
        />
      </Box>
      <ProjectModal open={openModal} handleClose={handleCloseModal} editProject={selectedProject} />
      <DeleteProjectModal open={openDeleteModal} handleClose={handleCloseDeleteModal} handleConfirm={handleConfirmDelete} project={projectToDelete} />
    </Card>
  );
};

export default ProjectManagementTable;
