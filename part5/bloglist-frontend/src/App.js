import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newBlog, setNewBlog] = useState(null)

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
        setBlogs( blogs )
      )  
    }
  }, [user])
  
  const updateNotification = ( msg, color ) => {
    console.log(msg)
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
      console.log(expection)
      updateNotification('Wrong username or password', 'red')
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const loginForm = () => (
    <div>
      <h2>log in to application</h2>
      <Notification message={message} style={notifyStyle} />
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}>
          </input>
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}>
          </input>
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )

  // new blog logic
  const handleBlogChange = (event) => {
    setNewBlog({ ...newBlog, [event.target.name]: event.target.value })
  }

  const handleCreate = (event) => {
    event.preventDefault()
    try {
      blogService
        .create(newBlog)
          .then(returnedBlog => {
            setBlogs(blogs.concat(returnedBlog))
            setNewBlog(null)
            updateNotification(
              `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`,
              'green'
            )
          })
    } catch(expection){
      updateNotification(JSON.stringify(expection), 'red')
    }
  }

  const blogList = () => (
    <div>
      <h2>blogs</h2>
      <Notification message={message} style={notifyStyle} />      <div>
        {user.username} logged in 
        <button onClick={handleLogout}>logout</button>
      </div>
      <h2>create new</h2>
      <form onSubmit={handleCreate}>
        <div>
          title 
          <input
            type="text"
            name="title"
            onChange={handleBlogChange} required>
          </input>
        </div>
        <div>
          author
          <input
            type="text"
            name="author"
            onChange={handleBlogChange} requried>
          </input>
        </div>
        <div>
          url
          <input
            type="text"
            name="url"
            onChange={handleBlogChange} required>
          </input>
        </div>
        <button type="submit">create</button>
      </form> 

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div> 
  )
  
  if (user === null) {
    return loginForm()
  } else {
    return blogList()
  }

}

export default App