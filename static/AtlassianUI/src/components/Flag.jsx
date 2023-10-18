import React from "react";
import InfoIcon from "@atlaskit/icon/glyph/info";
import { N500 } from "@atlaskit/theme/colors";
import { token } from "@atlaskit/tokens";
import { SimpleTag as Tag } from "@atlaskit/tag";
import Flag from "@atlaskit/flag";

const GetDescription = () => {
  return (
    <>
      <span>
        No Testcases available. Visit{" "}
        <Tag text="TestGenR Config" color="standard" /> in Project settings for
        usage. Powered by openai
      </span>
    </>
  );
};
const FlagInfoExample = () => {
  return (
    <Flag
      appearance="info"
      icon={
        <InfoIcon
          label="Info"
          secondaryColor={token("color.background.neutral.bold", N500)}
        />
      }
      id="info"
      key="info"
      title="There are no available testcases"
      description={<GetDescription />}
    />
  );
};

export default FlagInfoExample;
