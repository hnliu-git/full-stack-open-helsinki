import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, []) 

  useEffect(() => {
    if (user){
      blogService.getAll().then(blogs =>
        setBlogs( blogs )
      )  
    }
  }, [user])

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
      console.log('Wrong credentials')
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

  const blogList = () => (
    <div>
      <h2>blogs</h2>
      <div>
        {user.username} logged in 
        <button onClick={handleLogout}>logout</button>
      </div>
      <br/>
      <form onSubmit={handleCreate}>
        <div>
          title 
          <input
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setUsername(target.value)}>
          </input>
        </div>
        <div>
          author
          <input
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setPassword(target.value)}>
          </input>
        </div>
        <div>
          url
          <input
            type="text"
            value={url}
            name="Url"
            onChange={}>
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