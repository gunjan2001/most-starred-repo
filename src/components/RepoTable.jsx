import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import { Container } from "@mui/material";
import { useSelector } from "react-redux";
import { useCallback, useRef } from "react";
import Loading from "./Loading";
import RepoRow from "./RepoRow";
import PropTypes from "prop-types";

function RepoTable({ pageNumber, onPageNumberChange }) {
  const apiData = useSelector((state) => state.githubRepos);

  const observer = useRef();
  const lastRepoRef = useCallback(
    (node) => {
      if (apiData.loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          const updatedPageNumber = pageNumber + 1;
          onPageNumberChange(updatedPageNumber);
        }
      });
      if (node) observer.current.observe(node);
    },
    [onPageNumberChange, apiData.loading, pageNumber]
  );

  return (
    <>
      <Container sx={{ mt: 5 }}>
        <TableContainer sx={{ boxShadow: 5 }} component={Paper}>
          <Table aria-label="collapsible table">
            <TableBody>
              {apiData.githubRepoData.map((row, index) =>
                apiData.githubRepoData.length > index + 1 ? (
                  <RepoRow ref={lastRepoRef} key={index} row={row} />
                ) : (
                  <RepoRow key={index} row={row} />
                )
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <Box width={"100%"} display={"flex"} justifyContent={"center"} mt={1}>
          <Loading />
        </Box>
      </Container>
    </>
  );
}

RepoTable.propTypes = {
  pageNumber: PropTypes.number,
  onPageNumberChange: PropTypes.func,
};

export default RepoTable;
