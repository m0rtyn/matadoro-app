import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task, TaskState } from './types';
import { saveToLocalStorage } from '../../shared/lib/localStorage';

const initialState: TaskState = {
  tasks: [],
  currentTask: null,
};

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
      saveToLocalStorage('taskState', state);
    },
    setCurrentTask: (state, action: PayloadAction<Task | null>) => {
      state.currentTask = action.payload;
      saveToLocalStorage('taskState', state);
    },
    updateTaskStatus: (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex(t => t.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
      state.currentTask = null;
      saveToLocalStorage('taskState', state);
    },
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
      saveToLocalStorage('taskState', state);
    },
  },
});

export const { addTask, updateTaskStatus, setCurrentTask, setTasks } = taskSlice.actions;
export default taskSlice.reducer;