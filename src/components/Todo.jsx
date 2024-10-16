import { useEffect, useRef, useState } from "react";

// Custom hook to store the previous value of a prop or state
function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current; // returns the previous value of 'value'
}

function Todo(props) {
    // Local state to track if the task is in editing mode
    const [isEditing, setEditing] = useState(false);

    // Local state to store the new name when editing
    const [newName, setNewName] = useState("");

    // Refs to control focus on elements (input and edit button)
    const editFieldRef = useRef(null);
    const editButtonRef = useRef(null);

    // Hook to track the previous value of 'isEditing'
    const wasEditing = usePrevious(isEditing);
    console.log(wasEditing); // Logs whether the task was previously being edited

    // Handler for input changes while editing
    function handleChange(e) {
        setNewName(e.target.value); // Updates 'newName' when typing in the input field
    }

    // Handler for form submission when the task name is edited
    function handleSubmit(e) {
        e.preventDefault(); // Prevents page reload on form submission
        props.editTask(props.id, newName); // Calls parent function to update task
        setNewName(""); // Resets input field after submission
        setEditing(false); // Exits editing mode
    }

    // Template for when the task is in editing mode
    const editingTemplate = (
        <form className="stack-small" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="todo-label" htmlFor={props.id}>
              New name for {props.name}
            </label>
            <input 
              id={props.id} 
              className="todo-text" 
              type="text" 
              value={newName} 
              onChange={handleChange} 
              ref={editFieldRef} // Focus on this field when editing
            />
          </div>
          <div className="btn-group">
            <button 
              type="button" 
              className="btn todo-cancel" 
              onClick={() => setEditing(false)} // Cancel editing mode
            >
              Cancel
              <span className="visually-hidden">renaming {props.name}</span>
            </button>
            <button type="submit" className="btn btn__primary todo-edit">
              Save
              <span className="visually-hidden">new name for {props.name}</span>
            </button>
          </div>
        </form>
      );

    // Template for when the task is in view mode (not being edited)
    const viewTemplate = (
        <div className="stack-small">
          <div className="c-cb">
            <input
              id={props.id}
              type="checkbox"
              defaultChecked={props.completed} // Reflects the completion status of the task
              onChange={() => props.toggleTaskCompleted(props.id)} // Toggles task completion status
            />
            <label className="todo-label" htmlFor={props.id}>
              {props.name} {/* Displays the task name */}
            </label>
          </div>
          <div className="btn-group">
            <button 
              type="button" 
              className="btn" 
              onClick={() => setEditing(true)} // Switches to editing mode
              ref={editButtonRef} // Focuses back on this button after editing
            >
              Edit <span className="visually-hidden">{props.name}</span>
            </button>
            <button
              type="button"
              className="btn btn__danger"
              onClick={() => props.deleteTask(props.id)} // Deletes the task
            >
              Delete <span className="visually-hidden">{props.name}</span>
            </button>
          </div>
        </div>
      );
      
    // Effect to handle focus when switching between editing and view modes
    useEffect(() => {
        if (isEditing) {
            editFieldRef.current.focus(); // Focus on the input field in editing mode
        } else {
            editButtonRef.current.focus(); // Focus back on the edit button after exiting edit mode
        }
    }, [isEditing]); // Runs whenever 'isEditing' state changes

    // The component will either show the editing template or view template based on 'isEditing' state
    return (
        <li className="todo">
            {isEditing ? editingTemplate : viewTemplate} 
        </li>
    );
}

export default Todo;
