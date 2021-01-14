import {StyleSheet, Platform} from 'react-native';

export const {hairlineWidth} = StyleSheet;

export default {
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    opacity: 0.4,
    backgroundColor: '#000',
  },
  wrapper: {
    flex: 1,
    paddingHorizontal: 10,

    flexDirection: 'row',
  },
  body: {
    flex: 1,
    borderRadius: 16,
    alignSelf: 'flex-end',
    backgroundColor: '#e5e5e5',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  titleBox: {
    height: 50,

    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,

    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  titleText: {
    color: 'rgba(0, 0, 0, 0.6)',
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 18,
    ...Platform.select({
      ios: {},
      android: {
        marginTop: 20,
        marginBottom: 20,
      },
    }),
  },
  messageBox: {
    height: 50,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  messageText: {
    color: '#9a9a9a',
    fontSize: 12,
  },
  buttonBox: {
    height: 50,
    marginTop: hairlineWidth,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },

  buttonText: {
    fontSize: 18,
  },
  cancelButtonBox: {
    height: 50,
    marginTop: 6,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
};
