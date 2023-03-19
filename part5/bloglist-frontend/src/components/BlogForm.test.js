import BlogForm from './BlogForm'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
    const createBlog = jest.fn()
    const user = userEvent.setup()
    
    const { container } = render(<BlogForm addBlog={createBlog} />)

    const titleInput = container.querySelector('input[name="title"]')
    const authorInput = container.querySelector('input[name="author"]')
    const urlInput = container.querySelector('input[name="url"]')

    const submitBtn = container.querySelector('button')

    await user.type(titleInput, 'blog title')
    await user.type(authorInput, 'author')
    await user.type(urlInput, 'www.url.com')
    await user.click(submitBtn)

    expect(createBlog.mock.calls).toHaveLength(1)
    const newBlog = createBlog.mock.calls[0][0]
    expect(newBlog.title).toBe('blog title')
    expect(newBlog.author).toBe('author')
    expect(newBlog.url).toBe('www.url.com')

})


