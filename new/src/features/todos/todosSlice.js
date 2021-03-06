import { createSelector } from 'reselect'
import { client } from '../../api/client'
import { StatusFilters } from '../filters/filtersSlice'

const initialState = {
  status: 'idle',
  entities: {}
}

export default function todosReducer(state = initialState, action) {
  switch(action.type) {
    case 'todos/allCompleted': {
      const newEntities = { ...state.entities }
      Object.values(newEntities).forEach(todo => {
        newEntities[todo.id] = {
          ...todo,
          completed: true
        }
      })
      return {
        ...state,
        entities: newEntities
      }
    }

    case 'todos/colorSelected': {
      const { color, todoId } = action.payload
      const todo = state.entities[todoId]
      return {
        ...state,
        entities: {
          ...state.entities,
          [todoId]: {
            ...todo,
            color
          }
        }
      }
    }

    case 'todos/completedCleared': {
      const newEntities = { ...state.entities }
      Object.values(newEntities).forEach(todo => {
        if (todo.completed) {
          delete newEntities[todo.id]
        }
      })
      return { 
        ...state,
        entities: newEntities
      }
    }

    case 'todos/todoAdded': {
      const todo = action.payload
      return {
        ...state,
        entities: {
          ...state.entities,
          [todo.id]: todo
        }
      }
    }

    case 'todos/todoDeleted': {
      const newEntities = { ...state.entities }
      delete newEntities[action.payload]
      return {
        ...state,
        entities: newEntities
      }
    }
    
    case 'todos/todosLoaded': {
      const newEntities = {}
      action.payload.forEach(todo => {
        newEntities[todo.id] = todo
      })
      return {
        ...state,
        status: 'idle',
        entities: newEntities
      }
    }

    case 'todos/todoToggled': {
      const todoId = action.payload
      const todo = state.entities[todoId]
      return {
        ...state,
        entities: {
          ...state.entities,
          [todoId]: {
            ...todo,
            completed: !todo.completed
          }
        }
      }
    }

    default:
      return state
  }
}

export const allTodosCompleted = () => ({ type: 'todos/allCompleted' })

export const completedTodosCleared = () => ({ type: 'todos/completedCleared' })

export const todoAdded = todo => ({ type: 'todos/todoAdded', payload: todo })

export const todoColorSelected = (todoId, color) => ({
  type: 'todos/colorSelected',
  payload: { todoId, color }
})

export const todoDeleted = todoId => ({
  type: 'todos/todoDeleted',
  payload: todoId
})

export const todoLoaded = todos => {
  return {
    type: 'todos/todosLoaded',
    payload: todos
  }
}

export const fetchTodos = () => async dispatch => {
  const response = await client.get('/fakeApi/todos')
  dispatch(todoLoaded(response.todos))
}

export function saveNewTodo(text) {
  return async function saveNewTodoThunk(dispatch, getState) {
    const initialTodo = { text }
    const response = await client.post('/fakeApi/todos', { todo: initialTodo })
    dispatch(todoAdded(response.todo))
  }
}

export const selectTodoEntities = state => state.todos.entities

export const selectTodos = createSelector(
  selectTodoEntities,
  (entities) => Object.values(entities)
)

export const selectFilteredTodos = createSelector(
  selectTodos,
  state => state.filters,
  (todos, filters) => {
    const { colors, status } = filters
    const showAllCompletions = status === StatusFilters.All

    if (showAllCompletions && colors.length === 0) {
      return todos
    }

    const completedStatus = status === StatusFilters.Completed

    return todos.filter(todo => {
      const statusMatches = 
        showAllCompletions || todo.completed === completedStatus
      const colorMatches = colors.length === 0 || colors.includes(todo.color)
      return statusMatches && colorMatches
    })
  }
)

export const selectFilteredTodoIds = createSelector(
  selectFilteredTodos,
  filteredTodos => filteredTodos.map(todo => todo.id)
)

export const selectTodoById = (state, todoId) => {
  return selectTodos(state).find(todo => todo.id === todoId)
}

export const selectTodoIds = createSelector(
  selectTodos,
  todos => todos.map(todo => todo.id)
)
