import React, { useState, useEffect } from "react";
import {
  fetchTodoList,
  fetchTaskInfo,
  markTaskComplete,
  deleteTask,
} from "../../api/todoApi";
import "./TodoList.css";

export const TodoList = () => {
  const [todoList, setTodoList] = useState([]);
  const [currentTask, setCurrentTask] = useState(null);

  useEffect(() => {
    loadTodoList();
  }, []);

  const loadTodoList = async () => {
    try {
      const response = await fetchTodoList();
      setTodoList(response);
      setCurrentTask(response[0]);
    } catch (err) {
      console.error(err);
    }
  };

  const getTaskInfo = async (id) => {
    try {
      // const response = await fetchTaskInfo(id);
      console.timeLog(id);
      let array = [...todoList];
      for (let i = 0; i < array.length; i++) {
        if (array[i].id === id) {
          setCurrentTask(array[i]);
          break;
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const markComlete = async () => {
    try {
      let body = { ...currentTask };
      body.completed = true;
      const response = await markTaskComplete({ ...body });
      let array = [...todoList];
      for (let i = 0; i < array.length; i++) {
        if (array[i].id === response.id) {
          array[i] = response;
          setCurrentTask(response);
          setTodoList(array);
          break;
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTask = async () => {
    try {
      let body = { ...currentTask };
      // const response = await deleteTask(body.id);
      let newArray = [];
      for (let i = 0; i < todoList.length; i++) {
        if (todoList[i].id !== body.id) {
          newArray.push(todoList[i]);
        }
      }
      setTodoList(newArray);
      setCurrentTask(newArray[0]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div className="container">
        <div className="todoList">
          <ul className="list-group">
            {todoList &&
              todoList.map((item, index) => (
                <li
                  key={index}
                  className={`list-group-item ${
                    item.id === currentTask.id ? "selected" : ""
                  } `}
                  onClick={() => getTaskInfo(item.id)}
                >
                  {" "}
                  {item.title}
                </li>
              ))}
          </ul>
        </div>

        <div className="item">
          {currentTask && (
            <div>
              <div className="titleBox">
                {" "}
                <p>
                  <strong>Title:</strong> {currentTask.title}
                </p>{" "}
              </div>
              <p>
                {" "}
                <strong>User Id: </strong>
                {currentTask.userId}
              </p>
              <button className="deleteButton" onClick={deleteTask}>
                Delete
              </button>
              &nbsp;
              <button
                className="completeButton"
                onClick={markComlete}
                hidden={currentTask.completed !== false}
              >
                Completed
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
