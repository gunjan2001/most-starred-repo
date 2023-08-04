import { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useDispatch, useSelector } from "react-redux";
import RefreshIcon from "@mui/icons-material/Refresh";
import { Box } from "@mui/material";
import { fetchContributers } from "../redux/actions/fetchContributers";
import PropTypes from "prop-types";

const CommitActivityGraph = ({ owner, repo }) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.githubRepos);

  const [refresh, setRefresh] = useState(false);

  const handleRefresh = () => {
    setRefresh(!refresh);
  };

  useEffect(() => {
    if (refresh) {
      setRefresh(!refresh);
      dispatch(fetchContributers({ owner, repo }));
    }
  }, [refresh, owner, repo, dispatch]);

  if (data.loading) {
    return (
      <Box
        sx={{
          height: 200,
          display: "flex",
          alignItems: "end",
          justifyContent: "center",
        }}
      >
        <RefreshIcon
          sx={{ fontSize: 24, cursor: "pointer" }}
          onClick={handleRefresh}
        />
      </Box>
    );
  } else {
    const commitsPerWeek = data.commitsData.map((week) => ({
      x: week.week * 1000, // Convert UNIX timestamp to milliseconds
      y: week.total,
      timestamp: new Date(week.week * 1000).toDateString(), // Convert UNIX timestamp to human-readable date
    }));

    const options = {
      chart: {
        type: "line",
        width: 600,
      },
      title: {
        text: "Total Number of Changes Across All Contributors Per Week",
      },
      xAxis: {
        type: "datetime",
        title: {
          text: "Week",
        },
      },
      yAxis: {
        title: {
          text: "Total Changes",
        },
      },
      tooltip: {
        formatter: function () {
          return `Week: <b>${this.point.timestamp}</b><br>Changes: <b>${this.point.y}</b>`;
        },
      },
      series: [
        {
          name: "Total Changes",
          data: commitsPerWeek,
        },
      ],
    };

    return <HighchartsReact highcharts={Highcharts} options={options} />;
  }
};

CommitActivityGraph.propTypes = {
  owner: PropTypes.string,
  repo: PropTypes.string,
};

export default CommitActivityGraph;
