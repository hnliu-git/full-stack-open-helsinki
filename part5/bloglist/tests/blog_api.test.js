const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')
const helper = require('./test_helper')

describe('when there is initially some blogs', () => { 
    beforeEach(async () => {
        await Blog.deleteMany({})
        await Blog.insertMany(helper.initialBlogs)
    })

    test('blogs are returned as json', async () => { 
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('should return the correct amount of blogs', async () => { 
        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(helper.initialBlogs.length)
    })

    test('should have the unique id called id', async () => { 
        const response = await api.get('/api/blogs')
        response.body.forEach(blog => {
            expect(blog.id).toBeDefined() 
        })
    })

    describe('when adding a blog post', () => { 

        test('should be able to create a valid blog post', async () => {
            const newBlog = {
                title: "React patterns",
                author: "Michael Chan",
                url: "https://reactpatterns.com/",
                likes: 7,
            }

            await api
                .post('/api/blogs')
                .send(newBlog)
                .expect(201)
                .expect('Content-Type', /application\/json/)
            
            const blogAtEnd = await helper.blogsInDb()
            expect(blogAtEnd).toHaveLength(helper.initialBlogs.length + 1)
            
            const titles = blogAtEnd.map(b => b.title)
            expect(titles).toContain(newBlog.title)
        })

        test('should set like to 0 when it is missing', async () => { 
            const newBlog = {
                'title': "Javascript master",
                'author': "Carlos Zhen",
                'url': "https://javasacriptmaster.com/"
            }

            await api
                .post('/api/blogs')
                .send(newBlog)
                .expect(201)
                .expect('Content-Type', /application\/json/)
            
            const blogAtEnd = await helper.blogsInDb()
            expect(blogAtEnd).toHaveLength(helper.initialBlogs.length + 1)

            // find an obj in a list of objs
            const savedBlog = blogAtEnd.find(blog => {
                return blog.title === newBlog.title
                    && blog.author === newBlog.author
                    && blog.url === newBlog.url
            })
            console.log(savedBlog)
            expect(savedBlog).toHaveProperty('likes', 0)
        })

        test('should not add a blog without title', async () => { 
            const newBlog = {
                author: 'Morty',
                url: 'https://www.morty.com'
            }

            await api
                .post('/api/blogs')
                .send(newBlog)
                .expect(400)
            
            const blogAtEnd = await helper.blogsInDb()
            expect(blogAtEnd).toHaveLength(helper.initialBlogs.length)
        })

        test('should not add a blog without url', async () => { 
            const newBlog = {
                author: 'Morty',
                title: 'Rick and Morty'
            }

            await api
                .post('/api/blogs')
                .send(newBlog)
                .expect(400)
            
            const blogAtEnd = await helper.blogsInDb()
            expect(blogAtEnd).toHaveLength(helper.initialBlogs.length)
        })
    })

    describe('deletion of a blog', () => { 
        
        test('succeeds with status code 204 if id is valid', async () => {
            const blogAtStart = await helper.blogsInDb()            
            const blogToDelete = blogAtStart[0]

            await api
                .delete(`/api/blogs/${blogToDelete.id}`)
                .expect(204)
            
            const blogAtEnd = await helper.blogsInDb()
            
            expect(blogAtEnd).toHaveLength(
                helper.initialBlogs.length - 1
            )
        })

    })

    describe('edition of a blog', () => {
        test('can update the likes with status code 204', async () => { 
            const blogAtStart = await helper.blogsInDb()
            const blogToUpdate = blogAtStart[0]

            const newBlog = {
                likes: 100
            }

            const updatedBlog = await api
                .put(`/api/blogs/${blogToUpdate.id}`)
                .send(newBlog)
            
            expect(updatedBlog.body).toHaveProperty('likes', newBlog.likes)
        })
         

    })

    
 })

afterAll(() => {
    mongoose.connection.close()
})