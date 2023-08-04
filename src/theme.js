import { createTheme } from "@mui/material";

let theme = createTheme({
  typography: {
    fontFamily: "Arial, sans-serif",
    body1: {
      fontSize: 14,
      "@media (max-width:600px)": {
        fontSize: 12,
      },
    },
  },
});

export default theme;
