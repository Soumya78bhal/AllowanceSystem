import RailLogo from "./assets/logo.jpg";
import Emblem from "./assets/Emblem_of_India.png";
const Header = () => {
  return (
    <header className="hompage_header">
      <img src={RailLogo} alt="Logo of Railway" className="Railway_logo" />
      <div className="homepage_heading">
        <h1>Allowance Management System </h1>
        <p>Optimize Your Allowance Workflow</p>
      </div>
      <img src={Emblem} alt="Emblem Logo" className="Emblem_logo" />
    </header>
  );
};
export default Header;