
function MyListings({ listings, onEdit, onDelete }) {
  return (
    <section className="my-listings">
      <h3>My Listings</h3>

      {listings.length === 0 ? (
        <p>
          You haven't created any listings yet.
          Use the form above to add your first studio.
        </p>
      ) : (
        <div className="host-listings">
          {listings.map((studio) => (
            <div className="host-listing" key={studio.id}>
              <div className="host-listing-info">
                <h4>{studio.name}</h4>

                <p>
                  {studio.neighborhood}, {studio.city},{" "}
                  {studio.state}
                </p>

                <p>{studio.type}</p>

                <strong>${studio.pricePerDay} / day</strong>

                <p className={
                  studio.available
                    ? "available"
                    : "unavailable"
                }>
                  {studio.available
                    ? "Available"
                    : "Unavailable"}
                </p>
              </div>

              <div className="listing-actions">
                <button
                  type="button"
                  onClick={() => onEdit(studio)}
                >
                  Edit
                </button>

                <button
                  type="button"
                  className="remove-button"
                  onClick={() => onDelete(studio.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default MyListings;
