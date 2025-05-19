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
} from '@mui/material'
import React, { useState, useEffect } from 'react'
import ToyCard from '@components/custom/ToyCard'
import { ToyData, ToyDataProps } from '../data/ToyData'
import ConfirmComponent from '@components/custom/ConfirmComponent'
import { useNavigate } from 'react-router-dom'

const ToysPage = () => {
  const navigate = useNavigate()
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))

  const [selectedType, setSelectedType] = useState('')
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [filteredData, setFilteredData] = useState(ToyData)
  const [selectedToys, setSelectedToys] = useState<ToyDataProps[]>([])

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
    setSelectedType(type)
    setSelectedBrands([])
  }

  const getTypeOptions = () => {
    return [...new Set(ToyData.map(toy => toy.type))]
  }

  const getBrandOptions = () => {
    if (!selectedType) return []
    return [...new Set(ToyData.filter(toy => toy.type === selectedType).map(toy => toy.name))]
  }

  const getDisplayedBrands = () => {
    if (selectedBrands.length <= 1) return selectedBrands
    return selectedBrands.slice(0, 1)
  }

  const handleApplyFilters = () => {
    let filtered = ToyData

    if (selectedType) {
      filtered = filtered.filter(toy => toy.type === selectedType)
    }

    if (selectedBrands.length > 0) {
      filtered = filtered.filter(toy => selectedBrands.some(brand => toy.name.includes(brand)))
    }

    setFilteredData(filtered)
  }

  const handleResetFilters = () => {
    setFilteredData(ToyData)
    setSelectedType('')
    setSelectedBrands([])
  }

  const handleToySelect = (toy: ToyDataProps) => {
    const availabilityType = sessionStorage.getItem('availabilityType')

    setSelectedToys(prevSelected => {
      let newSelected: ToyDataProps[]
      const isAlreadySelected = prevSelected.some(t => t.id === toy.id)

      if (isAlreadySelected) {
        newSelected = prevSelected.filter(t => t.id !== toy.id)
      } else {
        if (availabilityType === 'toy') {
          newSelected = [...prevSelected, toy]
        } else {
          if (prevSelected.length < 2) {
            newSelected = [...prevSelected, toy]
          } else {
            newSelected = [prevSelected[1], toy]
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
    const availabilityType = sessionStorage.getItem('availabilityType');
    const nav = availabilityType === '3d' ? '/framespage' : '/'
    navigate(nav, {
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
          label={sessionStorage.getItem('availabilityType') === '3d' ? 'Next' : 'Proceed'}
          showHome={false} />
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
              value={selectedType}
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

            <Autocomplete
              multiple
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
                  {selectedBrands.length > 1 && (
                    <span
                      style={{
                        backgroundColor: 'lightgrey',
                        color: 'black',
                        borderRadius: '3rem',
                        padding: 4,
                      }}
                    >
                      +{selectedBrands.length - 1}
                    </span>
                  )}
                </>
              )}
              sx={{
                minWidth: 250,
                width: isSmallScreen ? '100%' : 'auto',
                height: isSmallScreen ? '55px' : 'auto',
              }}
              disabled={!selectedType}
            />

            <Button
              variant="contained"
              onClick={handleApplyFilters}
              disabled={!selectedType && selectedBrands.length === 0}
              sx={{
                fontWeight: 600,
                bgcolor: 'black',
                color: 'white',
                width: isSmallScreen ? '100%' : 'auto',
                '&:hover': {
                  bgcolor: 'white',
                  color: 'black',
                },
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
                width: isSmallScreen ? '100%' : 'auto',
                '&:hover': {
                  bgcolor: 'white',
                  color: 'black',
                },
              }}
              disabled={selectedBrands.length === 0}
            >
              Clear Filters
            </Button>
          </Stack>

          {/* Selected Brands Display */}
          {selectedBrands.length !== 0 && (
            <Box
              sx={{
                display: 'flex',
                margin: '0 auto',
                flexWrap: 'wrap',
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
                <Box
                  key={index}
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    backgroundColor: '#f0f0f0',
                    borderRadius: '16px',
                    padding: '4px 8px',
                    fontSize: '14px',
                    fontWeight: 500,
                  }}
                >
                  {brand}
                </Box>
              ))}
            </Box>
          )}

          {/* Toys Grid */}
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
              <React.Fragment key={toy.id}>
                <ToyCard
                  image={toy.image}
                  name={toy.name}
                  description={toy.description}
                  price={toy.price}
                  moterType={toy.type}
                  scale={toy.scale}
                  onSelect={() => handleToySelect(toy)}
                  isSelected={selectedToys.some(t => t.id === toy.id)}
                />
              </React.Fragment>
            ))}
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default ToysPage
