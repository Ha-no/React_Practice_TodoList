import React, { useReducer, createContext, useContext, useRef } from 'react';

const initialTodos = [
  {
    id: 1,
    text: 'Create Project',
    done: true,
    edit: false,
    heart: 0
  },
  {
    id: 2,
    text: 'Styling Component',
    done: true,
    edit: false,
    heart: 0
  },
  {
    id: 3,
    text: 'Create Context',
    done: false,
    edit: false,
    heart: 0
  },
  {
    id: 4,
    text: 'Imple Function',
    done: false,
    edit: false,
    heart: 0
  }
];

function todoReducer(state, action) {
    switch (action.type) {
      case 'CREATE':
        return state.concat(action.todo);
      case 'TOGGLE':
        return state.map(todo =>
          todo.id === action.id ? { ...todo, done: !todo.done } : todo
        );
      case 'EDIT':
        return state.map(todo =>
          todo.id === action.id ? { ...todo, edit: !todo.edit } : todo
        );
      case 'UPDATE':
        console.log("UPDATE")
        console.log(action);
        return state.map(todo =>
          todo.id === action.payload.id ? { ...todo, text: action.payload.text, done: action.payload.done, edit: action.payload.edit } : todo
        );
      case 'HEART':
        console.log("HEART")
        return state.map( todo =>
          todo.id === action.payload.id ? { ...todo, heart: action.payload.heart } : todo  
        )
      case 'REMOVE':
        return state.filter(todo => todo.id !== action.id);
      default:
        throw new Error(`Unhandled action type: ${action.type}`);
    }
  }

const TodoStateContext = createContext();
const TodoDispatchContext = createContext();
const TodoNextIdContext = createContext();

export function TodoProvider({ children }) {
  const [state, dispatch] = useReducer(todoReducer, initialTodos);
  const nextId = useRef(5);

  return (
    <TodoStateContext.Provider value={state}>
      <TodoDispatchContext.Provider value={dispatch}>
        <TodoNextIdContext.Provider value={nextId}>
          {children}
        </TodoNextIdContext.Provider>
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  );
}

export function useTodoState() {
  return useContext(TodoStateContext);
}

export function useTodoDispatch() {
  return useContext(TodoDispatchContext);
}

export function useTodoNextId() {
  return useContext(TodoNextIdContext);
}