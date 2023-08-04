import { useDispatch } from "react-redux";
import "./App.css";
import Navbar from "./components/Navbar";
import RepoTable from "./components/RepoTable";
import { fetchRepoData } from "./redux/actions/fetchRepoData";
import { useState } from "react";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();
  const [pageNumber, setPageNumber] = useState(1);
  useEffect(() => {
    dispatch(fetchRepoData(pageNumber));
  }, [dispatch, pageNumber]);

  const handlePageNumberChange = (newPageNumber) => {
    setPageNumber(newPageNumber);
  };

  return (
    <>
      <Navbar />
      <RepoTable
        pageNumber={pageNumber}
        onPageNumberChange={handlePageNumberChange}
      />
    </>
  );
}

export default App;
