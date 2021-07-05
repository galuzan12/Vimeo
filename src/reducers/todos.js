import {
  ADD_TODO,
  DELETE_TODO,
  EDIT_TODO,
  COMPLETE_TODO,
  COMPLETE_ALL_TODOS,
  CLEAR_COMPLETED,
  UNDO,
  REDO
} from "../constants/ActionTypes";

const initialState = {
  past: [

  ],
  present: [
    
  ],
  future: [

  ]
}

export default function todos(state = initialState, action) {

  const { past, present, future } = state

  switch (action.type) {
    case ADD_TODO:
      return {
        future: [],
        past: [...past, present],
        present: [
          ...present,
          {
            id: present.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
            completed: false,
            text: action.text
          }
        ]
      }

    case DELETE_TODO:
      return {
        future: [],
        past: [...past, present],
        present: present.filter((todo) => todo.id !== action.id)
      }

    case EDIT_TODO:
      return {
        ...state,
        present: present.map((todo) =>
          todo.id === action.id ? { ...todo, text: action.text } : todo
        )
      };

    case COMPLETE_TODO:
      return {
        future: [],
        past: [...past, present],
        present: present.map((todo) =>
          todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
        )
      };

    case COMPLETE_ALL_TODOS:
      const areAllMarked = present.every((todo) => todo.completed);
      return {
        ...state,
        present: present.map((todo) => ({
          ...todo,
          completed: !areAllMarked
        }))
      };

    case CLEAR_COMPLETED:
      return {
        ...state,
        present: present.filter((todo) => todo.completed === false)
      }

    case UNDO:
      const previous = past[past.length - 1]
      const newPast = past.slice(0, past.length - 1)
      return {
        past: newPast,
        present: previous,
        future: [present, ...future]
      }

    case REDO:
      const next = future[0]
      const newFuture = future.slice(1)
      return {
        past: [...past, present],
        present: next,
        future: newFuture
      }

    default:
      return state;
  }
}
