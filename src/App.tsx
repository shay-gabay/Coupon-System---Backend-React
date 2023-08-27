import "./App.css";
import { ToastContainer } from 'react-toastify'
import Footer from "./Components/Layout/Footer/Footer";
import Header from "./Components/Layout/Header/Header";
import Main from "./Components/Layout/Main/Main";
import Menu from "./Components/Layout/Menu/Menu";

function App() {
  return (
    <div className="App">
      <Header />
      <Menu />
      <Main />
      <Footer />
      <ToastContainer />
    </div>
  );
}

export default App;