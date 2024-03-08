import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  const updateLocalStorage = (updatedTasks) => {
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const addTask = () => {
    if (inputValue.trim() !== '') {
      const newTasks = [...tasks, inputValue.trim()];
      setTasks(newTasks);
      updateLocalStorage(newTasks);
      setInputValue('');
    }
  };

  const deleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
    updateLocalStorage(updatedTasks);
  };

  const handleSpeechRecognition = () => {
    if ("window.SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
      let recognition = new(window.SpeechRecognition || window.webkitSpeechRecognition)();
      recognition.onresult = (e) => {
        let translate = e.results[0][0].transcript;
        setInputValue(translate);
        addTask();
      };
      recognition.start();
    } else {
      alert("Your browser does not support this feature");
    }
  };

  return (
      <div className="container mx-auto mt-10">
      <h1 className="text-white font-extrabold text-4xl text-center mb-4">To-Do List Using Voice Assistant</h1>
      <div className="flex">
        <input
          type="text"
          className="w-full border rounded py-2 px-4 mr-2"
          placeholder="Add new task..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={addTask}
        >
          Add Task
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
          onClick={handleSpeechRecognition}
        >
          Speak
        </button>
      </div>
      <ul className="mt-4">
        {tasks.map((task, index) => (
          <li key={index} className="flex justify-between py-2 border-b bg-white font-bold">
            <span className='text-xl text-fuchsia-500 mx-3 p-2'>{task}</span>
            <button className='bg-red-500 p-2 rounded-lg mx-3 text-white hover:bg-red-700' onClick={() => deleteTask(index)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
