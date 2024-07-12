import RailLogo from "./assets/drdoLogo.png";
import Emblem from "./assets/Emblem_of_India.png";
const Header = () => {
  return (
    <header className="hompage_header">
      <img src={RailLogo} alt="Logo of Railway" className="Railway_logo" />
      <div className="homepage_heading">
        <h2>Defence Research and Development Organisation</h2>
        <p>Ministry of Defence,Government of India</p>
      </div>
      <img src={Emblem} alt="Emblem Logo" className="Emblem_logo" />
    </header>
  );
};
export default Header;