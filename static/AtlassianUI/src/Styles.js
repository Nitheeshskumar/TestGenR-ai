import styled from "styled-components";
import { colors, elevation } from "@atlaskit/theme";

export const Card = styled.div`
  ${elevation["e100"]};
  background: ${colors.N0};
  position: relative;
  text-decoration: none;
  border-radius: 3px;
  margin: 4px 1px;

  box-sizing: border-box;
`;
// margin-top: -24px;
export const Status = styled.span`
  float: right;
  align-items: center;
  display: inline-flex;

  & > span {
    margin-left: 8px;
  }
`;

export const Form = styled.form`
  padding: 8px 0;
`;

export const LoadingContainer = styled.div`
  justify-content: center;
  display: flex;
  align-items: center;
  height: 100%;
`;
// padding: 8px;
export const Row = styled.div`
  transition: 0.3s ease all;

  border-bottom: 1px solid ${colors.N30};

  button {
    opacity: 0;
    transition: 0.2s ease all;
    margin-left: 8px;
  }

  &:hover {
    button {
      opacity: 1;
    }
  }

  ${(props) => `

    ${props.isCompact ? "padding: 0 6px;" : ""}
    ${props.isCompact ? "border: 0;" : ""}
    ${props.firstRow ? "margin-top: 40px;" : ""}
  `}
`;
// ${props.isChecked ? 'text-decoration: line-through;' : ''}
export const IconContainer = styled.span`
  position: relative;
  height: 20px;
  width: 24px;
  align-self: center;
  display: inline-flex;
  flex-wrap: nowrap;
  max-width: 100%;
  position: relative;
`;

export const Icon = styled.span`
  position: absolute;
`;

export const ScrollContainer = styled.div`
  overflow: auto;
  max-height: 660px;
`;

export const SummaryFooter = styled.div`
  width: 100%;
  height: 40px;
  top: 0;
  left: 0;
  position: absolute;
  background: ${colors.N10};
  border-top: 1px solid ${colors.N30};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const SummaryCount = styled.div`
  padding: 0 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const SummaryActions = styled.div`
  padding: 8px;
`;
