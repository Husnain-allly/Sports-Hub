import React, { useState, useEffect } from "react";
import Logo from "./logo.png";
import alqawi from "./alqawi.png";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./App.css";
import {
  BrowserRouter as Router,
  useNavigate as navigate,
} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faBars, // Import the hamburger icon
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");
  const [newsItems, setNewsItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scores, setScores] = useState([]);
  const [scoreIndex, setScoreIndex] = useState(0);
  const [newsItemsToShow, setNewsItemsToShow] = useState(1);
  const [scoresToShow, setScoresToShow] = useState(1);
  const [vendorsToShow, setVendorsToShow] = useState(1);
  const [userPosts, setUserPosts] = useState([]);
  const [followedUserPosts, setFollowedUserPosts] = useState([]);
  const [userPostsToShow, setUserPostsToShow] = useState(1);
  const [followedPostsToShow, setFollowedPostsToShow] = useState(1);
  const [vendorsToShowTopRated, setVendorsToShowTopRated] = useState(1); // For Top Rated Arenas
  const [vendorsToShowNearby, setVendorsToShowNearby] = useState(1); // For Nearby Arenas
  const vendors = [
    { imageUrl: "https://via.placeholder.com/100", name: "Vendor 1", id: 1 },
    { imageUrl: "https://via.placeholder.com/100", name: "Vendor 2", id: 2 },
    { imageUrl: "https://via.placeholder.com/100", name: "Vendor 3", id: 3 },
    { imageUrl: "https://via.placeholder.com/100", name: "Vendor 4", id: 4 },
    { imageUrl: "https://via.placeholder.com/100", name: "Vendor 5", id: 5 },
    { imageUrl: "https://via.placeholder.com/100", name: "Vendor 6", id: 6 },
    { imageUrl: "https://via.placeholder.com/100", name: "Vendor 7", id: 7 },
    { imageUrl: "https://via.placeholder.com/100", name: "Vendor 8", id: 8 },
    { imageUrl: "https://via.placeholder.com/100", name: "Vendor 9", id: 9 },
    { imageUrl: "https://via.placeholder.com/100", name: "Vendor 10", id: 10 },
  ];
  const [date, setDate] = useState(new Date());
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);

  useEffect(() => {
    const userToken = localStorage.getItem("userToken");
    const storedUserName = localStorage.getItem("userName");
    if (userToken) {
      setIsAuthenticated(true);
      setUserName(storedUserName);
    }
  }, []);

  const handleReg = () => navigate("/reg-verification");
  const handleLogIn = () => navigate("/login-arena");
  const handleLogOut = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userLocation");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    setIsAuthenticated(false);
    setUserName("");
    navigate("/");
  };

  useEffect(() => {
    const fetchedNews = [
      "Today is raining",
      "Tomorrow is a hot day",
      "Stock market rises",
      "New tech release",
      "Sports event highlights",
    ];
    setNewsItems(fetchedNews);

    const fetchedScores = [
      "Team A: 3 - Team B: 2",
      "Team C: 1 - Team D: 1",
      "Team E: 4 - Team F: 0",
      "Team G: 2 - Team H: 3",
    ];
    setScores(fetchedScores);

    const newsInterval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % fetchedNews.length);
    }, 3000);

    const scoreInterval = setInterval(() => {
      setScoreIndex((prevIndex) => (prevIndex + 1) % fetchedScores.length);
    }, 3000);

    return () => {
      clearInterval(newsInterval);
      clearInterval(scoreInterval);
    };
  }, []);

  useEffect(() => {
    const fetchUserPosts = async () => {
      const fetchedUserPosts = [
        {
          imageUrl:
            "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
          description: "Post 1",
        },
        {
          imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
          description: "Post 2",
        },
      ];
      setUserPosts(fetchedUserPosts);
    };

    const fetchFollowedUserPosts = async () => {
      const fetchedFollowedUserPosts = [
        {
          imageUrl:
            "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
        },
        {
          imageUrl:
            "https://images.unsplash.com/photo-1496317899792-9d7dbcd928a1",
        },
        {
          imageUrl:
            "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
        },
      ];
      setFollowedUserPosts(fetchedFollowedUserPosts);
    };
    fetchUserPosts();
    fetchFollowedUserPosts();
  }, []);

  const circulatingNews = [
    ...newsItems.slice(currentIndex),
    ...newsItems.slice(0, currentIndex),
  ];

  const circulatingScores = [
    ...scores.slice(scoreIndex),
    ...scores.slice(0, scoreIndex),
  ];
  const handleNavigate = (id) => {
    navigate(`/vendor/${id}`);
  };
  return (
    <div className="App">
      <header className="dash-header">
        <img src={Logo} alt="Sports Hub Logo" className="logo" />

        <div className="dash-buttons">
          {isAuthenticated ? (
            <>
              <span className="user-data">
                <span style={{ color: "red" }}>Welcome, </span> {userName}
              </span>
              <button onClick={handleLogOut} className="dash-logout-btn">
                Log Out
              </button>
            </>
          ) : (
            <>
              <button onClick={handleReg} className="dash-reg-btn">
                User SignUp
              </button>
              <button onClick={handleLogIn} className="dash-login-btn">
                User Login
              </button>
            </>
          )}
          <div className="dropdown">
            <button className="dropbtn">
              {/* Update the icon to FontAwesomeIcon component */}
              <FontAwesomeIcon icon={faBars} />
            </button>
            <div className="dropdown-content">
              <a href="#">
                <b>Informatica</b>
              </a>
              <a href="#">
                <b>Arena</b>
              </a>
              <a href="#">
                <b>Institute</b>
              </a>
              <a href="#">
                <b>Slog</b>
              </a>
              <a href="#">
                <b>Coach</b>
              </a>
            </div>
          </div>
        </div>
      </header>

      <main className="grid-container">
        <div>
          <img src={alqawi} alt="Alqawi" className="Banner" />
        </div>

        <div className="news-section">
          <div className="number-selection">
            {[1, 3, 5, 7, 9, 11].map((number) => (
              <button
                key={number}
                onClick={() => setNewsItemsToShow(number)}
                className={`number-btn ${
                  newsItemsToShow === number ? "active" : ""
                }`}
              >
                {number}
              </button>
            ))}
            <button
              onClick={() => setIsCalendarVisible((prev) => !prev)}
              className="number-btn calendar-icon"
            >
              <FontAwesomeIcon icon={faCalendarAlt} />
            </button>
          </div>
          <div className="grid-item news">
            <p style={{ textAlign: "center", fontSize: "24px" }}>
              <b>News</b>
            </p>
            {circulatingNews.slice(0, newsItemsToShow).map((news, index) => (
              <div key={index} className="news-item">
                {news}
              </div>
            ))}
          </div>
          {/* Render the Calendar if it's visible */}
          {isCalendarVisible && (
            <div className="calendar-dropdown">
              <Calendar onChange={setDate} value={date} className="calendar" />
            </div>
          )}
          {/* Scores Section with its own number bar */}
          <div className="number-selection">
            {[1, 3, 5, 7, 9, 11].map((number) => (
              <button
                key={number}
                onClick={() => setScoresToShow(number)}
                className={`number-btn ${
                  scoresToShow === number ? "active" : ""
                }`}
              >
                {number}
              </button>
            ))}
          </div>
          <div className="grid-item score">
            <p style={{ textAlign: "center", fontSize: "24px" }}>
              <b>Live Scores</b>
            </p>
            {circulatingScores.slice(0, scoresToShow).map((score, index) => (
              <div key={index} className="score-item">
                {score}
              </div>
            ))}
          </div>
          <div className="Vendorback">
            <p style={{ textAlign: "center", fontSize: "24px" }}>
              <b>Posts</b>
            </p>
          </div>
          <div className="main-container">
            {/* Number bar for Your Posts */}
            <div>
              <p style={{ textAlign: "center" }}>
                <b>Your Posts</b>
              </p>
            </div>
            <div className="number-selection">
              {[1, 3, 5, 7, 9, 11].map((number) => (
                <button
                  key={number}
                  onClick={() => setUserPostsToShow(number)}
                  className={`number-btn ${
                    userPostsToShow === number ? "active" : ""
                  }`}
                >
                  {number}
                </button>
              ))}
            </div>

            <div className="post-row">
              {userPosts.slice(0, userPostsToShow).map((post, index) => (
                <div key={index} className="post-item">
                  <img
                    src={post.imageUrl}
                    alt={`Post ${index}`}
                    className="post-image"
                  />
                  <p>{post.description}</p>
                </div>
              ))}
            </div>

            {/* Number bar for Followed User Posts */}
            <div className="followed-post-container">
              <div>
                <p style={{ textAlign: "center" }}>
                  <b>Posts from People you Follow</b>
                </p>
              </div>
              <div className="number-selection">
                {[1, 3, 5, 7, 9, 11].map((number) => (
                  <button
                    key={number}
                    onClick={() => setFollowedPostsToShow(number)}
                    className={`number-btn ${
                      followedPostsToShow === number ? "active" : ""
                    }`}
                  >
                    {number}
                  </button>
                ))}
              </div>
            </div>

            <div className="followed-post-row">
              {followedUserPosts
                .slice(0, followedPostsToShow)
                .map((post, index) => (
                  <div key={index} className="followed-post-item">
                    <img
                      src={post.imageUrl}
                      alt={`Followed Post ${index}`}
                      className="followed-post-image"
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                ))}
            </div>
          </div>
          {/* Vendors Section with its own number bar */}
          <div className="Vendorback">
            {/* Top Rated Arenas Section */}
            <div>
              <p style={{ textAlign: "center", fontSize: "24px" }}>
                <b>Top Rated Arenas</b>
              </p>
            </div>
            <div className="number-selection">
              {[1, 3, 5, 7, 9, 11].map((number) => (
                <button
                  key={number}
                  onClick={() => setVendorsToShowTopRated(number)}
                  className={`number-btn ${
                    vendorsToShowTopRated === number ? "active" : ""
                  }`}
                >
                  {number}
                </button>
              ))}
            </div>
            <div className="vendor-container">
              {vendors.slice(0, vendorsToShowTopRated).map((vendor, index) => (
                <button
                  key={index}
                  className="vendor-item-btn"
                  onClick={() => handleNavigate(vendor.id)} // Navigate to vendor page
                >
                  <img
                    src={vendor.imageUrl}
                    alt={`Vendor ${index}`}
                    className="vendor-image"
                  />
                  <p className="vendor-name">{vendor.name}</p>
                </button>
              ))}
            </div>

            {/* Nearby Arenas Section */}
            <div>
              <p style={{ textAlign: "center", fontSize: "24px" }}>
                <b>Nearby Arenas</b>
              </p>
            </div>
            <div className="number-selection">
              {[1, 3, 5, 7, 9, 11].map((number) => (
                <button
                  key={number}
                  onClick={() => setVendorsToShowNearby(number)}
                  className={`number-btn ${
                    vendorsToShowNearby === number ? "active" : ""
                  }`}
                >
                  {number}
                </button>
              ))}
            </div>
            <div className="vendor-container">
              {vendors.slice(0, vendorsToShowNearby).map((vendor, index) => (
                <button
                  key={index}
                  className="vendor-item-btn"
                  onClick={() => handleNavigate(vendor.id)} // Navigate to vendor page
                >
                  <img
                    src={vendor.imageUrl}
                    alt={`Vendor ${index}`}
                    className="vendor-image"
                  />
                  <p className="vendor-name">{vendor.name}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Informatica Section (excluded from number selection) */}
          <div className="grid-item info">
            <p style={{ textAlign: "center", fontSize: "24px" }}>
              <b>Informatica</b>
            </p>
          </div>
        </div>

        <div>
          <img src={alqawi} alt="Alqawi" className="Banner" />
        </div>
      </main>
    </div>
  );
}

export default App;
