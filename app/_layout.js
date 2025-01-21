import { Stack } from "expo-router";
import queryClient from "./(services)/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import store from "./(redux)/store";
import { Provider } from "react-redux";
import { StripeProvider } from '@stripe/stripe-react-native'
import AppNavigation from "./(redux)/AppNavigation";

const STRIPE_PUBLISHABLE_KEY = 'pk_test_51Qi5pfDXxZ8F8RJT4NpFlg5C49KuOFFKm6f1BTAE7GJquu12xDTZBbhmwH9xJPCvXmHhJXY33GHKKjVk95mBc1Zk00IZbV8KLj'


export default function RootLayout() {
  return (
    <Provider store={store}>
      <StripeProvider publishableKey={STRIPE_PUBLISHABLE_KEY}>
        <QueryClientProvider client={queryClient}>
          <AppNavigation />
        </QueryClientProvider>
      </StripeProvider>
    </Provider>
  );
}