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
  Tooltip
} from '@mui/material';
import { useState } from 'react';
import ToyCard from '@components/custom/ToyCard';
import { carToyData } from '../data/ToyData';

const ToysPage = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [selectedType, setSelectedType] = useState('');
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [filteredData, setFilteredData] = useState(carToyData);

  const handleTypeChange = (type: string) => {
    setSelectedType(type);
    setSelectedBrands([]);
  };

  const getBrandOptions = () => {
    if (!selectedType) return [];
    return [...new Set(carToyData.filter(toy => toy.type === selectedType).map(toy => toy.name))];
  };

  const getDisplayedBrands = () => {
    if (selectedBrands.length <= 1) return selectedBrands;
    return selectedBrands.slice(0, 1);
  };

  const handleApplyFilters = () => {
    let filtered = carToyData;

    if (selectedType) {
      filtered = filtered.filter(toy => toy.type === selectedType);
    }

    if (selectedBrands.length > 0) {
      filtered = filtered.filter(toy => selectedBrands.some(brand => toy.name.includes(brand)));
    }

    setFilteredData(filtered);
  };

  const handleResetFilters = () => {
    setFilteredData(carToyData);
    setSelectedType('');
    setSelectedBrands([]);
  };

  return (
    <Box
      sx={{
        backgroundColor: 'red',
        p: 2,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
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
        {/* Navigation Buttons */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
        >
        </Stack>

        {/* Filters Section */}
        <Stack
          direction={isSmallScreen ? 'column' : 'row'}
          spacing={2}
          mb={3}
          justifyContent="center"
          alignItems={isSmallScreen ? "flex-start" : "center"}
        >
          <Select
            value={selectedType}
            onChange={(e) => handleTypeChange(e.target.value)}
            displayEmpty
            sx={{
              minWidth: 350,
              width: isSmallScreen ? '100%' : 'auto',
            }}
          >
            <MenuItem value="">Select Type</MenuItem>
            <MenuItem value="Car">Car</MenuItem>
            <MenuItem value="Bike">Bike</MenuItem>
          </Select>

          <Autocomplete
            multiple
            options={getBrandOptions()}
            value={selectedBrands}
            onChange={(event, newValue) => setSelectedBrands(newValue)}
            renderInput={(params) => (
              <TextField {...params} label="Select Brands" placeholder="Brands" />
            )}
            renderTags={(value, getTagProps) => (
              <>
                {getDisplayedBrands().map((option, index) => (
                  <span {...getTagProps({ index })}>
                    {option}
                  </span>
                ))}
                {selectedBrands.length > 1 && (
                  <span
                    style={{
                      backgroundColor: 'lightgrey',
                      color: 'black',
                      borderRadius: '3rem',
                      padding: 4
                    }}
                  >
                    +{selectedBrands.length - 1}
                  </span>
                )}
              </>
            )}
            sx={{
              minWidth: 350,
              width: isSmallScreen ? '100%' : 250,
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
        {selectedBrands.length !== 0 && <Box
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
            width: '65%'
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
        </Box>}

        {/* Toys Grid */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: isSmallScreen ? '1fr' : 'repeat(auto-fit, minmax(200px, 1fr))',
            gridGap: '16px',
            placeItems: 'start',
          }}
        >
          {filteredData.map(toy => (
            <Box key={toy.id}>
              <ToyCard
                image={toy.image}
                name={toy.name}
                description={toy.description}
                price={toy.price}
                moterType={toy.type}
              />
            </Box>
          ))}
        </Box>
      </Box>
    </Box >
  );
};

export default ToysPage;
