import { useState, useRef, useEffect } from "react";
import Form from "./components/Form"; // Form component ko import kar rahe hain jo new tasks add karne ke liye use hota hai
import FilterButton from "./components/FilterButton"; // FilterButton component jo task ko filter karne ke liye hai
import Todo from "./components/Todo"; // Todo component jo har ek task ko dikhata hai
import { nanoid } from "nanoid"; // Unique ID banane ke liye nanoid use kiya ja raha hai

// usePrevious function jo ek value ka pichla state yaad rakhta hai
function usePrevious(value) {
  const ref = useRef(); 
  useEffect(() => {
    ref.current = value; // Jab bhi value change ho, ref me store ho jata hai
  });
  return ref.current; // Pehle ka value return karta hai
}

// Task filtering ke liye functions (All, Active, Completed)
const FILTER_MAP = {
  All: () => true, // Sabhi tasks ko dikhane ke liye
  Active: (task) => !task.completed, // Sirf active tasks jo complete nahi hue hain
  Completed: (task) => task.completed, // Sirf complete ho chuke tasks
};

// FILTER_MAP ka keys (All, Active, Completed) ko extract kar rahe hain
const FILTER_NAMES = Object.keys(FILTER_MAP);

function App(props) {

  // Task filtering ke liye state banaya ja raha hai (default: All)
  const [filter, setFilter] = useState("All");

  // Task delete karne ka function
  function deleteTask(id) {
    const remainingTask = tasks.filter((task) => id !== task.id); // jo task delete karna hai, use filter out kar rahe hain
    setTask(remainingTask); // baki bache tasks ko set kar rahe hain
  }

  // Task edit karne ka function
  function editTask(id, newName) {
    const editedTaskList = tasks.map((task) => {
      if (id == task.id) { // Agar task ka id match karta hai to uska naam update kar dete hain
        return { ...task, name: newName };
      }
      return task; // Agar nahi match karta to as it is wapas return karte hain
    });
    setTask(editedTaskList); // Updated task list ko set karte hain
  }

  // Initial tasks ka state (props se aa raha hai)
  const [tasks, setTask] = useState(props.task);

  // Naya task add karne ka function
  function addTask(name) {
    const newTask = { id: `todo-${nanoid()}`, name, completed: false }; // Har ek naya task ek unique id ke sath add hota hai
    setTask([...tasks, newTask]); // Purane tasks ke sath naya task list me add kar rahe hain
  }

  // Task complete/incomplete toggle karne ka function
  function toggleTaskCompleted(id) {
    const updatedTask = tasks.map((task) => {
      if (id == task.id) {
        return { ...task, completed: !task.completed }; // Complete status ko flip karte hain (true se false, false se true)
      }
      return task;
    });
    setTask(updatedTask); // Updated task list ko set karte hain
  }

  // Filter kiya hua task list map karte hain (jo filter applied hai uske hisaab se)
  const taskList = tasks
    ?.filter(FILTER_MAP[filter]) // Filter lagate hain (All, Active, Completed)
    .map((task) => (
      <Todo
        id={task.id}
        name={task.name}
        completed={task.completed}
        key={task.id}
        toggleTaskCompleted={toggleTaskCompleted} // Task toggle karne ke liye pass kar rahe hain
        deleteTask={deleteTask} // Task delete karne ka function pass ho raha hai
        editTask={editTask} // Task edit karne ka function pass ho raha hai
      />
    ));

  // Filter buttons banate hain (All, Active, Completed)
  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton key={name} name={name} isPressed={name === filter} setFilter={setFilter} />
  ));

  // Remaining tasks ke liye heading line banate hain
  const tasksNoun = taskList.length > 1 ? "tasks" : "task"; // Singular ya plural decide karte hain
  const headingText = `${taskList.length} ${tasksNoun} on available`; // Tasks remaining ka text

  // Ref use karte hain list heading pe focus dene ke liye
  const listHeadRef = useRef(null);
  const previousTaskLength = usePrevious(tasks.length); // Pichle task length ko yaad rakhte hain

  useEffect(() => {
    if (tasks.length < previousTaskLength) {
      listHeadRef.current.focus(); // Agar task delete ho gaya hai, to heading pe focus set karte hain
    }
  }, [tasks.length, previousTaskLength]);

  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addTask={addTask} /> {/* Form component jo task add karne ke liye hai */}
      <div className="filters btn-group stack-exception">
        {filterList} {/* Filter buttons display karte hain */}
      </div>
      <h2 id="list-heading" tabIndex="-1" ref={listHeadRef}>{headingText}</h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading">
        {taskList} {/* Task list dikhate hain */}
      </ul>
    </div>
  );
}

export default App;
