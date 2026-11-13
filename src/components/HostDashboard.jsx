
import { useState } from "react";
import StudioForm from "./StudioForm";
import MyListings from "./MyListings";

function HostDashboard({
  hostStudios,
  onAdd,
  onUpdate,
  onDelete,
  onSwitchToRenter
}) {
  const [editingStudio, setEditingStudio] = useState(null);

  const availableStudios = hostStudios.filter(
    (studio) => studio.available
  );

  const averageRate = hostStudios.length
    ? Math.round(
        hostStudios.reduce(
          (total, studio) => total + studio.pricePerDay,
          0
        ) / hostStudios.length
      )
    : 0;

  function handleSave(studio) {
    if (editingStudio) {
      onUpdate(studio);
    } else {
      onAdd(studio);
    }

    setEditingStudio(null);
  }

  function handleEdit(studio) {
    setEditingStudio(studio);
    document
      .getElementById("host-form")
      ?.scrollIntoView({ behavior: "smooth" });
  }

  function handleDelete(id) {
    onDelete(id);

    if (editingStudio?.id === id) {
      setEditingStudio(null);
    }
  }

  return (
    <div className="host-dashboard">
      <p className="eyebrow">FLOAT HOST EXPERIENCE</p>

      <h2>Manage your beauty spaces.</h2>

      <p className="host-intro">
        Create and manage workspace listings.
        This is a demonstration host dashboard.
      </p>

      <div className="host-stats">
        <div className="host-stat">
          <span>My Listings</span>
          <strong>{hostStudios.length}</strong>
        </div>

        <div className="host-stat">
          <span>Available Spaces</span>
          <strong>{availableStudios.length}</strong>
        </div>

        <div className="host-stat">
          <span>Average Daily Rate</span>
          <strong>${averageRate}</strong>
        </div>
      </div>

      <div id="host-form">
        <StudioForm
          key={editingStudio?.id || "new-listing"}
          initialStudio={editingStudio}
          onSave={handleSave}
          onCancel={() => setEditingStudio(null)}
        />
      </div>

      <MyListings
        listings={hostStudios}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <button
        type="button"
        onClick={onSwitchToRenter}
      >
        Explore Studios as a Renter
      </button>
    </div>
  );
}

export default HostDashboard;
