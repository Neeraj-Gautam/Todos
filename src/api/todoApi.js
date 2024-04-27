import axios from "axios";
const todoListUrl = process.env.TODO_LIST_URL;

export const fetchTodoList = async () => {
  try {
    const reqUrl = `https://jsonplaceholder.typicode.com/todos/`;
    const response = await axios.get(reqUrl);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchTaskInfo = async (id) => {
    try {
      const reqUrl = `https://jsonplaceholder.typicode.com/todos/${id}`;
      const response = await axios.get(reqUrl);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

export const markTaskComplete = async ({id, userId, title, completed}) => {
    try {
      const reqUrl = `https://jsonplaceholder.typicode.com/todos/${id}`;
      const reqPayload = {id, userId, title, completed};
      const response = await axios.patch(reqUrl, reqPayload);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  export const deleteTask = async (id) => {
    try {
      const reqUrl = `https://jsonplaceholder.typicode.com/todos/${id}`;
      const response = await axios.delete(reqUrl);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };