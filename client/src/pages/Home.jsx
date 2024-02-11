import GoogleMap from "../components/GoogleMap"; // Import GoogleMap component
import HomeSearchBar from "../components/SearchBar";

export default function Home() {
  return (
    <div className="bg">
      <div className="container">
        <HomeSearchBar />
        <GoogleMap />
      </div>
    </div>
  );
}
