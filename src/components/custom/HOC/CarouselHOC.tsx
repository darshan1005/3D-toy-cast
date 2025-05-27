import { Box, SxProps, Theme, useMediaQuery, useTheme } from "@mui/material";

interface CarouselProps<T = any> {
  data: T[];
  children: (item: T, index: number) => React.ReactNode;
}

const CarouselHOC = <T,>({ children, data }: CarouselProps<T>) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const containerStyles: SxProps<Theme> = isSmallScreen
    ? {
      display: "flex",
      overflowX: "auto",
      scrollSnapType: "x mandatory",
      gap: 2,
      paddingBottom: 2,
      "&::-webkit-scrollbar": { display: "none" },
      scrollbarWidth: "none",
    }
    : {
      display: "flex",
      justifyContent: "center",
      gap: 3,
    };

  const cardStyles: SxProps<Theme> = isSmallScreen
    ? {
      flex: "0 0 80%",
      scrollSnapAlign: "start",
    }
    : {
      width: "300px",
    };

  return (
    <Box
      component="ul"
      sx={{ ...containerStyles, listStyle: "none", margin: 0, padding: 0 }}
    >
      {data.map((item, index) => (
        <Box
          component="li"
          key={index}
          sx={{ ...cardStyles, display: "flex" }}
        >
          {children(item, index)}
        </Box>
      ))}
    </Box>
  );
};

export default CarouselHOC;
