import { useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useDispatch, useSelector } from "react-redux";
import { fetchContributers } from "../redux/actions/fetchContributers";
import { Box } from "@mui/material";
import PropTypes from "prop-types";

const ContributorChart = ({ owner, repo }) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.githubRepos);

  useEffect(() => {
    dispatch(fetchContributers({ owner, repo }));
  }, [dispatch, owner, repo]);

  if (data.loading) {
    return <Box sx={{ height: 200 }}>Try Again</Box>;
  } else {
    const seriesData = data.contributorData.map((contributor) => ({
      name: contributor.author.login,
      data: contributor.weeks.map((week) => ({
        x: new Date(week.w * 1000).getTime(), // Convert the timestamp to milliseconds
        y: week.c,
      })),
    }));

    const options = {
      chart: {
        type: "line",
      },
      title: {
        text: "GitHub Contributors - Weekly Changes",
      },
      xAxis: {
        type: "datetime",
        labels: {
          formatter: function () {
            return Highcharts.dateFormat("%Y-%m-%d", this.value);
          },
        },
      },
      yAxis: {
        title: {
          text: "Number of Changes",
        },
      },
      tooltip: {
        formatter: function () {
          const timestamp = Highcharts.dateFormat("%Y-%m-%d", this.x);
          const contributor = this.series.name;
          const changes = this.y;
          return `<b>Contributor:</b> ${contributor}<br/><b>Date:</b> ${timestamp}<br/><b>Changes:</b> ${changes}`;
        },
      },
      legend: {
        align: "right",
        verticalAlign: "top",
        layout: "vertical",
      },
      series: seriesData,
    };

    return (
      <>
        <HighchartsReact highcharts={Highcharts} options={options} />
      </>
    );
  }
};

ContributorChart.propTypes = {
  owner: PropTypes.string,
  repo: PropTypes.string,
};

export default ContributorChart;
