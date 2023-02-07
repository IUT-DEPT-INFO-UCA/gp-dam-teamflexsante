import { Box, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import SimpleLineChart from "../SimpleLineChart";
import TwoLinesChart from "../TwoLinesChart";

const HealthInfo = (props) => {
  const { t } = useTranslation();
  const { user } = props;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
        backgroundColor: "background.default",
      }}
    >
      <Typography component="h1" variant="h5">
        {t("healthInfo.title")}
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-around",
          alignItems: "center",
          height: "100%",
          width: "100%",
        }}
      >
        {/* TODO : chart based on user data */}
      </Box>
    </Box>
  );
};

HealthInfo.propTypes = {
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user.user,
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(HealthInfo);
