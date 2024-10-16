import { useState } from "react";

function Form(props) {
  
  // State to manage the current input value
  const [name, setName] = useState("");

  // Function to handle input changes, updating the 'name' state
  function handleChange(event) {
    setName(event.target.value); // Updates the state as the user types
  }

  // Function to handle form submission
  function handleSubmit(event) {
    event.preventDefault(); // Prevents the page from reloading
    props.addTask(name); // Passes the new task to the parent component
    setName(""); // Clears the input field after submission
  }

  return (
    <form onSubmit={handleSubmit}> {/* Form submission is handled by handleSubmit */}
      <h2 className="label-wrapper">
        {/* Label for the input field */}
        <label htmlFor="new-todo-input" className="label__lg">
          What needs to be done?
        </label>
      </h2>
      {/* Input field for task name */}
      <input
        type="text"
        id="new-todo-input"
        className="input input__lg"
        name="text"
        autoComplete="off" // Disables auto-completion in the browser
        value={name} // The input value is controlled by the 'name' state
        onChange={handleChange} // Updates state when user types
      />
      {/* Submit button to add the task */}
      <button type="submit" className="btn btn__primary btn__lg">
        Add
      </button>
    </form>
  );
}

export default Form;
