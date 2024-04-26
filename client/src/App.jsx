import './App.css'
import Layout from './Layout'
import { Route, Routes } from 'react-router-dom'
import IndexPage from './pages/IndexPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import { UserContextProvider } from './UserContext'
import CreatePostPage from './pages/CreatePostPage'
import PostPage from './pages/PostPage'
import EditPostPage from './pages/EditPostPage'
import DeletePostPage from './pages/DeletePostPage'
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <UserContextProvider>
      <Toaster/>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/create' element={<CreatePostPage/>} />
          <Route path='/post/:id' element={<PostPage/>}/>
          <Route path='/edit/:id' element={<EditPostPage/>}/>
          <Route path='/delete/:id' element={<DeletePostPage/>}/>
        </Route>
      </Routes>
    </UserContextProvider>
  )
}

export default App
