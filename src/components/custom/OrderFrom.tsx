import {
  Box,
  Typography,
  TextField,
  Button,
  FormGroup,
  FormControlLabel,
  Checkbox,
  useTheme,
  useMediaQuery,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  TableContainer,
  TableHead,
  Alert,
} from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import { generateUniqueId } from '../../utils/uniqueId'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import CountUp from 'react-countup'
import { Frame, Image, Toy } from 'src/types/types'
import PopupHOC from './HOC/PopupHOC'
import PreviewIcon from '@mui/icons-material/Preview'
import CloseIcon from '@mui/icons-material/Close'
import TruncatedTextWithTooltip from './TruncatedText'
import FileUploadIcon from '@mui/icons-material/FileUpload'
import LazyImage from './LazyImage'
import CircularProgress from '@mui/material/CircularProgress'

const OrderForm = () => {
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))

  const [selectedToys, setSelectedToys] = useState<Toy[]>([])
  const [selectedFrame, setSelectedFrame] = useState<string>('')
  const [selectedFrameDimension, setSelectedFrameDimension] = useState<string>('')
  const [actualCostBeforeDiscount, setActualCostBeforeDiscount] = useState<number>(0)
  const [openModal, setModalOpen] = useState<boolean>(false)
  const [isOrderCancelled, setIsOrderCancelled] = useState<boolean>(false)
  const [orderPlaced, setOrderPlaced] = useState<boolean>(false)
  const [previewOpen, setPreviewOpen] = useState(false)
  const [imageSizeWarning, setImageSizeWarning] = useState(false)
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    state: '',
    city: '',
    pincode: '',
    address: '',
    customBackground: '',
    uploadedImage: '',
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
  const [isBGSelected, setIsBGSelected] = useState(true)

  const [actualPriceAfterDiscount, setActualPriceAfterDiscount] = useState(0)
  const [discountAmount, setDiscountAmount] = useState(0)
  const [finalCost, setFinalCost] = useState(0)
  const [expanded, setExpanded] = useState(true)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const [fileName, setFileName] = useState('')

  const availabilityType = sessionStorage.getItem('availabilityType')
  const isToy = availabilityType === 'toy'
  const is3D = availabilityType === '3d'

  const discountPercentage = is3D ? 0.32 : isToy ? 0.12 : 0.22
  const isdeliveryFee = actualPriceAfterDiscount > 1299
  const deliveryFeeText = isdeliveryFee ? 'Free' : '₹59'

  useEffect(() => {
    if (!isToy) {
      setIsRaceTrackSelected(true)
      setIsBGSelected(true)
    } else {
      setIsRaceTrackSelected(false)
      setIsBGSelected(false)
    }

    if (is3D) {
      setIsBGSelected(true)
    }
  }, [])

  useEffect(() => {
    const toyData = sessionStorage.getItem('selectedToys')
    const frameData = sessionStorage.getItem('selectedFrame')
    const userFormData = sessionStorage.getItem('FormData')
    const storedImage = sessionStorage.getItem('uploadedImage')

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
      setSelectedFrameDimension(parsedFrame?.selectedDimension || 'No Dimensions')
      frameCost = parsedFrame?.price || 0
    }

    if (userFormData) {
      const parsedFormData = JSON.parse(userFormData)
      setFormData(prev => ({
        ...prev,
        name: parsedFormData.name || '',
        phone: parsedFormData.phone || '',
        email: parsedFormData.email || '',
        state: parsedFormData.state || '',
        city: parsedFormData.city || '',
        pincode: parsedFormData.pincode || '',
        address: parsedFormData.address || '',
        customBackground: parsedFormData.customBackground || '',
        uploadedImage: parsedFormData.uploadedImage || '',
      }))
    }

    if (storedImage) {
      const parsedImage: Image = JSON.parse(storedImage)
      setFileName(parsedImage.name)
      setFormData(prev => ({ ...prev, uploadedImage: parsedImage.data }))
    }

    const baseCost = toysCost + frameCost // This is the Basepart that gets applied for discountPercentage
    const actualPriceAfterDiscount = baseCost * (1 - discountPercentage)

    const keyChainCost = isKeyChainSelected ? 49 : 0
    const raceTrackCost = isRaceTrackSelected ? 149 : 0
    const background = isBGSelected ? 29 : 0
    const addOnsCost = keyChainCost + raceTrackCost + background

    const isDeliveryFree = actualPriceAfterDiscount > 1299
    const deliveryCost = isDeliveryFree ? 0 : 59

    const totalFinalCost = actualPriceAfterDiscount + addOnsCost + deliveryCost

    // Set costs in state
    setActualCostBeforeDiscount(baseCost)
    setActualPriceAfterDiscount(actualPriceAfterDiscount)
    setDiscountAmount(baseCost - actualPriceAfterDiscount)
    setFinalCost(totalFinalCost)
  }, [isKeyChainSelected, isRaceTrackSelected, isBGSelected])

  const handleCancelOrder = () => {
    setModalOpen(true)
  }

  const handleClearOrder = () => {
    setModalOpen(false)
    setIsOrderCancelled(true)
    sessionStorage.removeItem('selectedToys')
    sessionStorage.removeItem('selectedFrame')
    sessionStorage.removeItem('uploadedImage')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
    setSelectedToys([])
    setSelectedFrame('')
    setActualCostBeforeDiscount(0)
    window.dispatchEvent(new Event('storageUpdate'))
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
    const formValue = { ...formData, [name]: value }
    const stringifiedFromData = JSON.stringify(formValue)
    sessionStorage.setItem('FormData', stringifiedFromData)

    // Debounce the validation to prevent too frequent updates
    const error = validate(name, value)
    if (error !== errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: error }))
    }
  }

  const keyChainSelected = isKeyChainSelected ? 'Yes' : 'No'
  const raceMapSelected = isRaceTrackSelected && !isToy ? 'Yes' : 'No'
  const backgroundSelected = isBGSelected && !isToy ? 'Yes' : 'No'
  const allSelectedToys = selectedToys
    .map(toy => `${toy.name} (${toy.scale}) - ₹${toy.price.toFixed(2)}`)
    .join('\n')
  const selectedFrameName = selectedFrame || 'No Frame Selected'
  const frameTotalCost =
    selectedFrame && selectedFrame !== 'No Frame Selected'
      ? (JSON.parse(sessionStorage.getItem('selectedFrame') || '{}') as Frame)?.price || 0
      : 0

  const toyTotalCosts = selectedToys.reduce((total, toy) => total + toy.price, 0)

  const handlePlaceOrder = () => {
    if (!validateAllFields()) {
      return
    }

    setLoading(true)

    const serviceId = 'service_12uimx6'
    const templateId = 'template_4lzj9u8'
    const publicKey = 'e8_krUrIuF3wLcOUt'

    const templateParams = {
      orderId: generateUniqueId(formData.name, formData.phone),
      name: formData.name,
      phone: formData.phone,
      city: formData.city,
      address: formData.address,
      state: formData.state,
      pincode: formData.pincode,

      //customer contact
      serviceEmail: 'buzzmakers071@gmail.com', // temp mail for testing
      serviceContact: '+91 89XX XXX XXX', // temp number for testing

      // order placing
      orderFrom: formData.email,
      orderTo: 'buzzmakers071@gmail.com',

      // Auto reply to
      autoReplyTo: formData.email, // customer
      autoReplyFrom: 'buzzmakers071@gmail.com', // Business

      // Toy details
      toysDetails: allSelectedToys,
      toyCosts: toyTotalCosts.toFixed(2),

      // Frame details
      frame: selectedFrameName,
      frameDimension: selectedFrameDimension,
      frameCost: frameTotalCost.toFixed(2),

      // Subtotal (Toys + Frames)
      subtotal: actualCostBeforeDiscount.toFixed(2),

      // Discount information
      discountPercentage: is3D ? '32%' : isToy ? '12%' : '22%',
      discountAmount: discountAmount.toFixed(2),
      afterDiscountPrice: actualPriceAfterDiscount.toFixed(2),

      // Delivery information
      deliveryFee: isdeliveryFee ? 'Free' : '₹59',
      deliveryFeeAmount: isdeliveryFee ? '₹0.00' : '₹59.00',

      // Add-ons details
      keyChain: keyChainSelected,
      keyChainCost: isKeyChainSelected ? '49.00' : '0.00',

      raceMap: raceMapSelected,
      raceMapCost: isRaceTrackSelected && !isToy ? '149.00' : '0.00',

      withBackground: backgroundSelected,
      backgroundCost: isBGSelected && !isToy ? '29.00' : '0.00',

      // Add-ons total
      addOnsTotalCost: (
        (isKeyChainSelected ? 49 : 0) +
        (isRaceTrackSelected && !isToy ? 149 : 0) +
        (isBGSelected && !isToy ? 29 : 0)
      ).toFixed(2),

      // Final totals
      finalCost: finalCost.toFixed(2),
      orderDate: new Date(),

      // Custom background instructions and Upload Image
      customBackground: formData.customBackground,
      uploadedImage: formData.uploadedImage || 'No image uploaded',
    }

    emailjs
      .send(serviceId, templateId, templateParams, publicKey)
      .then(res => {
        if (res.status === 200) {
          setLoading(false)
          setOrderPlaced(true)
          setModalOpen(true)
          sessionStorage.removeItem('selectedToys')
          sessionStorage.removeItem('selectedFrame')
          sessionStorage.removeItem('uploadedImage')
          if (fileInputRef.current) {
            fileInputRef.current.value = ''
          }
          setSelectedToys([])
          setSelectedFrame('')
          setActualCostBeforeDiscount(0)
        }
      })
      .catch(error => {
        setLoading(false)
        console.error('error sending email:', error)
      })
      .finally(() => {
        setTimeout(() => {
          setModalOpen(false)
          setLoading(false)
        }, 2000)
      })
  }

  const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    let ImageObj: Image = {
      name: '',
      size: 0,
      type: '',
      data: '',
    }
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 50 * 1024) {
        // 50KB limit
        setImageSizeWarning(true)
        handleClearImage()
        if (fileInputRef.current) fileInputRef.current.value = ''
        return
      }
      setImageSizeWarning(false)
      const fileName = file.name.toLowerCase()
      setFileName(fileName)
      const reader = new FileReader()

      reader.onload = ev => {
        const uploadedImage = ev.target?.result as string
        setFormData(prev => {
          const updated = { ...prev, uploadedImage: uploadedImage }
          sessionStorage.setItem('FormData', JSON.stringify(updated))
          return updated
        })
        ImageObj = {
          name: fileName,
          size: file.size,
          type: file.type,
          data: uploadedImage,
        }
        sessionStorage.setItem('uploadedImage', JSON.stringify(ImageObj))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleClearImage = () => {
    setFormData(prev => {
      const updated = { ...prev, uploadedImage: '' }
      sessionStorage.setItem('FormData', JSON.stringify(updated))
      return updated
    })
    sessionStorage.removeItem('uploadedImage')
    setFileName('')

    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleOnImageClear = () => {
    handleClearImage()
    setPreviewOpen(false)
  }

  const handleImageClearFromName = () => {
    handleClearImage()
  }

  return (
    <>
      <Typography variant='h6' fontWeight="bold" textAlign="center" sx={{ mb: 1 }}>
        {isOrderCancelled ? `Oops ! Try again` : orderPlaced ? `Order Placed` : `Order Summary`}
      </Typography>
      {orderPlaced ? (
        <Box
          sx={{
            pt: 2,
            maxWidth: '600px',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            px: { xs: 1, sm: 2 },
          }}
        >
          <Typography variant="body1" textAlign="center" fontWeight="bold">
            Please track your email for order updates.
          </Typography>
          <Typography variant="body2" textAlign="center" fontWeight="bold" sx={{ opacity: 0.7 }}>
            Your order will be confirmed after a phone call with you. Other details will be shared
            in our follow-up email with your order summary.
          </Typography>
          <Typography variant="h6" textAlign="center" fontWeight="bold" mt={1}>
            Thanks for choosing us !
          </Typography>
        </Box>
      ) : isOrderCancelled ? (
        <Box sx={{ p: 2, maxWidth: '600px', width: '100%', mx: 'auto', px: { xs: 1, sm: 2 } }}>
          <Typography variant="h6" textAlign="center" mb={2}>
            We cannot process your order at this time. Please close the popup and try again.
          </Typography>
        </Box>
      ) : (
        <Box
          sx={{
            p: { xs: 0.5, sm: 1 },
            maxWidth: '600px',
            width: '100%',
            mx: 'auto',
            boxSizing: 'border-box',
          }}
        >
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
              sx={{ mb: { xs: 1, sm: 0 } }}
            />
          </Box>
          <Box mb={1}>
            <TextField
              fullWidth
              name="customBackground"
              label="(optional)Instruction to create custom background"
              size="small"
              multiline
              rows={2}
              value={formData.customBackground}
              onChange={handleChange}
              sx={{ mb: { xs: 1, sm: 0 } }}
            />
          </Box>
          <Box display="flex" flexDirection={'row'} alignItems="center">
            <Box
              display="flex"
              flexDirection="row"
              flexWrap="wrap"
              gap={1}
              mb={1}
              alignItems="center"
            >
              <Button
                variant="outlined"
                component="label"
                startIcon={<FileUploadIcon />}
                sx={{
                  mb: 1,
                  width: 'max-content',
                  color: 'white',
                  bgcolor: formData.uploadedImage ? 'green' : 'red',
                  borderColor: formData.uploadedImage ? 'green' : 'red',
                  textTransform: 'none',
                  fontSize: { xs: '0.8rem', sm: '1rem' },
                  flexShrink: 0,
                }}
              >
                Upload Image
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={e => handleUploadImage(e)}
                />
              </Button>
              {formData.uploadedImage && (
                <PreviewIcon
                  onClick={() => setPreviewOpen(true)}
                  sx={{
                    cursor: formData.uploadedImage ? 'pointer' : 'not-allowed',
                    pointerEvents: formData.uploadedImage ? 'auto' : 'none',
                    flexShrink: 0,
                  }}
                  titleAccess="preview"
                />
              )}
              {<TruncatedTextWithTooltip text={fileName} maxLength={10} />}
              {formData.uploadedImage && fileName && (
                <CloseIcon
                  fontSize="small"
                  onClick={() => handleImageClearFromName()}
                  sx={{ color: 'black', cursor: 'pointer' }}
                />
              )}
              {imageSizeWarning && (
                <Alert
                  severity="warning"
                  sx={{
                    fontSize: { xs: '0.7rem', sm: '1rem' },
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'left',
                    '.MuiAlert-message': {
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'center',
                    },
                    '.MuiAlert-action': {
                      paddingTop: 0,
                      marginRight: 0,
                    },
                  }}
                  onClose={() => setImageSizeWarning(false)}
                >
                  Please upload image less than 50KB.
                </Alert>
              )}
            </Box>
            <PopupHOC
              open={previewOpen}
              onClose={() => setPreviewOpen(false)}
              title="Image Preview"
              centerTitle
              width={isSmallScreen ? '100%' : '40%'}
              height={'auto'}
            >
              <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {formData.uploadedImage ? (
                  <>
                    <LazyImage
                      src={formData.uploadedImage}
                      alt="Uploaded Preview"
                      sx={{
                        marginTop: 1,
                        width: '100%',
                        maxWidth: '400px',
                        borderRadius: 2,
                        objectFit: 'contain',
                      }}
                    />
                    <Button variant="outlined" onClick={handleOnImageClear} sx={{ mt: 2 }}>
                      Remove
                    </Button>
                  </>
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    No image uploaded.
                  </Typography>
                )}
              </Box>
            </PopupHOC>
          </Box>

          <FormGroup row sx={{ m: 0, flexWrap: { xs: 'wrap', sm: 'nowrap' } }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={isKeyChainSelected}
                  onChange={e => setIsKeyChainSelected(e.target.checked)}
                  sx={{
                    '&.Mui-checked': {
                      color: 'red',
                    },
                  }}
                />
              }
              label={
                <Box display="flex" alignItems="baseline" gap={0.5}>
                  Key Chain -{' '}
                  <Typography component={'span'} variant="caption">
                    {!isKeyChainSelected ? '₹0' : '₹49'}
                  </Typography>
                </Box>
              }
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={isBGSelected}
                  onChange={e => setIsBGSelected(e.target.checked)}
                  sx={{
                    '&.Mui-checked': {
                      color: is3D ? '#3333' : 'red',
                    },
                  }}
                />
              }
              label={
                <Box display="flex" alignItems="baseline" gap={0.5}>
                  Background -{' '}
                  <Typography component={'span'} variant="caption">
                    {isToy || !isBGSelected ? '₹0' : '₹29'}
                  </Typography>
                </Box>
              }
              disabled={isToy || is3D}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={isRaceTrackSelected}
                  onChange={e => setIsRaceTrackSelected(e.target.checked)}
                  sx={{
                    '&.Mui-checked': {
                      color: 'red',
                    },
                  }}
                />
              }
              label={
                <Box display="flex" alignItems="baseline" gap={0.5}>
                  Race map Outline -{' '}
                  <Typography component={'span'} variant="caption">
                    {isToy || !isRaceTrackSelected ? '₹0' : '₹149'}
                  </Typography>
                </Box>
              }
              disabled={isToy}
            />
          </FormGroup>

          <Box
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 1,
              textAlign: 'center',
              py: { xs: 1, sm: 1.5 },
              px: { xs: 0.5, sm: 0 },
              mb: 2,
            }}
          >
            <Accordion
              sx={{ width: '100%', maxWidth: 600, mx: 'auto' }}
              disableGutters
              expanded={expanded} // Bind expanded state
              onChange={() => setExpanded(!expanded)}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="price-details-content"
                id="price-details-header"
                sx={{
                  px: 2,
                  py: 1,
                  backgroundColor: '#f5f5f5',
                  borderRadius: 1,
                }}
              >
                <Typography
                  fontWeight="bold"
                  sx={{ fontSize: { xs: '0.95rem', sm: '1.05rem', md: '1.4rem' } }}
                >
                  Final Cost:{' '}
                  <CountUp
                    end={finalCost}
                    duration={1}
                    decimals={2}
                    prefix="₹"
                    useEasing
                    useIndianSeparators
                  />
                </Typography>
              </AccordionSummary>

              <AccordionDetails sx={{ px: { xs: 0.5, sm: 2 }, pt: 1, pb: 2 }}>
                <TableContainer>
                  <Table
                    sx={{
                      width: '100%',
                      maxWidth: 600,
                      mx: 'auto',
                      '& .MuiTableCell-root': { px: { xs: 0.5, sm: 2 }, py: { xs: 0.5, sm: 1 } },
                    }}
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell
                          sx={{ fontSize: { xs: '0.9rem', sm: '1.1rem' }, fontWeight: 'bold' }}
                        >
                          Item
                        </TableCell>
                        <TableCell
                          align="right"
                          sx={{ fontSize: { xs: '0.9rem', sm: '1.1rem' }, fontWeight: 'bold' }}
                        >
                          Price
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {selectedToys.length > 0 && (
                        <TableRow>
                          <TableCell colSpan={2} sx={{ fontWeight: 'bold' }}>
                            Toys:
                          </TableCell>
                        </TableRow>
                      )}
                      {selectedToys.map(toy => (
                        <TableRow key={toy.id}>
                          <TableCell sx={{ fontSize: { xs: '0.85rem', sm: '1rem' } }}>
                            {toy.name} ({toy.scale})
                          </TableCell>
                          <TableCell align="right" sx={{ fontSize: { xs: '0.85rem', sm: '1rem' } }}>
                            ₹{toy.price.toFixed(2)}
                          </TableCell>
                        </TableRow>
                      ))}

                      {selectedFrame && selectedFrame !== 'No Frame Selected' && (
                        <TableRow>
                          <TableCell colSpan={2} sx={{ fontWeight: 'bold' }}>
                            Frame:
                          </TableCell>
                        </TableRow>
                      )}

                      {selectedFrame && selectedFrame !== 'No Frame Selected' && (
                        <TableRow>
                          <TableCell sx={{ fontSize: { xs: '0.85rem', sm: '1rem' } }}>
                            {selectedFrame} ({selectedFrameDimension})
                          </TableCell>
                          <TableCell align="right" sx={{ fontSize: { xs: '0.85rem', sm: '1rem' } }}>
                            ₹
                            {(
                              JSON.parse(sessionStorage.getItem('selectedFrame') || '{}') as Frame
                            )?.price.toFixed(2) || '0.00'}
                          </TableCell>
                        </TableRow>
                      )}

                      <TableRow>
                        <TableCell sx={{ fontSize: { xs: '0.85rem', sm: '1rem' } }}>
                          <Typography
                            fontWeight="bold"
                            sx={{ fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' } }}
                          >
                            Total <Typography variant="caption">{`(Toys & Frames)`}</Typography>
                          </Typography>
                        </TableCell>
                        <TableCell
                          align="right"
                          sx={{ fontSize: { xs: '0.85rem', sm: '1rem' }, fontWeight: 'bold' }}
                        >
                          ₹{actualCostBeforeDiscount.toFixed(2)}
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell sx={{ fontSize: { xs: '0.85rem', sm: '1rem' } }}>
                          <Typography
                            fontWeight="bold"
                            sx={{ fontSize: { xs: '0.85rem', sm: '1rem', md: '1.05rem' } }}
                          >
                            Discount On{' '}
                            <Typography variant="caption">{`(Toys & Frames)`}</Typography>
                          </Typography>
                        </TableCell>
                        <TableCell
                          align="right"
                          sx={{ fontSize: { xs: '0.85rem', sm: '1rem' }, fontWeight: 'bold' }}
                        >
                          (saved) ₹{discountAmount.toFixed(2)}
                          <Box
                            component="span"
                            sx={{
                              fontSize: { xs: '0.8rem', sm: '0.95rem', md: '1rem' },
                              background: 'linear-gradient(to right, green, #fff)',
                              color: '#fff',
                              px: { xs: 1, sm: 1.5 },
                              py: 0.2,
                              borderRadius: 1,
                              ml: 1,
                              fontWeight: 'bold',
                            }}
                          >
                            {is3D ? '32%' : isToy ? '12%' : '22%'}
                          </Box>
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell sx={{ fontSize: { xs: '0.85rem', sm: '1rem' } }}>
                          <Typography
                            fontWeight="bold"
                            sx={{ fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' } }}
                          >
                            After Discount
                          </Typography>
                        </TableCell>
                        <TableCell
                          align="right"
                          sx={{ fontSize: { xs: '0.85rem', sm: '1rem' }, fontWeight: 'bold' }}
                        >
                          ₹{actualPriceAfterDiscount.toFixed(2)}
                          <Typography variant="subtitle1" color="#3337">
                            <s>₹{actualCostBeforeDiscount.toFixed(2)}</s>
                          </Typography>
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell sx={{ fontSize: { xs: '0.8rem', sm: '1rem' } }}>
                          <Typography
                            variant="subtitle2"
                            sx={{ fontSize: { xs: '0.8rem', sm: '1rem' } }}
                          >
                            Delivery Fee{' '}
                            <Typography variant="caption">{`(Free on orders above ₹1299)`}</Typography>
                          </Typography>
                        </TableCell>
                        <TableCell align="right" sx={{ fontSize: { xs: '0.8rem', sm: '1rem' } }}>
                          {deliveryFeeText}
                          {isdeliveryFee && (
                            <Typography
                              variant="subtitle2"
                              ml={1}
                              sx={{ fontSize: { xs: '0.8rem', sm: '1rem' } }}
                            >
                              <s>₹59</s>
                            </Typography>
                          )}
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell colSpan={2} sx={{ fontWeight: 'bold' }}>
                          Add On's:
                        </TableCell>
                      </TableRow>

                      {isKeyChainSelected && (
                        <TableRow>
                          <TableCell sx={{ fontSize: { xs: '0.85rem', sm: '1rem' } }}>
                            Key Chain
                          </TableCell>
                          <TableCell align="right" sx={{ fontSize: { xs: '0.85rem', sm: '1rem' } }}>
                            ₹49.00
                          </TableCell>
                        </TableRow>
                      )}

                      {!isToy && isRaceTrackSelected && (
                        <TableRow>
                          <TableCell sx={{ fontSize: { xs: '0.85rem', sm: '1rem' } }}>
                            Race map Outline
                          </TableCell>
                          <TableCell align="right" sx={{ fontSize: { xs: '0.85rem', sm: '1rem' } }}>
                            ₹149.00
                          </TableCell>
                        </TableRow>
                      )}

                      {!isToy && isBGSelected && (
                        <TableRow>
                          <TableCell sx={{ fontSize: { xs: '0.85rem', sm: '1rem' } }}>
                            Background
                          </TableCell>
                          <TableCell align="right" sx={{ fontSize: { xs: '0.85rem', sm: '1rem' } }}>
                            ₹29.00
                          </TableCell>
                        </TableRow>
                      )}

                      <TableRow>
                        <TableCell sx={{ fontSize: { xs: '0.85rem', sm: '1rem' } }}>
                          <Typography
                            fontWeight="bold"
                            sx={{ fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' } }}
                          >
                            Total <Typography variant="caption">{`(Add On's)`}</Typography>
                          </Typography>
                        </TableCell>
                        <TableCell align="right" sx={{ fontSize: { xs: '0.85rem', sm: '1rem' } }}>
                          ₹
                          {(isKeyChainSelected ? 49 : 0) +
                            (isRaceTrackSelected && !isToy ? 149 : 0) +
                            (isBGSelected && !isToy ? 29 : 0)}
                        </TableCell>
                      </TableRow>
                      <TableRow sx={{ '& td': { borderBottom: 'none' } }}>
                        <TableCell sx={{ fontSize: { xs: '0.85rem', sm: '1rem' } }}>
                          <Typography
                            fontWeight="bold"
                            sx={{ fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' } }}
                          >
                            You Pay{' '}
                            <Typography variant="caption">{`(After Discount + Delivery fee + Add Ons)`}</Typography>
                          </Typography>
                        </TableCell>
                        <TableCell
                          align="right"
                          sx={{ fontSize: { xs: '1rem', sm: '1.5rem' }, fontWeight: 'bold' }}
                        >
                          ₹{finalCost.toFixed(2)}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </AccordionDetails>
            </Accordion>
          </Box>

          <Box display="flex" flexDirection={'row'} justifyContent="space-between" gap={1}>
            <Button
              startIcon={loading && <CircularProgress size="20px" sx={{ color: 'white' }} />}
              variant="contained"
              fullWidth
              sx={{ bgcolor: 'red', color: 'white' }}
              onClick={handlePlaceOrder}
              size={isSmallScreen ? 'small' : 'large'}
            >
              {loading ? `Ordering...` : `Place Order`}
            </Button>
            <Button
              variant="outlined"
              fullWidth
              color="error"
              onClick={handleCancelOrder}
              size={isSmallScreen ? 'small' : 'large'}
            >
              Cancel
            </Button>
          </Box>
          <PopupHOC
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
          </PopupHOC>
        </Box>
      )}
    </>
  )
}

export default OrderForm
