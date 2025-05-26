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
import { useState, useEffect, useCallback, useMemo } from 'react'
import ToyCard from '@components/custom/ToyCard'
import ConfirmComponent from '@components/custom/NavHeader'
import { useNavigate } from 'react-router-dom'
import { calculateSellingPrice } from '@utils/pricing'
import toysJsonData from '../content/ToysData.json'
import { ToyDataProps } from 'src/types/types'

const ToysPage = () => {
  const navigate = useNavigate()
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))

  const [selectedToyType, setSelectedToyType] = useState('')
  const [selectedToyScale, setSelectedToyScale] = useState('')
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [filteredData, setFilteredData] = useState(toysJsonData.toys)
  const [selectedToys, setSelectedToys] = useState<ToyDataProps[]>([])

  const toysDataJSON = useMemo(() => {
    return toysJsonData.toys.map((toy: ToyDataProps) => ({
      ...toy,
    }))
  }, [toysJsonData.toys])

  const [appliedFilters, setAppliedFilters] = useState({
    type: '',
    scale: '',
    brands: [] as string[],
  })

  // Load selected toys from sessionStorage on component mount
  useEffect(() => {
    const savedToys = sessionStorage.getItem('selectedToys')
    if (savedToys) {
      setSelectedToys(JSON.parse(savedToys))
    }
  }, [])

  // Listen for storage updates
  useEffect(() => {
    const handleStorageUpdate = () => {
      const savedToys = sessionStorage.getItem('selectedToys')
      if (savedToys) {
        setSelectedToys(JSON.parse(savedToys))
      } else {
        setSelectedToys([])
      }
    }

    window.addEventListener('storageUpdate', handleStorageUpdate)
    return () => {
      window.removeEventListener('storageUpdate', handleStorageUpdate)
    }
  }, [])

  const handleTypeChange = (type: string) => {
    setSelectedToyType(type)
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
    if (!selectedToyType) return []
    return [
      ...new Set(toysDataJSON.filter(toy => toy.type === selectedToyType).map(toy => toy.name)),
    ]
  }

  const getDisplayedBrands = () => {
    if (selectedBrands.length <= 1) return selectedBrands
    return selectedBrands.slice(0, 1)
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

  // Filtering logic should use toysDataJSON
  const handleApplyFilters = useCallback(() => {
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

    setFilteredData(filtered)
    setAppliedFilters(currentFilters)
  }, [selectedToyType, selectedToyScale, selectedBrands, currentFilters, toysDataJSON])

  const handleResetFilters = () => {
    setFilteredData(toysDataJSON)
    setSelectedToyType('')
    setSelectedToyScale('')
    setSelectedBrands([])
  }

  const handleToySelect = (toy: ToyDataProps) => {
    const availabilityType = sessionStorage.getItem('availabilityType')
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

      // Save to sessionStorage
      if (newSelected.length === 0) {
        sessionStorage.removeItem('selectedToys')
      } else {
        sessionStorage.setItem('selectedToys', JSON.stringify(newSelected))
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
          navigateTo={sessionStorage.getItem('availabilityType') === '3d' ? '/framespage' : '/'}
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
                height: isSmallScreen ? '40px' : 'auto',
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

            <Autocomplete
              multiple
              disableCloseOnSelect
              options={getBrandOptions()}
              value={selectedBrands}
              onChange={(event, newValue) => setSelectedBrands(newValue)}
              renderInput={params => (
                <TextField {...params} label="Select Brands" placeholder="Brands" />
              )}
              renderTags={(value, getTagProps) => (
                <>
                  {getDisplayedBrands().map((option, index) => (
                    <span {...getTagProps({ index })}>{option}</span>
                  ))}
                </>
              )}
              sx={{
                minWidth: 250,
                width: isSmallScreen ? '100%' : 'auto',
                height: isSmallScreen ? '55px' : 'auto',
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
                variant={filtersChanged ? 'contained' : 'outlined'}
                onClick={handleApplyFilters}
                disabled={!selectedToyScale && !selectedToyType && selectedBrands.length === 0}
                sx={{
                  fontWeight: 600,
                  bgcolor: filtersChanged ? 'black' : '#eee',
                  color: filtersChanged ? 'white' : 'black',
                  border: '2px solid #6665',
                }}
              >
                Apply
              </Button>

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
          {selectedBrands.length !== 0 && (
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
          {filteredData.length !== 0 ? (
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
              {filteredData.map(toy => (
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
