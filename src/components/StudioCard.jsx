
function StudioCard({ studio, onSave, isSaved, selectedDate }) {
  const availableForDate =
  studio.available &&
  (
    !selectedDate ||
    !(studio.unavailableDates || []).includes(selectedDate)
  );
  return (
    <div className="studio-card">


<div className="studio-image">
  {studio.image ? (
    <img
      src={studio.image}
      alt={`${studio.name} beauty workspace`}
      loading="lazy"
    />
  ) : (
    <div className="studio-image-placeholder">
      <span>Photo coming soon</span>
    </div>
  )}
</div>


      <div className="studio-card-top">
        <span className="studio-type">{studio.type}</span>
        
<span
  className={
    availableForDate ? "available" : "unavailable"
  }
>
  {availableForDate
    ? "Available"
    : selectedDate
      ? "Unavailable on selected date"
      : "Unavailable"}
</span>

      </div>

      <h3>{studio.name}</h3>


{typeof studio.rating === "number" && (
  <div className="studio-rating">
    <span className="rating-star">★</span>
    <strong>{studio.rating.toFixed(1)}</strong>
    <span className="rating-label">Demo rating</span>
  </div>
)}

{studio.isUserCreated && (
  <span className="host-created-label">
    Host-created demo listing
  </span>
)}



      <p className="location">
        {studio.neighborhood}, {studio.city}
      </p>

      <p>{studio.description}</p>

      <div className="amenities">
        {studio.amenities.map((amenity) => (
          <span key={amenity}>{amenity}</span>
        ))}
      </div>

      <div className="studio-footer">
        <p>
          <strong>${studio.pricePerDay}</strong> / day
        </p>

        <button
          onClick={() => onSave(studio)}
          disabled={isSaved}
        >
          {isSaved ? "Saved" : "Save Studio"}
        </button>
      </div>
    </div>
  );
}

export default StudioCard;
