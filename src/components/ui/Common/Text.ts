import { css } from 'styled-components';

export type TextAlignment = Partial<{
  center: boolean;
  left: boolean;
  right: boolean;
  wrap: boolean;
  color: string;
  fontFamily: string;
  size: number;
}>;
export const TextAlignmentCss = css<TextAlignment>`
  ${(props) =>
    props.center &&
    css`
      text-align: center;
    `};
  ${(props) =>
    props.left &&
    css`
      text-align: left;
    `};
  ${(props) =>
    props.right &&
    css`
      text-align: right;
    `};
  ${(props) =>
    props.wrap === false &&
    css`
      white-space: nowrap;
    `};
  ${(props) =>
    props.color &&
    css`
      color: ${props.color};
    `};
  ${(props) =>
    props.size &&
    css`
      font-size: ${4 * props.size}px;
    `};
  ${(props) =>
    props.fontFamily &&
    css`
      font-family: ${props.fontFamily};
    `};
`;
