import React from "react";
import InfoIcon from "@atlaskit/icon/glyph/info";
import { N500 } from "@atlaskit/theme/colors";
import { token } from "@atlaskit/tokens";
import { SimpleTag as Tag } from "@atlaskit/tag";
import Flag from "@atlaskit/flag";

const NoTestCases = () => {
  return (
    <>
      <span>
        No Testcases available. Visit <Tag text="TestGenR Config" color="standard" /> in Project settings for usage.
        Powered by openai
      </span>
    </>
  );
};
const Loading = () => {
  return (
    <>
      <span>Testcases are taking longer to generate. Please come again later.</span>
    </>
  );
};
const FlagInfoExample = ({ loading }) => {
  return (
    <Flag
      appearance="info"
      icon={<InfoIcon label="Info" secondaryColor={token("color.background.neutral.bold", N500)} />}
      id="info"
      key="info"
      title={loading ? "Still generating..." : "There are no available testcases"}
      description={loading ? <Loading /> : <NoTestCases />}
    />
  );
};

export default FlagInfoExample;
