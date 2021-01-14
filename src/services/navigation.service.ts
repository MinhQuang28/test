import { NavigationContainerRef, StackActions } from '@react-navigation/native';

let navigation: NavigationContainerRef;

function setContainerNavigator(navigatorContainerRef: NavigationContainerRef) {
  navigation = navigatorContainerRef;
}

function getCurrentRoute() {
  return navigation.getCurrentRoute();
}

function navigate(routeKey: string, params?: Object): void {
  navigation.navigate(routeKey, params);
}

function replace(routeKey: string, params?: Object): void {
  navigation.dispatch(StackActions.replace(routeKey, params));
}

function reset(routeKey: string): void {
  navigation.resetRoot({ index: 0, routes: [{ name: routeKey }] });
}

function goBack(): void {
  navigation.goBack();
}

// add other navigation functions that you need and export them

export default {
  setContainerNavigator,
  getCurrentRoute,
  navigate,
  replace,
  reset,
  goBack,
};
