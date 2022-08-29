import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import UploadIcon from "@mui/icons-material/Upload";
import DownloadIcon from "@mui/icons-material/Download";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import DeleteIcon from "@mui/icons-material/Delete";
import { alpha, styled } from "@mui/material/styles";

const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "green",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "green",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "red",
    },
    "&:hover fieldset": {
      borderColor: "yellow",
    },
    "&.Mui-focused fieldset": {
      borderColor: "green",
    },
  },
});

export const CustomerListToolbar = (props) => (
  <Box {...props}>
    <Box
      sx={{
        alignItems: "center",
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
      }}
    >
      <Typography sx={{ m: 1, color: "white" }} variant="h4">
        History
      </Typography>
    </Box>
    <Box sx={{ mt: 3 }}>
      <Card>
        <CardContent sx={{ backgroundColor: "#121212" }}>
          <Box
            component="form"
            sx={{
              "& > :not(style)": {
                m: 1,
                maxWidth: 500,
              },
            }}
            noValidate
            autoComplete="off"
          >
          </Box>
        </CardContent>
      </Card>
    </Box>
  </Box>
);
