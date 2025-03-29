import { Dialog, Card, CardHeader, CardContent, Typography, Button, Box } from '@mui/material';

const DeletePatientModal = ({ open, handleClose, handleConfirm, patient }) => {
  return (
    <Dialog onClose={handleClose} open={open}>
      <Card>
        <CardHeader title="Confirm Deletion" />
        <CardContent>
          <Typography variant="body1">
            Are you sure you want to delete patient <strong>{patient?.patientName}</strong>?
          </Typography>
          <Box display="flex" justifyContent="flex-end" mt={2} gap={1}>
            <Button variant="outlined" onClick={handleClose}>
              No
            </Button>
            <Button variant="contained" color="error" onClick={() => handleConfirm(patient.id)}>
              Yes
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Dialog>
  );
};

export default DeletePatientModal;
