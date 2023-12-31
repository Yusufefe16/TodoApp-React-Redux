import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getTodosAsync = createAsyncThunk(
  "todos/getTodosAsync",
  async () => {
    const res = await axios(`${process.env.REACT_APP_API_BASE_ENDPOINT}/todos`);
    return res.data;
  }
);

export const addTodosAsync = createAsyncThunk(
  "todos/addTodosAsync",
  async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_BASE_ENDPOINT}/todos`, data);
    return res.data;
  }
);

export const toggleTodoAsync = createAsyncThunk('todos/toggleTodoAsync', async ({id, data}) => {
  const res = await axios.patch(`${process.env.REACT_APP_API_BASE_ENDPOINT}/todos/${id}`, data);
  return res.data;
});

export const removeTodoAsync = createAsyncThunk('todos/removeTodoAsync', async (id) => {
  const res = await axios.delete(`${process.env.REACT_APP_API_BASE_ENDPOINT}/todos/${id}`);
  return id;
});




export const todosSlice = createSlice({
  name: "todos",
  initialState: {
    items: [],
    isLoading: false,
    error: null,
    activeFilter: localStorage.getItem('activeFilter'),
    addNewTodoIsLoading:false,
    addNewTodoError:null,
  },
  reducers: {
    chanceActiveFilter: (state, action) => {
      state.activeFilter = action.payload;
    },
    clearCompleted: (state) => {
      const filtered = state.items.filter((item) => item.completed === false);
      state.items = filtered;
    },
  },
  extraReducers: {
    [getTodosAsync.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getTodosAsync.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.isLoading = false;
    },
    [getTodosAsync.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    },
    //add todo
    [addTodosAsync.pending]: (state, action) => {
      state.addNewTodoIsLoading = true; // Değişiklik yapıldı
    },
    [addTodosAsync.fulfilled]: (state, action) => {
      state.items.push(action.payload);
      state.addNewTodoIsLoading = false; // Değişiklik yapıldı
    },
    [addTodosAsync.rejected]: (state, action) => {
      state.addNewTodoIsLoading = false;
      state.addNewTodoError = action.error.message; // Değişiklik yapıldı
    },
    //toggle todo
    [toggleTodoAsync.fulfilled]: (state,action) =>{
      const {id, completed} = action.payload;
      const index= state.items.findIndex(item=>item.id === id);
      state.items[index].completed = completed;
    },
    //remove todo
    [removeTodoAsync.fulfilled]: (state,action)=>{
      const id = action.payload;
      const index = state.items.findIndex((item) => item.id === id);
      state.items.splice(index,1)
    },
    //clear completed ones

  },
});

export const { addTodo, chanceActiveFilter, clearCompleted } =
  todosSlice.actions;

export default todosSlice.reducer;

export const selectTodos = (state) => state.todos.items;
export const selectFilteredTodos = (state) => {
  if (state.todos.activeFilter === "all") {
    return state.todos.items;
  }
  return state.todos.items.filter((todo) =>
    state.todos.activeFilter === "active"
      ? todo.completed === false
      : todo.completed === true
  );
};
