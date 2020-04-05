import useStats from "../utils/useStats";
import Stats from "../components/Stats";
import America from "../components/America";
import Continents from "../components/Continents"; 
import Header from "../components/Header";

export default function IndexPage() {
  return (
    <div>
      <Header />
      <h2>Worldwide</h2>
      <Stats/>
      <h2>Continents</h2>
      <Continents/>
      <h2>US Cases </h2>
      <America />
    </div>
  );
}
