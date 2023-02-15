import { useState } from "react"
const Blog = ({ blog, likeBlog, removeBlog }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [showDetail, setShowDetail] = useState(false)

  const toggleVisibility = () => {
    setShowDetail(!showDetail)
  }

  const handleLike = () => {
    likeBlog(blog.id, blog.likes + 1)
  }

  const handleRemove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      removeBlog(blog.id)
    }
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author} 
        <button onClick={toggleVisibility}>
          {showDetail ? 'hide' : 'view'}
        </button>
        <div style={{ display: showDetail ? '' : 'none'}}>
          <p>{blog.url}</p>
          <p>likes {blog.likes} <button onClick={handleLike}>like</button></p>
          <p>{blog.user.name}</p>
          <button onClick={handleRemove}>remove</button>
        </div>
      </div>
    </div>  
  )

}

export default Blog