import {Route, Routes} from 'react-router-dom'
import {Header} from './components'
import {Chat, Home, LogIn, NotFound, SignUp} from './pages'

export const App = () => {
  return (
    <main>
      <Header />

      <Routes>
        <Route path='/' element={<Home />} />

        <Route path='/chat' element={<Chat />} />
        <Route path='/log-in' element={<LogIn />} />
        <Route path='/sign-up' element={<SignUp />} />

        <Route path='*' element={<NotFound />} />
      </Routes>
    </main>
  )
}
