const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
        .find({}).populate('user', { username: 1, name: 1, id: 1 })
    response.json(blogs)
})

blogsRouter.put('/:id', async (request, response) => {
    const body = request.body
    const user = request.user

    const blog = {
        likes: body.likes
    }

    const result = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
        .populate('user', {
            username: 1,
            name: 1,
        })

    response.json(result)
})

blogsRouter.post('/', async (request, response) => {
    const body = request.body
    const user = request.user
    
    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id
    })

    const result = await blog.save()
    user.blogs = user.blogs.concat(result._id)
    await user.save()
    result.user = {'name': user.name}

    const returnedBlog = {
        'author': result.author,
        'title': result.title,
        'url': result.url,
        'likes': result.likes,
        'user': {'name': user.name}
    }

    response.status(201).json(returnedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
    const user = request.user
    const blog = await Blog.findById(request.params.id)

    if ( blog.user.toString() === user._id.toString() ){
        await blog.remove()
        response.status(204).end()
    } else {
        response.status(401).json({
            error: 'blog can only be deleted by the author'
        })
    }
})

module.exports = blogsRouter