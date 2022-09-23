import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Container } from "react-bootstrap";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginComponent from "./components/LoginComponent";
import LinkedinNavbar from "./components/LinkedinNavBar";
import Profile from "./components/profilo/Profile";
import ModifyComponent from "./components/ModifyComponent";
import HomeComponent from "./components/Home/HomeComponent";
import ProfiliUtenti from "./components/ProfiliUtenti";
import Footer from "./components/footer/Footer";

function App() {
  return (
    <BrowserRouter>
      <LinkedinNavbar />
      <Container fluid className="p-0 TheBody">
        <Routes>
          <Route path="/" element={<LoginComponent />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/modify" element={<ModifyComponent />} />
          <Route path="/home" element={<HomeComponent />} />
          <Route path="/profili/:userId" element={<ProfiliUtenti />} />
        </Routes>
      <Footer />
      </Container>
    </BrowserRouter>
  );
}

export default App;
