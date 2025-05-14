import { Box, Typography, TextField, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import CustomPopup from './CustomPopup';
import { useNavigate } from 'react-router-dom';

interface Toy {
  id: number;
  name: string;
  price: number;
}

interface Frame {
  type: string;
  price: number;
}

const OrderForm = () => {
  const navigate = useNavigate();
  const [selectedToys, setSelectedToys] = useState<Toy[]>([]);
  const [selectedFrame, setSelectedFrame] = useState<string>('');
  const [finalCost, setFinalCost] = useState<number>(0);
  const [openModal, setModalOpen] = useState<boolean>(false);
  const [isOrderCancelled, setIsOrderCancelled] = useState<boolean>(true);

  useEffect(() => {
    const toyData = sessionStorage.getItem('selectedToys');
    const frameData = sessionStorage.getItem('selectedFrame');

    let toysCost = 0;
    let frameCost = 0;

    if (toyData) {
      const parsedToys: Toy[] = JSON.parse(toyData);
      setSelectedToys(parsedToys);
      toysCost = parsedToys.reduce((total, toy) => total + toy.price, 0);
    }

    if (frameData) {
      const parsedFrame: Frame = JSON.parse(frameData);
      setSelectedFrame(parsedFrame?.type || 'No Frame Selected');
      frameCost = parsedFrame?.price || 0;
    }

    setFinalCost(toysCost + frameCost + 300);
  }, []);

  const handleCancelOrder = () => {
    setModalOpen(true);
  };

  const handleClearOrder = () => {
    setModalOpen(false); // Close the modal first
    setIsOrderCancelled(false); // Set order placed state to false
    sessionStorage.removeItem('selectedToys');
    sessionStorage.removeItem('selectedFrame');
    setSelectedToys([]);
    setSelectedFrame('');
    setFinalCost(0);
    navigate('/', { state: { scrollToSelection: true } });
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <>
    {isOrderCancelled ? (
        <Box sx={{ p: 2, maxWidth: '600px', mx: 'auto' }}>
      <FormFields />

      <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} justifyContent="space-between" my={2} gap={1}>
        <Button variant="contained" fullWidth sx={{ bgcolor: 'red' }}>
          {selectedToys.map(toy => toy.name).join(' & ') || 'No Toy Selected'}
        </Button>
        <Button variant="contained" fullWidth sx={{ bgcolor: 'red' }}>
          {selectedFrame || 'No Frame Selected'}
        </Button>
      </Box>

      <Box sx={{ bgcolor: 'black', color: 'white', textAlign: 'center', py: 1, mb: 2 }}>
        <Typography variant="h6">Final Cost: ₹{finalCost.toFixed(2)}</Typography>
      </Box>

      <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} justifyContent="space-between" gap={1}>
        <Button variant="contained" fullWidth sx={{ bgcolor: 'red', color: 'white' }}>
          Place Order
        </Button>
        <Button variant="outlined" fullWidth color="error" onClick={handleCancelOrder}>
          Cancel
        </Button>
      </Box>

      <Typography variant="caption" display="block" mt={2} textAlign="center">
        Please track your mail for order updates
      </Typography>

      <CustomPopup
        open={openModal}
        onClose={handleCloseModal}
        title="Are you sure to cancel the order?"
        centerTitle
        width={450}
      >
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <Button onClick={handleClearOrder} sx={{ mr: 2 }}>
            YES
          </Button>
          <Button onClick={handleCloseModal}>NO</Button>
        </Box>
      </CustomPopup>
    </Box>
    ) : (
      <Box sx={{ p: 2, maxWidth: '600px', mx: 'auto' }}>
        <Typography variant="h6" textAlign="center" mb={2}>
            We cannot process your order at this time. Please close the popup and try again.
        </Typography>
      </Box>
    )}
    
    </>
  );
};

const FormFields = () => (
  <Box mt={2}>
    <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} gap={1} mb={1}>
      <TextField fullWidth label="Name" size="small" />
      <TextField fullWidth label="Phone Number" size="small" />
    </Box>
    <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} gap={1} mb={1}>
      <TextField fullWidth label="Email" size="small" />
      <TextField fullWidth label="State" size="small" />
    </Box>
    <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} gap={1} mb={1}>
      <TextField fullWidth label="City" size="small" />
      <TextField fullWidth label="Pin Code" size="small" />
    </Box>
    <Box mb={1}>
      <TextField fullWidth label="Address" size="small" multiline rows={2} />
    </Box>
  </Box>
);

export default OrderForm;