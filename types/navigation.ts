export type RootStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Create: undefined;
  Home: {
    user: {
      id: number;
      email: string;
      handle: string;
    };
  };
  Feed: undefined;
};