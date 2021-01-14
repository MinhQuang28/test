import styled from 'styled-components/native';
import {normalizeFontSize} from '../../../utils/style.util';
import {
  Heading1FontSize,
  Heading2FontSize,
  Heading3FontSize,
  Heading4FontSize,
  Heading5FontSize,
} from '../../../themes/size';
import {Black, Grey05} from '../../../themes/colors';
import {Text} from '../index';

export const H1 = styled(Text)`
  font-size: ${normalizeFontSize(Heading1FontSize)}px;
  line-height: ${normalizeFontSize(Heading1FontSize) * 1.2}px;
  color: ${Black};
`;

export const H2 = styled(Text)`
  font-size: ${normalizeFontSize(Heading2FontSize)}px;
  line-height: ${normalizeFontSize(Heading2FontSize) * 1.2}px;
  color: ${Black};
`;

export const H3 = styled(Text)`
  font-size: ${normalizeFontSize(Heading3FontSize)}px;
  line-height: ${normalizeFontSize(Heading3FontSize) * 1.2}px;
  color: ${Black};
`;

export const H4 = styled(Text)`
  font-size: ${normalizeFontSize(Heading4FontSize)}px;
  line-height: ${normalizeFontSize(Heading4FontSize) * 1.2}px;
  color: ${Black};
`;

export const H5 = styled(Text)`
  font-size: ${normalizeFontSize(Heading5FontSize)}px;
  line-height: ${normalizeFontSize(Heading5FontSize) * 1.2}px;
  color: ${Black};
`;

export const BodyLarge = styled(Text)`
  font-size: ${normalizeFontSize(16)}px;
  line-height: ${normalizeFontSize(16) * 1.6}px;
  color: ${Grey05};
`;
