import {Route, Routes} from 'react-router-dom'
import Sommaire from './Sommaire'
import {Home, Login, SignUp, AboutUs, ContactUs, MyHome, CreateTournament, Tournament, Games, Profil, Game, TournamentPage } from "./exporter"

function App() {
  sessionStorage.clear();
  return (
    <Routes>
      <Route path="/" element={<Sommaire />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/aboutus" element={<AboutUs />} />
      <Route path="/contactus" element={<ContactUs />} />
      <Route path="/myhome" element={<MyHome />} />
      <Route path="/createtournament" element={<CreateTournament />} />
      <Route path="/tournament" element={<Tournament />} />
      <Route path="/games" element={<Games />} />
      <Route path="/profil" element={<Profil />} />
      <Route path="/game" element={<Game />} />
      <Route path="/tournamentpage" element={<TournamentPage />} />
    </Routes>
  );
}

export default App;
