import { useState } from "react"

const BlogForm = ({
    addBlog,
}
) => {

    const [newBlog, setNewBlog] = useState({
        'title': '',
        'author': '',
        'url': ''
    })

    const handleBlogChange = (event) => {
        setNewBlog({ ...newBlog, [event.target.name]: event.target.value })
    }

    const handleCreate = (event) => {
        event.preventDefault()
        addBlog(newBlog)
        setNewBlog({
            'title': '',
            'author': '',
            'url': ''
        })
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={handleCreate}>
            <div>
                title 
                <input
                type="text"
                name="title"
                value={newBlog.title}
                onChange={handleBlogChange}>
                </input>
            </div>
            <div>
                author
                <input
                type="text"
                name="author"
                value={newBlog.author}
                onChange={handleBlogChange}>
                </input>
            </div>
            <div>
                url
                <input
                type="text"
                name="url"
                value={newBlog.url}
                onChange={handleBlogChange}>
                </input>
            </div>
            <button type="submit">create</button>
            </form> 
        </div> 
    )
}

export default BlogForm