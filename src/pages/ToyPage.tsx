import {
  Box,
  Button,
  Stack,
  useMediaQuery,
  useTheme,
  Select,
  MenuItem,
  Autocomplete,
  TextField,
  Chip,
  Typography,
} from '@mui/material'
import { useState, useEffect, useMemo } from 'react'
import ToyCard from '@components/custom/ToyCard'
import ConfirmComponent from '@components/custom/NavHeader'
import { useNavigate } from 'react-router-dom'
import { calculateSellingPrice } from '@utils/pricing'
import toysJsonData from '../content/ToysData.json'
import { ToyDataProps } from 'src/types/types'
import { canToyFitInFrame } from '@utils/fitUtils'
import { getFilters, getOrderType, remove } from '@utils/session'
import { getToyItem, removeToyItem, setToyItem } from '../DB/ToyStore'
import { getFrameItem } from '../DB/FrameStore'
import { memCache } from '../Cache/instance'

const ToysPage = () => {
  const navigate = useNavigate()
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))

  const [selectedToyType, setSelectedToyType] = useState('')
  const [selectedToyScale, setSelectedToyScale] = useState('')
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedToys, setSelectedToys] = useState<ToyDataProps[]>([])
  const [selectedFrameType, setSelectedFrameType] = useState<string>('')
  const [selectedFrameDimension, setSelectedFrameDimension] = useState<string>('')

  const TOYS_CACHE_KEY = 'toysDataCache'

  const getToysData = () => {
    let data = memCache.get<ToyDataProps[]>(TOYS_CACHE_KEY)
    if (!data) {
      data = toysJsonData.toys.map((toy: ToyDataProps) => ({
        ...toy,
      }))
      memCache.set<ToyDataProps[]>(TOYS_CACHE_KEY, data)
    }
    return data
  }
  const toysDataJSON = getToysData()

  const [appliedFilters, setAppliedFilters] = useState({
    type: '',
    scale: '',
    brands: [] as string[],
  })

  // Load selected toys from indexDB on component mount
  useEffect(() => {
    const LoadSelectedToy = async () => {
      const savedToys = await getToyItem('selectedToys')
      if (savedToys) {
        setSelectedToys(JSON.parse(typeof savedToys === 'string' ? savedToys : '[]'))
      }

      // Load applied filters from indexDB
      const savedFilters = getFilters('appliedFilters')
      if (savedFilters) {
        const parsedFilters = JSON.parse(savedFilters)
        setSelectedToyType(parsedFilters.type || '')
        setSelectedToyScale(parsedFilters.scale || '')
        setSelectedBrands(parsedFilters.brands || [])
        setAppliedFilters(parsedFilters)
      } else {
        // If no filters are saved, reset to initial state
        setAppliedFilters({
          type: '',
          scale: '',
          brands: [],
        })
      }
    }
    LoadSelectedToy()
  }, [])

  // Listen for storage updates
  useEffect(() => {
    const handleStorageUpdate = () => {
      const savedToys = getToyItem('selectedToys')
      if (savedToys) {
        setSelectedToys(JSON.parse(typeof savedToys === 'string' ? savedToys : '[]'))
      } else {
        setSelectedToys([])
      }
    }

    window.addEventListener('storageUpdate', handleStorageUpdate)
    return () => {
      window.removeEventListener('storageUpdate', handleStorageUpdate)
    }
  }, [])

  // Load selected frame from indexDB on component mount
  useEffect(() => {
    const loadFrame = async () => {
      const frameData = await getFrameItem('selectedFrame')
      if (frameData) {
        const parsed = JSON.parse(typeof frameData === 'string' ? frameData : 'null')
        if (parsed && parsed.type) {
          setSelectedFrameType(parsed.type)
          setSelectedFrameDimension(parsed.selectedDimension)
        }
      }
    }
    loadFrame()
  }, [])

  const filteredToys = useMemo(() => {
    // 1. Apply UI filters
    let filtered = toysDataJSON
    if (selectedToyType) {
      filtered = filtered.filter(toy => toy.type === selectedToyType)
    }
    if (selectedToyScale) {
      filtered = filtered.filter(toy => toy.scale === selectedToyScale)
    }
    if (selectedBrands.length > 0) {
      filtered = filtered.filter(toy => selectedBrands.some(brand => toy.name.includes(brand)))
    }

    // 2. Apply frame fit filter if frame is selected
    if (selectedFrameType && selectedFrameDimension) {
      filtered = filtered.filter(toy =>
        canToyFitInFrame(toy.scale, selectedFrameType, selectedFrameDimension),
      )
    }

    return filtered
  }, [
    toysDataJSON,
    selectedToyType,
    selectedToyScale,
    selectedBrands,
    selectedFrameType,
    selectedFrameDimension,
  ])

  const handleTypeChange = (type: string) => {
    setSelectedToyType(type)
    setSelectedToyScale('')
    setSelectedBrands([])
  }

  const handleScaleChange = (scale: string) => {
    setSelectedToyScale(scale)
    setSelectedBrands([])
  }

  // Use toysDataJSON (from JSON) for all filtering and display logic
  const getTypeOptions = () => {
    return [...new Set(toysDataJSON.map(toy => toy.type))]
  }

  const getScaleOptions = () => {
    return [...new Set(toysDataJSON.map(toy => toy.scale))]
  }

  const getBrandOptions = () => {
    // If neither type nor scale is selected, return all brands
    if (!selectedToyType && !selectedToyScale) {
      return [...new Set(toysDataJSON.map(toy => toy.name))]
    }
    // If only type is selected
    if (selectedToyType && !selectedToyScale) {
      return [
        ...new Set(toysDataJSON.filter(toy => toy.type === selectedToyType).map(toy => toy.name)),
      ]
    }
    // If only scale is selected
    if (!selectedToyType && selectedToyScale) {
      return [
        ...new Set(toysDataJSON.filter(toy => toy.scale === selectedToyScale).map(toy => toy.name)),
      ]
    }
    // If both type and scale are selected
    return [
      ...new Set(
        toysDataJSON
          .filter(toy => toy.type === selectedToyType && toy.scale === selectedToyScale)
          .map(toy => toy.name),
      ),
    ]
  }

  const currentFilters = useMemo(
    () => ({
      type: selectedToyType,
      scale: selectedToyScale,
      brands: [...selectedBrands].sort(), // sort to ensure consistent comparison
    }),
    [selectedToyType, selectedToyScale, selectedBrands],
  )

  const filtersChanged = useMemo(() => {
    const brandsMatch =
      appliedFilters.brands.length === currentFilters.brands.length &&
      appliedFilters.brands.every(b => currentFilters.brands.includes(b))

    return (
      appliedFilters.type !== currentFilters.type ||
      appliedFilters.scale !== currentFilters.scale ||
      !brandsMatch
    )
  }, [appliedFilters, currentFilters])

  const handleResetFilters = () => {
    setSelectedToyType('')
    setSelectedToyScale('')
    setSelectedBrands([])
    remove('appliedFilters')
    setAppliedFilters({
      type: '',
      scale: '',
      brands: [],
    })
  }

  const handleToySelect = (toy: ToyDataProps) => {
    const availabilityType = getOrderType()
    const toyCardPrice = calculateSellingPrice(toy.price)
    const priceOnToyCard = { ...toy, price: toyCardPrice }

    setSelectedToys(prevSelected => {
      let newSelected: ToyDataProps[]
      const isAlreadySelected = prevSelected.some(t => t.id === toy.id)

      if (isAlreadySelected) {
        newSelected = prevSelected.filter(t => t.id !== toy.id)
      } else {
        if (availabilityType === 'toy') {
          newSelected = [...prevSelected, priceOnToyCard]
        } else {
          if (prevSelected.length < 2) {
            newSelected = [...prevSelected, priceOnToyCard]
          } else {
            newSelected = [prevSelected[1], priceOnToyCard]
          }
        }
      }

      // Save to indexDB
      if (newSelected.length === 0) {
        removeToyItem('selectedToys')
      } else {
        setToyItem('selectedToys', JSON.stringify(newSelected))
      }

      return newSelected
    })
  }

  const handleConfirm = () => {
    navigate('/', {
      state: { scrollToSelection: true },
    })
  }

  return (
    <>
      <Box
        sx={{
          backgroundColor: 'red',
          p: 2,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <ConfirmComponent
          onConfirm={handleConfirm}
          selectedToy={selectedToys[0]}
          label={'Proceed'}
          navigateTo={getOrderType() === '3d' ? '/framespage' : '/'}
        />
        <Box
          sx={{
            backgroundColor: 'white',
            padding: 2,
            borderRadius: 3,
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Filters Section */}
          <Stack
            direction={isSmallScreen ? 'column' : 'row'}
            spacing={2}
            mb={2}
            justifyContent="center"
            alignItems={isSmallScreen ? 'flex-start' : 'center'}
          >
            <Select
              value={selectedToyType}
              onChange={e => handleTypeChange(e.target.value)}
              displayEmpty
              sx={{
                minWidth: 250,
                height: isSmallScreen ? '40px' : 'auto',
                width: isSmallScreen ? '100%' : 'auto',
              }}
            >
              <MenuItem value="">Select Type</MenuItem>
              {getTypeOptions().map((type, index) => (
                <MenuItem key={index} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>

            <Select
              value={selectedToyScale}
              onChange={e => handleScaleChange(e.target.value)}
              displayEmpty
              sx={{
                minWidth: 250,
                width: isSmallScreen ? '100%' : 'auto',
              }}
            >
              <MenuItem value="">Select Scale</MenuItem>
              {getScaleOptions().map((scale, index) => (
                <MenuItem key={index} value={scale}>
                  {scale}
                </MenuItem>
              ))}
            </Select>

            {/* Brand Autocomplete with 1 chip + count */}
            <Autocomplete
              multiple
              limitTags={1}
              disableCloseOnSelect
              options={getBrandOptions()}
              value={selectedBrands}
              onChange={(event, newValue) => setSelectedBrands(newValue)}
              renderInput={params => (
                <TextField
                  {...params}
                  label="Select Brands"
                  placeholder="Brands"
                  inputProps={{
                    ...params.inputProps,
                    readOnly: true, // <-- This makes input not open dropdown on click/focus
                  }}
                />
              )}
              renderValue={(value, getTagProps) => {
                if (value.length === 0) return null
                const first = value[0]
                const rest = value.length - 1
                return [
                  <Chip label={first} {...getTagProps({ index: 0 })} />,
                  ...(rest > 0
                    ? [<Chip key="more" label={`+${rest}`} sx={{ marginLeft: 0.5 }} disabled />]
                    : []),
                ]
              }}
              sx={{
                minWidth: 250,
                width: isSmallScreen ? '100%' : 'auto',
              }}
              disabled={!selectedToyType}
            />

            <Box
              display={'flex'}
              flexDirection={'row'}
              gap={2}
              alignItems={'center'}
              justifyContent={'space-between'}
            >
              <Button
                variant="outlined"
                onClick={handleResetFilters}
                sx={{
                  fontWeight: 600,
                  color: 'black',
                  '&:hover': {
                    bgcolor: 'white',
                    color: 'black',
                  },
                }}
                disabled={!appliedFilters}
              >
                Clear Filters
              </Button>
            </Box>
          </Stack>

          {/* Selected Brands Display */}
          {selectedBrands.length > 1 && (
            <Box
              sx={{
                display: 'flex',
                margin: '0 auto',
                gap: 1,
                maxHeight: '100px',
                overflowY: 'auto',
                mb: 2,
                p: 1,
                border: '1px solid #ccc',
                borderRadius: '4px',
                width: isSmallScreen ? '100%' : '100%',
              }}
            >
              {selectedBrands.map((brand, index) => (
                <Chip
                  key={index}
                  label={brand}
                  onDelete={() => {
                    const updated = selectedBrands.filter(b => b !== brand)
                    setSelectedBrands(updated)
                  }}
                  sx={{
                    fontWeight: 500,
                    backgroundColor: '#f0f0f0',
                  }}
                />
              ))}
            </Box>
          )}

          {/* Toys Grid */}
          {filteredToys.length !== 0 ? (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                flexWrap: 'wrap',
                gap: 2,
                width: '100%',
                mx: 'auto',
              }}
            >
              {filteredToys.map(toy => (
                <ToyCard
                  key={toy.id}
                  image={toy.image}
                  name={toy.name}
                  description={toy.description}
                  price={calculateSellingPrice(toy.price)}
                  moterType={toy.type}
                  scale={toy.scale}
                  onSelect={() => handleToySelect(toy)}
                  isSelected={selectedToys.some(t => t.id === toy.id)}
                />
              ))}
            </Box>
          ) : (
            <Typography variant="h6" fontWeight={'bold'} color="#3337" textAlign={'center'} mt={2}>
              No items found
            </Typography>
          )}
        </Box>
      </Box>
    </>
  )
}

export default ToysPage
