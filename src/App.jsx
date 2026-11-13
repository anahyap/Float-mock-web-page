import { useState, useEffect, useRef } from "react";
import { mockStudios } from "./data/mockStudios";
import StudioCard from "./components/StudioCard";
import BeautyDiscovery from "./components/BeautyDiscovery";
import HostDashboard from "./components/HostDashboard";
import Footer from "./components/Footer";
import "./App.css";


function App() {
  // SAVED STUDIOS
  const [savedStudios, setSavedStudios] = useState(() => {
    try {
      const stored = localStorage.getItem("float-saved");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // HOST STUDIOS
  const [hostStudios, setHostStudios] = useState(() => {
    try {
      const stored = localStorage.getItem("float-host-studios");
      const parsed = stored ? JSON.parse(stored) : [];

      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  // SEARCH AND FILTER STATE
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [studioType, setStudioType] = useState("All");
  const [selectedDate, setSelectedDate] = useState("");
const [availableOnly, setAvailableOnly] = useState(false);

  // NAVIGATION STATE
  const [viewMode, setViewMode] = useState("renter");
  const [menuOpen, setMenuOpen] = useState(false);

  const menuRef = useRef(null);

  // SAVE FAVORITES TO LOCAL STORAGE
  useEffect(() => {
    localStorage.setItem(
      "float-saved",
      JSON.stringify(savedStudios)
    );
  }, [savedStudios]);

  // SAVE HOST LISTINGS TO LOCAL STORAGE
  useEffect(() => {
    localStorage.setItem(
      "float-host-studios",
      JSON.stringify(hostStudios)
    );
  }, [hostStudios]);


  // CLOSE MENU WHEN CLICKING OUTSIDE
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  // KEEP YOUR EXISTING FUNCTIONS BELOW THIS LINE


  // SWITCH BETWEEN RENTER AND HOST
  function switchMode(mode) {
    setViewMode(mode);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }


// CREATE A HOST LISTING
function addHostStudio(studio) {
  const newStudio = {
    ...studio,
    id: `host-${crypto.randomUUID()}`,
    image: null,
    isUserCreated: true
  };

  setHostStudios((previous) => [
    ...previous,
    newStudio
  ]);
}

// UPDATE A HOST LISTING
function updateHostStudio(updatedStudio) {
  setHostStudios((previous) =>
    previous.map((studio) =>
      studio.id === updatedStudio.id
        ? { ...studio, ...updatedStudio }
        : studio
    )
  );

  // Keep any saved copy updated too
  setSavedStudios((previous) =>
    previous.map((studio) =>
      studio.id === updatedStudio.id
        ? { ...studio, ...updatedStudio, notes: studio.notes }
        : studio
    )
  );
}

// DELETE A HOST LISTING
function deleteHostStudio(id) {
  setHostStudios((previous) =>
    previous.filter((studio) => studio.id !== id)
  );

  // Also remove deleted listings from favorites
  setSavedStudios((previous) =>
    previous.filter((studio) => studio.id !== id)
  );
}


  // NAVIGATE TO SAVED SPACES
  
function goToSaved() {
  setViewMode("renter");
  setMenuOpen(false);

  requestAnimationFrame(() => {
    document
      .getElementById("saved-spaces")
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
  });
}


  // CREATE: SAVE A STUDIO
  function saveStudio(studio) {
    setSavedStudios((previousStudios) => {
      const alreadySaved = previousStudios.some(
        (item) => item.id === studio.id,
      );

      if (alreadySaved) {
        return previousStudios;
      }

      return [...previousStudios, { ...studio, notes: "" }];
    });
  }

  // UPDATE: EDIT STUDIO NOTES
  function updateNotes(id, newNotes) {
    setSavedStudios((previousStudios) =>
      previousStudios.map((studio) =>
        studio.id === id ? { ...studio, notes: newNotes } : studio,
      ),
    );
  }

  // DELETE: REMOVE SAVED STUDIO
  function removeStudio(id) {
    setSavedStudios((previousStudios) =>
      previousStudios.filter((studio) => studio.id !== id),
    );
  }

const allStudios = [...mockStudios, ...hostStudios];


function isStudioAvailable(studio) {
  // If the studio is generally unavailable,
  // it should not be shown as available.
  if (!studio.available) {
    return false;
  }

  // If no date is selected, show general availability.
  if (!selectedDate) {
    return true;
  }

  // Check whether the selected date is blocked.
  const unavailableDates = studio.unavailableDates || [];

  return !unavailableDates.includes(selectedDate);
}


  // FILTER STUDIOS
  const filteredStudios = allStudios.filter((studio) => {
    const search = searchTerm.toLowerCase().trim();

    const matchesSearch =
      studio.name.toLowerCase().includes(search) ||
      studio.neighborhood.toLowerCase().includes(search) ||
      studio.city.toLowerCase().includes(search);

    const matchesType = studioType === "All" || studio.type === studioType;

    const matchesLocation =
      !selectedLocation ||
      (studio.city.toLowerCase() === selectedLocation.name.toLowerCase() &&
        studio.state.toLowerCase() === selectedLocation.admin1.toLowerCase());

    const matchesAvailability =
  !availableOnly || isStudioAvailable(studio);

return (
  matchesSearch &&
  matchesType &&
  matchesLocation &&
  matchesAvailability
);
  });

  // BUSINESS LOGIC: TOTAL DAILY RENTAL COST
  const totalDailyCost = savedStudios.reduce(
    (total, studio) => total + studio.pricePerDay,
    0,
  );

  // UNIQUE STUDIO TYPES
  const studioTypes = [
  "All",
  ...new Set(
    allStudios.map((studio) => studio.type)
  )
];

  return (
    <div className="app">
      {/* HEADER */}
      <header className="header">
        <div className="header-inner">
          {/* NAVIGATION */}
          <nav className="navbar">
            <a
              href="#top"
              onClick={() => switchMode("renter")}
              aria-label="Float homepage"
            >
              <img src="/float-logo.png" alt="Float" className="float-logo" />
            </a>

            <div className="nav-actions">
              {/* SAVED SPACES HEART */}
              <button
                type="button"
                className="nav-heart"
                onClick={goToSaved}
                aria-label={`Saved spaces: ${savedStudios.length}`}
                title="Saved Spaces"
              >
                ♡
                {savedStudios.length > 0 && (
                  <span className="favorites-count">{savedStudios.length}</span>
                )}
              </button>

              {/* PROFILE MENU */}
              <div className="profile-menu-container" ref={menuRef}>
                <button
                  type="button"
                  className="profile-button"
                  onClick={() => setMenuOpen((previous) => !previous)}
                  aria-label="Open profile menu"
                  aria-expanded={menuOpen}
                >
                  <span className="menu-lines">☰</span>
                  <span className="profile-circle">●</span>
                </button>

                {menuOpen && (
                  <div className="profile-dropdown">
                    <div className="profile-dropdown-header">
                      <span>FLOAT DEMO ACCOUNT</span>

                      <strong>
                        {viewMode === "renter" ? "Renter Mode" : "Host Mode"}
                      </strong>
                    </div>

                    <button type="button" onClick={goToSaved}>
                      ♡ Saved Spaces ({savedStudios.length})
                    </button>

                    <button type="button" onClick={() => switchMode("renter")}>
                      Explore Studios
                    </button>

                    <div className="menu-divider"></div>

                    <button
                      type="button"
                      className="switch-mode-button"
                      onClick={() =>
                        switchMode(viewMode === "renter" ? "host" : "renter")
                      }
                    >
                      {viewMode === "renter"
                        ? "Switch to Hosting"
                        : "Switch to Renting"}

                      <span>→</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </nav>

          {/* HERO SECTION */}
          <div className="hero" id="top">
            <div className="hero-content">
              <p className="eyebrow">THE FUTURE OF BEAUTY WORKSPACES</p>

              <h1>
                Your space.
                <br />
                Your business.
                <br />
                <span>Your rules.</span>
              </h1>

              <p className="hero-description">
                Beautiful spaces for the beauty professionals who bring them to
                life. Discover flexible, inspiring studios designed to help your
                business thrive.
              </p>

              <a
                href="#location-search"
                className="hero-button"
                onClick={() => setViewMode("renter")}
              >
                Explore Spaces
                <span aria-hidden="true">↗</span>
              </a>

              <div className="hero-caption">
                <span className="hero-caption-line"></span>
                FLEXIBLE SPACES. ENDLESS POSSIBILITIES.
              </div>
            </div>

            {/* HERO PHOTOS */}
            <div className="hero-visual">
              <div className="hero-image-main">
                <img
                  src="/studios/studio-9.jpg"
                  alt="Beautiful makeup studio interior"
                />
              </div>

              <div className="hero-image-small">
                <img
                  src="/studios/studio-2.jpg"
                  alt="Luxury beauty treatment suite"
                />
              </div>

              <div className="hero-floating-label">
                <span className="floating-icon">✦</span>

                <div>
                  <strong>Find your perfect fit.</strong>
                  <p>Explore beauty workspaces</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="container">
        {viewMode === "host" ? (
          // HOST VIEW
          
<HostDashboard
  hostStudios={hostStudios}
  onAdd={addHostStudio}
  onUpdate={updateHostStudio}
  onDelete={deleteHostStudio}
  onSwitchToRenter={() => switchMode("renter")}
/>

        ) : (
          // RENTER VIEW
          <>
            {/* LOCATION SEARCH */}
            <BeautyDiscovery
              onLocationSelect={(location) => {
                setSelectedLocation(location);
                setSearchTerm("");
                setStudioType("All");
              }}
            />

            {/* EXPLORE STUDIOS */}
            <section id="explore-studios">
              <div className="section-heading">
                <h2>Explore Studios</h2>

                {selectedLocation && (
                  <div className="selected-location">
                    <p>
                      Showing studios in {selectedLocation.name},{" "}
                      {selectedLocation.admin1}
                    </p>

                    <button
                      type="button"
                      onClick={() => setSelectedLocation(null)}
                    >
                      Clear Location
                    </button>
                  </div>
                )}

                <p>{filteredStudios.length} studios found</p>
              </div>

              {/* SEARCH AND FILTER */}
              <div className="filters">
                <input
                  type="text"
                  placeholder="Search studios or neighborhoods..."
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                />

                <select
                  value={studioType}
                  onChange={(event) => setStudioType(event.target.value)}
                >
                  {studioTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>


<div className="date-filter">

  <label htmlFor="studio-date">
    When do you need a studio?
  </label>

  <input
    type="date"
    id="studio-date"
    value={selectedDate}
    onChange={(event) =>
      setSelectedDate(event.target.value)
    }
  />

  <label className="availability-filter">
    <input
      type="checkbox"
      checked={availableOnly}
      onChange={(event) =>
        setAvailableOnly(event.target.checked)
      }
    />
    Show available studios only
  </label>

  {selectedDate && (
    <button
      type="button"
      className="clear-date"
      onClick={() => setSelectedDate("")}
    >
      Clear Date
    </button>
  )}

</div>


              {/* STUDIO CARDS */}
              <div className="studio-grid">
                {filteredStudios.map((studio) => (
                  <StudioCard
  key={studio.id}
  studio={studio}
  onSave={saveStudio}
  isSaved={savedStudios.some(
    (item) => item.id === studio.id
  )}
  selectedDate={selectedDate}
/>
                ))}
              </div>

              {filteredStudios.length === 0 && (
                <p>No studios match your search.</p>
              )}
            </section>

            {/* SAVED SPACES */}
            <section className="saved-section" id="saved-spaces">
              <div className="section-heading">
                <h2>My Saved Spaces</h2>

                <p>{savedStudios.length} saved</p>
              </div>

              {/* SAVED SUMMARY */}
              <div className="summary">
                <p>Combined daily rental cost</p>

                <h3>${totalDailyCost}</h3>
              </div>

              {savedStudios.length === 0 ? (
                <p>Your saved studios will appear here.</p>
              ) : (
                <div className="saved-grid">
                  {savedStudios.map((studio) => (
                    <div className="saved-card" key={studio.id}>
                      <h3>{studio.name}</h3>

                      <p>${studio.pricePerDay} / day</p>

                      <label htmlFor={`notes-${studio.id}`}>Your Notes</label>

                      <textarea
                        id={`notes-${studio.id}`}
                        placeholder="Add notes about this space..."
                        value={studio.notes}
                        onChange={(event) =>
                          updateNotes(studio.id, event.target.value)
                        }
                      />

                      <button
                        type="button"
                        className="remove-button"
                        onClick={() => removeStudio(studio.id)}
                      >
                        Remove Studio
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </>
        )}
      </main>

      <Footer /> 
    </div>
  );
}

export default App;
