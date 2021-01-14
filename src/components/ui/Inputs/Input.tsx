import React, {
  FC,
  forwardRef,
  ReactElement,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  NativeSyntheticEvent,
  TextInput,
  TextInputFocusEventData,
  TextInputProps,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import styled, {css} from 'styled-components/native';
import {
  Black,
  Gray,
  Grey01,
  Grey02,
  Grey03,
  InputOutline,
  Primary,
  Text_03,
  Transparent,
  White,
} from '../../../themes/colors';
import {normalizeFontSize, normalizeSpace} from '../../../utils/style.util';

import {withSpacing} from '../../../hoc/style';
import View from '../View/View';
import Image from '../View/Image';
import Text from '../View/Text';

type InputType =
  | 'normal'
  | 'outline'
  | 'border_bottom'
  | 'default'
  | 'textarea'
  | 'no_border';

interface Props {
  renderSuffix?: ReactElement;
  renderPrefix?: ReactElement;
  label?: ReactElement | string;
  containerStyle?: ViewStyle;
  inputContainerStyle?: ViewStyle;
  inputType?: InputType;
  email?: boolean;
  number?: boolean;
  phone?: boolean;
  showViewPassword?: boolean;
  clearable?: boolean;
  handleClearText?: () => void;
}

const InputContainer = styled.TouchableOpacity<{
  focused?: boolean;
  inputType?: InputType;
}>`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: ${White};
  padding: 0 25px;
  height: 54px;
  border-radius: 10px;
  ${({inputType, focused}) => {
    switch (inputType) {
      case 'normal': {
        return css`
          background-color: ${White};
          ${focused
            ? css`
                border: 1.5px solid ${Primary};
              `
            : css`
                border: 1.5px solid ${Transparent};
              `}
        `;
      }
      case 'outline': {
        return css`
          border: 1px solid ${InputOutline};
        `;
      }
      case 'border_bottom': {
        return css`
          border-bottom-width: 0.5px;
          border-color: ${Grey03};
          padding: 0 4px;
        `;
      }
      case 'default': {
        return css`
          padding: 0;
        `;
      }
      case 'textarea': {
        return css`
          height: 200px;
          align-items: flex-start;
        `;
      }
      case 'no_border': {
        return css`
          border-width: 0;
        `;
      }
      default: {
        return '';
      }
    }
  }}
`;

const InnerInput = styled.TextInput<{
  inputType?: InputType;
}>`
  font-size: ${normalizeFontSize(15)}px;
  flex: 1;
  height: 100%;
  padding: 0;
  ${({inputType}) => {
    switch (inputType) {
      case 'textarea': {
        return css`
          text-align-vertical: top;
        `;
      }
      default: {
        return '';
      }
    }
  }}
`;

const DefaultLabel = styled(Text)`
  color: ${Text_03};
  margin-bottom: ${normalizeSpace(8)}px;
`;

const SuffixWrapper = styled(View)`
  margin-left: -4px;
  margin-right: 10px;
`;

const PrefixWrapper = styled(View)`
  margin-right: -4px;
  margin-left: 10px;
`;

const Input: FC<Props & TextInputProps> = forwardRef(
  (
    {
      label,
      onBlur,
      onFocus,
      containerStyle,
      email,
      number,
      phone,
      autoCapitalize,
      inputType = 'normal',
      secureTextEntry,
      renderSuffix,
      renderPrefix,
      showViewPassword = true,
      clearable = false,
      inputContainerStyle,
      handleClearText,
      ...otherInputProps
    },
    forwardedRef,
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [showPass, setShowPass] = useState(false);
    const inputRef = useRef<TextInput>(null);
    const handleOnBlur = useCallback(
      (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        if (onBlur) {
          onBlur(e);
        }
        setIsFocused(false);
      },
      [onBlur],
    );
    const handleOnFocus = useCallback(
      (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        if (onFocus) {
          onFocus(e);
        }
        setIsFocused(true);
      },
      [onFocus],
    );
    const keyboardType = useMemo(() => {
      if (email) {
        return 'email-address';
      }
      if (number) {
        return 'number-pad';
      }
      if (phone) {
        return 'phone-pad';
      }
      return 'default';
    }, [email, number, phone]);
    const renderShowPass = () => {
      return (
        <View>
          <TouchableOpacity onPress={() => setShowPass((p) => !p)}>
            <View flexRow={true} alignCenter={true}>
              {/* <Image
                style={{
                  tintColor: Black,
                }}
                source={
                  showPass
                    ? images.login.icHidePassword
                    : images.login.iconViewPassword
                }
              /> */}
              <Text ml={1}>{showPass ? 'Ẩn' : 'Hiện'}</Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    };

    const renderClearText = () => (
      <View>
        <TouchableOpacity
          onPress={() => {
            inputRef?.current?.clear();
            if (handleClearText) {
              handleClearText();
            }
          }}>
          <View flexRow={true} alignCenter={true}>
            {/* <Image source={images.common.iconClear} /> */}
          </View>
        </TouchableOpacity>
      </View>
    );
    const handleRef = useCallback(
      (ref: TextInput) => {
        (inputRef as any).current = ref;
        if (forwardedRef) {
          if (typeof forwardedRef === 'function') {
            forwardedRef(ref);
          } else {
            // eslint-disable-next-line no-param-reassign
            forwardedRef.current = ref;
          }
        }
      },
      [forwardedRef],
    );
    return (
      <View style={containerStyle}>
        {typeof label === 'string' ? (
          <DefaultLabel>{label}</DefaultLabel>
        ) : (
          label
        )}
        <InputContainer
          style={inputContainerStyle}
          inputType={inputType}
          activeOpacity={1}
          focused={isFocused}
          onPress={() => inputRef?.current?.focus()}>
          {renderSuffix && <SuffixWrapper>{renderSuffix}</SuffixWrapper>}
          <InnerInput
            inputType={inputType}
            keyboardType={keyboardType}
            onBlur={handleOnBlur}
            onFocus={handleOnFocus}
            ref={handleRef}
            secureTextEntry={!showPass && secureTextEntry}
            autoCapitalize={autoCapitalize || email ? 'none' : undefined}
            {...otherInputProps}
          />
          {renderPrefix && <PrefixWrapper>{renderPrefix}</PrefixWrapper>}
          {showViewPassword && secureTextEntry && renderShowPass()}
          {clearable && renderClearText()}
        </InputContainer>
      </View>
    );
  },
);

export default withSpacing(Input);
