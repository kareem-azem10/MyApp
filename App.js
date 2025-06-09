import MainNavigation from './navigation/MainNavigation';
import { Provider as PaperProvider } from 'react-native-paper';

export default function App() {
  return (
    <PaperProvider>
      <MainNavigation />
    </PaperProvider>
  );
}
