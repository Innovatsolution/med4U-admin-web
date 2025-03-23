import { Dialog, Card, CardHeader, CardContent, Typography, Button, Box } from '@mui/material';

const DeleteVehicleModal = ({ open, handleClose, handleConfirm, vehicle }) => {
  return (
    <Dialog onClose={handleClose} open={open}>
      <Card>
        <CardHeader title="Confirm Deletion" />
        <CardContent>
          <Typography variant="body1">
            Are you sure you want to delete vehicle <strong>{vehicle?.vehicleNumber}</strong>?
          </Typography>
          <Box display="flex" justifyContent="flex-end" mt={2} gap={1}>
            <Button variant="outlined" onClick={handleClose}>
              No
            </Button>
            <Button variant="contained" color="error" onClick={() => handleConfirm(vehicle.id)}>
              Yes
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Dialog>
  );
};

export default DeleteVehicleModal;
