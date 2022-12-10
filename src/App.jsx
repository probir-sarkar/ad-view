import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import "./App.scss";
import instance from "./api/instance";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function App() {
  const [search, setSearch] = useState("");
  const [ads, setAds] = useState([]);
  const [message, setMessage] = useState("You have not searched yet");

  const getAds = () => {
    if (search === "") {
      setAds([]);
      setMessage("Search field cannot be empty");
      return;
    }
    const params = {
      query: search,
    };
    instance.get("/", { params }).then((res) => {
      if (res.data.data.ads.length === 0) {
        setMessage(`No ads found for ${search}`);
      }
      setAds(res.data.data.ads);
    });
  };
  const adList = () => {
    console.log(ads.length);
    if (ads.length > 0) {
      return ads.map((ad) => (
        <div className="ad" key={ad._id}>
          <img className="ad-image" srcSet={`${ad.imageUrl}`} />
          <button className="ad-cta">{ad.CTA}</button>
        </div>
      ));
    }
    return <div className="message">{message}</div>;
  };

  return (
    <div className="App">
      <div className="search">
        <input
          type="text"
          className="search-input"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <FontAwesomeIcon
          className="search-button"
          icon={faSearch}
          onClick={getAds}
          size="lg"
        />
      </div>
      <div className="ads">{adList()}</div>
    </div>
  );
}

export default App;
