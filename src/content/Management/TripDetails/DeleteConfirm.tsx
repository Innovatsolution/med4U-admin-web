import { Dialog, Card, CardHeader, CardContent, Typography, Button, Box } from '@mui/material';

const DeleteVehicleModal = ({ open, handleClose, handleConfirm, trip }) => {
  return (
    <Dialog onClose={handleClose} open={open}>
      <Card>
        <CardHeader title="Confirm Trip Deletion" />
        <CardContent>
          <Typography variant="body1">
            Are you sure you want to delete the trip for vehicle <strong>{trip?.vehicleNumber}</strong>  
            on <strong>{trip?.tripDate}</strong> from <strong>{trip?.startLocation}</strong> to <strong>{trip?.endLocation}</strong>?
          </Typography>
          <Box display="flex" justifyContent="flex-end" mt={2} gap={1}>
            <Button variant="outlined" onClick={handleClose}>
              No
            </Button>
            <Button variant="contained" color="error" onClick={() => handleConfirm(trip.id)}>
              Yes
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Dialog>
  );
};

export default DeleteVehicleModal;
