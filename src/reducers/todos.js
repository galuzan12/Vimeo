import {
  ADD_TODO,
  DELETE_TODO,
  EDIT_TODO,
  COMPLETE_TODO,
  COMPLETE_ALL_TODOS,
  CLEAR_COMPLETED
} from "../constants/ActionTypes";

// const initialState = [
//   {
//     text: "Implement Undo",
//     completed: false,
//     id: 0
//   },
//   {
//     text: "Implement Redo",
//     completed: false,
//     id: 1
//   }
// ];
const initialState = {
  past: [

  ],
  present: [
    {
      text: "Implement Undo",
      completed: false,
      id: 0
    },
    {
      text: "Implement Redo",
      completed: false,
      id: 1
    }
  ],
  future: [

  ]
}

export default function todos(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO:
      const past = [...state.past, state.present];
      return {
        ...state,
        past,
        present: [
          ...state.present,
          {
            id: state.present.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
            completed: false,
            text: action.text
          }
        ]
      }

    case DELETE_TODO:
      return {
        ...state,
        present: state.present.filter((todo) => todo.id !== action.id)
      }

    case EDIT_TODO:
      return {
        ...state,
        present: state.present.map((todo) =>
          todo.id === action.id ? { ...todo, text: action.text } : todo
        )
      };

    case COMPLETE_TODO:
      return {
        ...state,
        present: state.present.map((todo) =>
          todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
        )
      };

    case COMPLETE_ALL_TODOS:
      const areAllMarked = state.present.every((todo) => todo.completed);
      return {
        ...state,
        present: state.present.map((todo) => ({
          ...todo,
          completed: !areAllMarked
        }))
      };

    case CLEAR_COMPLETED:
      return {
        ...state,
        present: state.present.filter((todo) => todo.completed === false)
      }

    default:
      return state;
  }
}
