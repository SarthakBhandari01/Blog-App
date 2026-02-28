import Navbar from "./components/Navbar";
import Toast from "./components/Toast";
import { AppRouter } from "./Routes";

function App() {
  return (
    <>
      <Navbar />
      <Toast />
      <AppRouter />
    </>
  );
}

export default App;
