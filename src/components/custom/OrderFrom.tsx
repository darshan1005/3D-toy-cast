import { Box, Typography, TextField, Button, FormGroup, FormControlLabel, Checkbox } from '@mui/material'
import { useEffect, useState } from 'react'
import CustomPopup from './CustomPopup'
import emailjs from '@emailjs/browser'

interface Toy {
  id: number
  name: string
  price: number
}

interface Frame {
  type: string
  price: number
}

const OrderForm = () => {
  const [selectedToys, setSelectedToys] = useState<Toy[]>([])
  const [selectedFrame, setSelectedFrame] = useState<string>('')
  const [finalCost, setFinalCost] = useState<number>(0)
  const [openModal, setModalOpen] = useState<boolean>(false)
  const [isOrderCancelled, setIsOrderCancelled] = useState<boolean>(false)
  const [orderPlaced, setOrderPlaced] = useState<boolean>(false)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    state: '',
    city: '',
    pincode: '',
    address: '',
  })

  const [errors, setErrors] = useState({
    name: '',
    phone: '',
    email: '',
    state: '',
    city: '',
    pincode: '',
    address: '',
  })

  const [isKeyChainSelected, setIsKeyChainSelected] = useState(true)
  const [isRaceTrackSelected, setIsRaceTrackSelected] = useState(true)

  useEffect(() => {
    const toyData = sessionStorage.getItem('selectedToys')
    const frameData = sessionStorage.getItem('selectedFrame')

    let toysCost = 0
    let frameCost = 0

    if (toyData) {
      const parsedToys: Toy[] = JSON.parse(toyData)
      setSelectedToys(parsedToys)
      toysCost = parsedToys.reduce((total, toy) => total + toy.price, 0)
    }

    if (frameData) {
      const parsedFrame: Frame = JSON.parse(frameData)
      setSelectedFrame(parsedFrame?.type || 'No Frame Selected')
      frameCost = parsedFrame?.price || 0
    }

    const updateCost = () => {
      const keyChainCost = isKeyChainSelected ? 99 : 0
      const raceTrackCost = isRaceTrackSelected ? 149 : 0
      const deliveryCharges = 100
      setFinalCost(toysCost + frameCost + keyChainCost + raceTrackCost + deliveryCharges)
    }

    updateCost()
  }, [isKeyChainSelected, isRaceTrackSelected])


  const handleCancelOrder = () => {
    setModalOpen(true)
  }

  const handleClearOrder = () => {
    setModalOpen(false)
    setIsOrderCancelled(true)
    sessionStorage.removeItem('selectedToys')
    sessionStorage.removeItem('selectedFrame')
    setSelectedToys([])
    setSelectedFrame('')
    setFinalCost(0)
  }

  const handleCloseModal = () => {
    setModalOpen(false)
  }

  const validate = (field: string, value: string) => {
    switch (field) {
      case 'name':
        return !value.trim()
          ? 'Name is required'
          : !/^[a-zA-Z\s]+$/.test(value)
            ? 'Only alphabets are allowed'
            : ''
      case 'phone':
        return !value.trim()
          ? 'Phone number is required'
          : !/^\d{10}$/.test(value)
            ? 'Phone must be a 10-digit number'
            : ''
      case 'email':
        return !value.trim()
          ? 'Email is required'
          : !value.includes('@gmail.com')
            ? 'Email must be a Gmail address'
            : ''
      case 'state':
        return !value.trim() ? 'State is required' : ''
      case 'city':
        return !value.trim() ? 'City is required' : ''
      case 'pincode':
        return !value.trim()
          ? 'Pin code is required'
          : !/^\d{6}$/.test(value)
            ? 'Pin code must be 6 digits'
            : ''
      case 'address':
        return !value.trim() ? 'Address is required' : ''
      default:
        return ''
    }
  }

  const validateAllFields = () => {
    const newErrors = {
      name: validate('name', formData.name),
      phone: validate('phone', formData.phone),
      email: validate('email', formData.email),
      state: validate('state', formData.state),
      city: validate('city', formData.city),
      pincode: validate('pincode', formData.pincode),
      address: validate('address', formData.address),
    }
    setErrors(newErrors)
    return !Object.values(newErrors).some(error => error !== '')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))

    // Debounce the validation to prevent too frequent updates
    const error = validate(name, value)
    if (error !== errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: error }))
    }
  }

  const keyChainSelected = isKeyChainSelected ? 'yes' : 'no';
  const raceMapSelected = isRaceTrackSelected ? 'yes' : 'no';
  const selectedToyStr = selectedToys.map(toy => toy.name).join(' & ') || 'No Toy Selected';
  const selectedFraeStr = selectedFrame;

  const handlePlaceOrder = () => {

    if (!validateAllFields()) {
      return
    }

    const serviceId = 'service_12uimx6';
    const templateId = 'template_4lzj9u8';
    const publicKey = 'e8_krUrIuF3wLcOUt';

    const templateParams = {
      name: formData.name,
      phoneNumber: formData.phone,
      to: 'buzzmakers071@gmail.com', // temp mail for testing
      from: formData.email,
      city: formData.city,
      address: formData.address,
      state: formData.state,
      pincode: formData.pincode,
      toy: selectedToyStr,
      frame: selectedFraeStr,
      keyChain: keyChainSelected,
      raceMap: raceMapSelected,
      finalCost: finalCost,
      orderDate: new Date()
    }

    emailjs.send(serviceId, templateId, templateParams, publicKey)
      .then((res) => {
        if (res.status === 200) {
          setOrderPlaced(true)
          setModalOpen(true)
          sessionStorage.removeItem('selectedToys')
          sessionStorage.removeItem('selectedFrame')
          setSelectedToys([])
          setSelectedFrame('')
          setFinalCost(0)
        }
      })
      .catch((error) => {
        console.error('error sending email:', error)
      });
  }

  return (
    <>
      {orderPlaced ? (
        <Box
          sx={{
            pt: 2,
            maxWidth: '600px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography variant="body1" textAlign="center" fontWeight="bold">
            Please track your email for order updates.
          </Typography>
          <Typography variant="body2" textAlign="center" fontWeight="bold" sx={{ opacity: 0.7 }}>
            Your order will be confirmed after a phone call with you. Other details will
            be shared in our follow-up email with your order summary.
          </Typography>
          <Typography variant="h6" textAlign="center" fontWeight="bold" mt={1}>
            Thanks for choosing us !
          </Typography>
        </Box>
      ) : isOrderCancelled ? (
        <Box sx={{ p: 2, maxWidth: '600px', mx: 'auto' }}>
          <Typography variant="h6" textAlign="center" mb={2}>
            We cannot process your order at this time. Please close the popup and try again.
          </Typography>
        </Box>
      ) : (
        <Box sx={{ p: 1, maxWidth: '600px', mx: 'auto' }}>
          <Typography variant='caption'>Complete your order by filling the bellow fileds</Typography>
          <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} gap={1} mb={1}>
            <TextField
              fullWidth
              name="name"
              label="Name"
              size="small"
              required
              value={formData.name}
              onChange={handleChange}
              error={Boolean(errors.name)}
              helperText={errors.name}
            />
            <TextField
              fullWidth
              name="phone"
              label="Phone Number"
              size="small"
              required
              value={formData.phone}
              onChange={handleChange}
              error={Boolean(errors.phone)}
              helperText={errors.phone}
            />
          </Box>
          <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} gap={1} mb={1}>
            <TextField
              fullWidth
              name="email"
              label="Email"
              size="small"
              required
              value={formData.email}
              onChange={handleChange}
              error={Boolean(errors.email)}
              helperText={errors.email}
            />
            <TextField
              fullWidth
              name="state"
              label="State"
              size="small"
              required
              value={formData.state}
              onChange={handleChange}
              error={Boolean(errors.state)}
              helperText={errors.state}
            />
          </Box>
          <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} gap={1} mb={1}>
            <TextField
              fullWidth
              name="city"
              label="City"
              size="small"
              required
              value={formData.city}
              onChange={handleChange}
              error={Boolean(errors.city)}
              helperText={errors.city}
            />
            <TextField
              fullWidth
              name="pincode"
              label="Pin Code"
              size="small"
              required
              value={formData.pincode}
              onChange={handleChange}
              error={Boolean(errors.pincode)}
              helperText={errors.pincode}
            />
          </Box>
          <Box mb={1}>
            <TextField
              fullWidth
              name="address"
              label="Address"
              size="small"
              multiline
              rows={2}
              required
              value={formData.address}
              onChange={handleChange}
              error={Boolean(errors.address)}
              helperText={errors.address}
            />
          </Box>

          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={isKeyChainSelected}
                  onChange={(e) => setIsKeyChainSelected(e.target.checked)}
                />
              }
              label="Key Chain"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={isRaceTrackSelected}
                  onChange={(e) => setIsRaceTrackSelected(e.target.checked)}
                />
              }
              label="Race map Outline"
            />
          </FormGroup>

          <Box
            display="flex"
            flexDirection={{ xs: 'column', sm: 'row' }}
            justifyContent="space-between"
            my={2}
            gap={1}
          >
            <Button variant="contained" fullWidth sx={{ bgcolor: 'red' }}>
              {selectedToys.map(toy => toy.name).join(' & ') || 'No Toy Selected'}
            </Button>
            <Button variant="contained" fullWidth sx={{ bgcolor: 'red' }}>
              {selectedFrame || 'No Frame Selected'}
            </Button>
          </Box>

          <Box sx={{ bgcolor: 'black', color: 'white', textAlign: 'center', py: 1, mb: 2 }}>
            <Typography variant="h6" fontWeight={'bold'}>Final Cost: ₹{finalCost.toFixed(2)}</Typography>
          </Box>

          <Box
            display="flex"
            flexDirection={{ xs: 'column', sm: 'row' }}
            justifyContent="space-between"
            gap={1}
          >
            <Button
              variant="contained"
              fullWidth
              sx={{ bgcolor: 'red', color: 'white' }}
              onClick={handlePlaceOrder}
            >
              Place Order
            </Button>
            <Button variant="outlined" fullWidth color="error" onClick={handleCancelOrder}>
              Cancel
            </Button>
          </Box>
          <CustomPopup
            open={openModal}
            onClose={handleCloseModal}
            title={'Are you sure to cancel the order?'}
            centerTitle
            width={450}
          >
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              <Button onClick={handleClearOrder} sx={{ mr: 2 }}>
                Yes
              </Button>
              <Button onClick={handleCloseModal}>Order</Button>
            </Box>
          </CustomPopup>
        </Box>
      )}
    </>
  )
}

export default OrderForm
