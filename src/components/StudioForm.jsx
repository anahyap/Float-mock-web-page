
import { useState } from "react";

const emptyForm = {
  name: "",
  city: "",
  state: "",
  neighborhood: "",
  type: "Makeup Studio",
  pricePerDay: "",
  description: "",
  amenities: "",
  available: true
};

function StudioForm({ initialStudio, onSave, onCancel }) {
  const [formData, setFormData] = useState(() => {
    if (!initialStudio) return { ...emptyForm };

    return {
      ...initialStudio,
      pricePerDay: String(initialStudio.pricePerDay),
      amenities: initialStudio.amenities.join(", ")
    };
  });

  const [error, setError] = useState("");

  function handleChange(event) {
    const { name, value, type, checked } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const price = Number(formData.pricePerDay);

    if (
      !formData.name.trim() ||
      !formData.city.trim() ||
      !formData.state.trim() ||
      !formData.neighborhood.trim() ||
      !formData.description.trim() ||
      !Number.isFinite(price) ||
      price <= 0
    ) {
      setError("Please complete all required fields.");
      return;
    }

    const studio = {
      ...(initialStudio || {}),
      name: formData.name.trim(),
      city: formData.city.trim(),
      state: formData.state.trim(),
      neighborhood: formData.neighborhood.trim(),
      type: formData.type,
      pricePerDay: price,
      description: formData.description.trim(),
      amenities: formData.amenities
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
      available: formData.available
    };

    onSave(studio);
    setError("");

    if (!initialStudio) {
      setFormData({ ...emptyForm });
    }
  }

  return (
    <form className="studio-form" onSubmit={handleSubmit}>
      <h3>
        {initialStudio ? "Edit Your Studio" : "List Your Space"}
      </h3>

      <p>
        Share your workspace with beauty professionals
        looking for a place to work.
      </p>

      <div className="host-form-grid">
        <label className="form-field">
          Studio Name
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="The Pink Suite"
            required
          />
        </label>

        <label className="form-field">
          City
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="Columbus"
            required
          />
        </label>

        <label className="form-field">
          State
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            placeholder="Ohio"
            required
          />
        </label>

        <label className="form-field">
          Neighborhood
          <input
            type="text"
            name="neighborhood"
            value={formData.neighborhood}
            onChange={handleChange}
            placeholder="Short North"
            required
          />
        </label>

        <label className="form-field">
          Studio Type
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
          >
            <option>Makeup Studio</option>
            <option>Brow & Lash Suite</option>
            <option>Hair Styling Suite</option>
            <option>Esthetics Suite</option>
            <option>Luxury Beauty Suite</option>
            <option>Shared Beauty Studio</option>
            <option>Private Creative Studio</option>
          </select>
        </label>

        <label className="form-field">
          Daily Rental Price ($)
          <input
            type="number"
            name="pricePerDay"
            value={formData.pricePerDay}
            onChange={handleChange}
            placeholder="85"
            min="1"
            step="0.01"
            required
          />
        </label>
      </div>

      <label className="form-field">
        Amenities (separate with commas)
        <input
          type="text"
          name="amenities"
          value={formData.amenities}
          onChange={handleChange}
          placeholder="Wi-Fi, Vanity Mirrors, Parking"
        />
      </label>

      <label className="form-field">
        Description
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Describe your studio..."
          rows="4"
          required
        />
      </label>

      <label className="availability-checkbox">
        <input
          type="checkbox"
          name="available"
          checked={formData.available}
          onChange={handleChange}
        />
        Currently available for rental
      </label>

      {error && <p className="error">{error}</p>}

      <div className="form-actions">
        <button type="submit">
          {initialStudio ? "Save Changes" : "Create Listing"}
        </button>

        {initialStudio && (
          <button
            type="button"
            className="cancel-button"
            onClick={onCancel}
          >
            Cancel Editing
          </button>
        )}
      </div>
    </form>
  );
}

export default StudioForm;
