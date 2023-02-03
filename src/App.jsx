
import { createGlobalStyle } from 'styled-components'
import { TodoProvider } from './hanho/TodoProvider'
import TodoCreate from './hanho/TodoCreate'
import TodoHead from './hanho/TodoHead'
import TodoList from './hanho/TodoList'
import TodoTemplate from './hanho/TodoTemplate'

const GlobalStyle = createGlobalStyle`
  body {
    background: #e0ecef;
  }
`
function App() {

  return (
    <>
    <TodoProvider>
      <GlobalStyle />
      <TodoTemplate>
        <TodoHead />
        <TodoList />
        <TodoCreate />
      </TodoTemplate>
    </TodoProvider>
    </>
  )
}

export default App
