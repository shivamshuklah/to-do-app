function FilterButton(props) {
  return (
    <button
      type="button"
      className="btn toggle-btn" // Applies CSS class for styling the button
      aria-pressed={props.isPressed} // Accessibility feature to indicate if the button is pressed or active
      onClick={() => props.setFilter(props.name)} // Calls the setFilter function passed from parent to change filter based on the button name
    >
      {/* Visually hidden span for screen readers to indicate action context */}
      <span className="visually-hidden">Show </span>
      {/* Visible button text showing the filter name */}
      <span>{props.name}</span>
      {/* Visually hidden span for screen readers to indicate it's filtering tasks */}
      <span className="visually-hidden"> tasks</span>
    </button>
  );
}

export default FilterButton;
