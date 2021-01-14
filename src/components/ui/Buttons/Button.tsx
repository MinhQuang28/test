import React, {FC, ReactNode} from 'react';
import {ActivityIndicator, TouchableOpacityProps} from 'react-native';
import styled, {css} from 'styled-components/native';
import {
  Branding_06,
  Dark_01,
  Grey01,
  Text_03,
  Text_Dark_03,
  Transparent,
  White,
} from '../../../themes/colors';
import {FormControlHeight} from '../../../themes/size';
import {Spacing} from '../Common/Spacing';
import {withPosition, withSpacing} from '../../../hoc/style';

type ButtonType = 'primary' | 'outline' | 'secondary' | 'transparent';

const PrimaryButton = css`
  background-color: ${Branding_06};
`;
const PrimaryDisabled = css`
  background-color: ${Dark_01};
`;
const TransparentButton = css`
  background-color: ${Transparent};
`;
const Outline = css`
  background-color: ${Transparent};
  border: 1px solid ${Grey01};
  padding: 17px;
`;

const ButtonStyle = styled.TouchableOpacity<{
  buttonType?: ButtonType | any;
  disabled?: boolean | null;
}>`
  height: ${FormControlHeight.normal}px;
  flex-direction: row;
  align-items: center;
  align-self: flex-start;
  padding-left: 32px;
  padding-right: 32px;
  flex-grow: 0;
  flex-shrink: 1;
  border-radius: 10px;
  ${({buttonType, disabled}) => {
    switch (buttonType) {
      case 'primary': {
        if (disabled) {
          return PrimaryDisabled;
        }
        return PrimaryButton;
      }
      case 'outline': {
        return Outline;
      }

      case 'transparent': {
        return TransparentButton;
      }
      default: {
        return PrimaryButton;
      }
    }
  }}
`;

const PrimaryText = css`
  color: ${White};
`;
const OutlineText = css`
  color: ${Grey01};
`;
const PrimaryDisabledText = css`
  color: ${Text_03};
`;
const OutlineDisabledText = css`
  color: ${Dark_01};
`;
const ButtonText = styled.Text<{
  buttonType: ButtonType;
  disabled?: boolean | null;
}>`
  color: ${White};

  font-size: 16px;
  flex-grow: 0;
  ${({buttonType, disabled}) => {
    switch (buttonType) {
      case 'primary': {
        if (disabled) {
          return PrimaryDisabledText;
        }
        return PrimaryText;
      }
      case 'outline': {
        return OutlineText;
      }
      default: {
        return PrimaryText;
      }
    }
  }}
`;

interface Props {
  buttonType?: ButtonType;
  loading?: boolean;
  disabled?: boolean;
}

const Button: FC<Props & TouchableOpacityProps & Spacing> = ({
  children,
  buttonType = 'primary',
  loading,
  disabled,
  ...other
}) => {
  const renderChild = (child: ReactNode, key?: number) =>
    typeof child === 'string' ? (
      <ButtonText
        buttonType={buttonType}
        key={String(key)}
        disabled={disabled || loading}>
        {child}
      </ButtonText>
    ) : (
      child
    );
  return (
    <ButtonStyle
      buttonType={buttonType}
      {...other}
      disabled={disabled || loading}>
      {loading ? (
        <ActivityIndicator color={White} size={Small} />
      ) : Array.isArray(children) ? (
        children.map(renderChild)
      ) : (
        renderChild(children)
      )}
    </ButtonStyle>
  );
};

export default withPosition(withSpacing(Button));
