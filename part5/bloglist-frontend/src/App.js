import { useState, useEffect, useRef } from 'react'

import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [message, setMessage] = useState(null)
  const [notifyStyle, setStyle] = useState({})

  // check local storage
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, []) 

  // get blogs if logined
  useEffect(() => {
    if (user){
      blogService.getAll().then(blogs =>
        setBlogs( blogs.sort((a, b) => b.likes - a.likes) )
      )  
    }
  }, [user])
  
  const updateNotification = ( msg, color ) => {
    setMessage(msg)
    setStyle({'color': color})
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  // login logic
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch(expection){
      updateNotification('Wrong username or password', 'red')
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const likeBlog = async (id, likes) => {
    const blog = blogs.find(n => n.id === id)
    const changedBlog = { ...blog, likes: likes}

    try {
      const returnedBlog = await blogService.update(id, changedBlog)
      setBlogs(blogs.map(blog => blog.id !== id ? blog: returnedBlog).sort((a, b) => b.likes - a.likes))
    } catch(expection) {
      updateNotification(expection.response.data.error, 'red')
    }

  }

  const removeBlog = async id => {
    try {
      await blogService.deleteBlog(id)
      setBlogs(blogs.filter(blog => blog.id !== id).sort((a, b) => b.likes - a.likes))
    } catch (expection){
      updateNotification(expection.response.data.error, 'red')
    }
  }

  // new blog logic
  const blogFormRef = useRef()

  const addBlog = async (blogObject) => {
    try {
      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog).sort((a, b) => b.likes - a.likes)) 
      updateNotification(
        `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`,
        'green'
      )
      blogFormRef.current.toggleVisibility()
    } catch (expection){
      updateNotification(expection.response.data.error, 'red')
    }
  }

  return (
    <div>
      <h1>Blogs</h1>
      <Notification message={message} style={notifyStyle} />

      {!user &&
        <Togglable buttonLabel="log in">
          <LoginForm
            username={username}
            password={password}
            setUsername={setUsername}
            setPassword={setPassword}
            handleLogin={handleLogin}
          />
        </Togglable>
      }

      {user &&
        <div>
          <div>
            {user.username} logged in 
            <button onClick={handleLogout}>logout</button>
          </div>
          <Togglable buttonLabel="create a blog" ref={blogFormRef}>
            <BlogForm
                addBlog={addBlog} />
          </Togglable>

          <div>
            {blogs.map(blog =>
              <Blog 
                likeBlog={likeBlog} 
                removeBlog={removeBlog}
                key={blog.id} 
                blog={blog} />
                
            )}
          </div>
        </div> 
      }

    </div>
  )

}

export default App