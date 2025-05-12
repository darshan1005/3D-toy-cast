import { Box, Typography } from "@mui/material";

const Bento = () => {
  return (
    <Box
      sx={{
        backgroundColor: 'red',
        p: 2,
        pb: 1,
      }}>
      <Box sx={{
        backgroundColor: 'white',
        padding: 2,
        borderRadius: 3,
        display: 'flex',
        flexDirection: 'row',
        gap: 2
      }}>
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box display={'flex'} flexDirection='row' gap={2}>
            <Box display={'flex'} flexDirection='column' gap={2} flex={2}>
              <Box
                sx={{
                  flex: 1,
                  borderRadius: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  minHeight: '175px',
                  backgroundColor: 'black',
                }}
              >
                <Typography variant="h4" sx={{ color: 'white', fontWeight: 600 }}>
                  3D Printed Frames
                </Typography>
                <Typography sx={{ color: '#dedede', fontSize: '0.9rem', px: 2, mt: 1 }}>
                  Premium quality frames with stunning detail and durability
                </Typography>
              </Box>
              <Box
                sx={{
                  flex: 1,
                  borderRadius: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  minHeight: '175px',
                  backgroundColor: 'red',
                }}
              >
                <Typography variant="h4" sx={{ color: 'white', fontWeight: 600 }}>
                  Die-Cast Collection
                </Typography>
                <Typography sx={{ color: '#f8f8f8', fontSize: '0.9rem', px: 2, mt: 1 }}>
                  Authentic replicas with precise engineering details
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                flex: 1,
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                minHeight: '208px',
                backgroundColor: 'black',
              }}
            >
              <Typography variant="h2" sx={{ color: 'white', fontWeight: 700 }}>
                700+
              </Typography>
              <Typography variant="h4" sx={{ color: 'white', mt: 1 }}>
                Satisfied Collectors
              </Typography>
            </Box>
          </Box>
          <Box display={'flex'} flexDirection='row' gap={2}>
            <Box
              sx={{
                flex: 1,
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                minHeight: '175px',
                backgroundColor: 'black',
              }}
            >
              <Typography variant="h6" sx={{ color: 'white', fontWeight: 600 }}>
                Fast & Secure Delivery
              </Typography>
            </Box>
            <Box
              sx={{
                flex: 2,
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                minHeight: '175px',
                backgroundColor: 'red',
              }}
            >
              <Typography variant="h4" sx={{ color: 'white', fontWeight: 600 }}>
                Custom Displays
              </Typography>
              <Typography sx={{ color: '#f8f8f8', fontSize: '0.9rem', px: 2, mt: 1 }}>
                Bespoke display solutions for your prized collection
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            width: '350px',
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            backgroundColor: 'black',
          }}>
          <Typography variant="h6" sx={{ color: 'white', fontWeight: 600 }}>
            3D TOY CAST
          </Typography>

        </Box>
      </Box>
    </Box>
  )
}

export default Bento;