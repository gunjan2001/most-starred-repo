import CommitActivityGraph from "./CommitActivityGraph";
import ContributorChart from "./ContributorChart";
import AdjustIcon from "@mui/icons-material/Adjust";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import StarIcon from "@mui/icons-material/Star";
import moment from "moment";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { forwardRef, useState } from "react";
import { Box, Stack } from "@mui/material";
import PropTypes from "prop-types";

const RepoRow = forwardRef(function Row(props, ref) {
  const { row } = props;
  const [openRow, setOpenRow] = useState(false);

  let timeInterval = row.created_at.split("T")[0];
  timeInterval = moment(row.created_at, "YYYY-MM-DD").fromNow();
  return (
    <>
      <TableRow ref={ref} onClick={() => setOpenRow(!openRow)}>
        <TableCell component="th" scope="row">
          <Box display={"flex"}>
            <Box
              maxHeight={100}
              maxWidth={100}
              display={"flex"}
              alignItems={"center"}
            >
              <img src={row.owner.avatar_url} alt="profile-avatar" width={80} />
            </Box>
            <Box display={"flex"} flexDirection={"column"} ml={2}>
              <Typography variant="body1" fontWeight={"bold"}>
                {row.name}
              </Typography>
              <Typography variant="body1">{row.description}</Typography>
              <Stack direction={"row"} spacing={2} alignItems={"center"}>
                <Stack
                  direction={"row"}
                  alignItems={"center"}
                  backgroundColor="lightgray"
                  borderRadius={1}
                  padding={1}
                >
                  <Box display={"flex"}>
                    <StarIcon sx={{ color: "golden" }} />
                  </Box>
                  <Typography sx={{ ml: 0.3 }}>
                    {row.stargazers_count} stars
                  </Typography>
                </Stack>
                <Stack
                  direction={"row"}
                  alignItems={"center"}
                  backgroundColor="lightgray"
                  borderRadius={1}
                  padding={1}
                >
                  <Box display={"flex"}>
                    <AdjustIcon />
                  </Box>
                  <Typography variant="body1" sx={{ ml: 0.3 }}>
                    {row.open_issues_count} issues
                  </Typography>
                </Stack>
                <Typography variant="body1" color={"purple"}>
                  {`Last pushed ${timeInterval} by ${row.owner.login}`}
                </Typography>
              </Stack>
            </Box>
          </Box>
        </TableCell>
        <TableCell>
          <IconButton aria-label="expand row" size="small">
            {openRow ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={openRow} timeout="auto" unmountOnExit>
            <Stack direction={"row"} display={"flex"} justifyContent={"center"}>
              <Box>
                <Box
                  m={1}
                  display={"flex"}
                  justifyContent={"center"}
                  flexDirection={"column"}
                >
                  <CommitActivityGraph
                    owner={row.owner.login}
                    repo={row.name}
                  />
                </Box>
                <Box m={1} display={"flex"} justifyContent={"center"}>
                  <ContributorChart owner={row.owner.login} repo={row.name} />
                </Box>
              </Box>
            </Stack>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
});

RepoRow.propTypes = {
  row: PropTypes.object,
};

export default RepoRow;
