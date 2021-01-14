import React, {FC, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Modal,
  Keyboard,
} from 'react-native';
import {Black, White} from '../../../themes/colors';

const PRIMARY_COLOR = 'rgb(0,98,255)';
const WHITE = '#ffffff';
const BORDER_COLOR = '#DBDBDB';

type ActionItem = {
  id: string | number;
  label: string;
  onPress: any;
  cancel?: boolean;
};

interface Props {
  actionItems: Array<ActionItem>;
  isVisible: boolean;
  title: string;
  message?: string;
}

const ActionSheet: FC<Props> = ({actionItems, isVisible, title, message}) => {
  useEffect(() => {
    Keyboard.dismiss();
  }, []);
  const actionSheetItems = [...actionItems];
  return (
    <Modal animationType="slide" visible={isVisible} transparent={true}>
      <View style={styles.overlayContainer}>
        <View style={styles.modalContent}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{title}</Text>
            {message && <Text style={styles.subTitle}>{message}</Text>}
          </View>
          {actionSheetItems.map((actionItem, index) => {
            return (
              <TouchableHighlight
                style={[
                  styles.actionSheetView,
                  index === actionSheetItems.length - 2 && {
                    borderBottomLeftRadius: 12,
                    borderBottomRightRadius: 12,
                  },
                  index === actionSheetItems.length - 1 && {
                    borderBottomWidth: 0,
                    backgroundColor: WHITE,
                    marginTop: 8,
                    borderTopLeftRadius: 12,
                    borderTopRightRadius: 12,
                    borderBottomLeftRadius: 12,
                    borderBottomRightRadius: 12,
                  },
                ]}
                underlayColor={'#f7f7f7'}
                key={actionItem.id}
                onPress={actionItem.onPress}>
                <Text
                  allowFontScaling={false}
                  style={[
                    styles.actionSheetText,

                    actionItem.cancel && {
                      color: '#fa1616',
                    },
                  ]}>
                  {actionItem.label}
                </Text>
              </TouchableHighlight>
            );
          })}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  title: {
    color: 'rgba(0, 0, 0, 0.4)',
    marginBottom: 2,
    fontSize: 15,
    paddingHorizontal: 30,
    textAlign: 'center',
  },
  subTitle: {
    color: 'rgba(0, 0, 0, 0.4)',
    fontSize: 15,
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: White,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: BORDER_COLOR,
  },
  modalContent: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    marginLeft: 8,
    marginRight: 8,
    marginBottom: 20,
  },
  actionSheetText: {
    fontSize: 18,
    color: PRIMARY_COLOR,
  },
  actionSheetView: {
    backgroundColor: WHITE,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 16,
    paddingBottom: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: BORDER_COLOR,
  },
  overlayContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.3)',
    paddingBottom: 10,
  },
});

export default ActionSheet;
