import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

test('By default URL, likes are not shown and title, author are shown', () => {
  const blog = {
    'title': 'test',
    'author': 'author',
    'url': 'www.test.com',
    'likes': 0,
    'user': { 'name': 'admin' },
    'id': 1
  }

  const likeFunc = jest.fn()
  const removeFunc = jest.fn()

  const blogDiv = render(<Blog blog={blog} likeBlog={likeFunc} removeBlog={removeFunc} />).container

  const overview = blogDiv.querySelector('.overview')
  const detail = blogDiv.querySelector('.detail')

  expect(overview).not.toHaveStyle('display: none')
  expect(detail).toHaveStyle('display: none')
})

test('Url and number of likes are shown when view button is clicked', async () => {
  const blog = {
    'title': 'test',
    'author': 'author',
    'url': 'www.test.com',
    'likes': 0,
    'user': { 'name': 'admin' },
    'id': 1
  }

  const likeFunc = jest.fn()
  const removeFunc = jest.fn()

  const blogDiv = render(<Blog blog={blog} likeBlog={likeFunc} removeBlog={removeFunc} />).container

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  const overview = blogDiv.querySelector('.overview')
  const detail = blogDiv.querySelector('.detail')

  expect(overview).not.toHaveStyle('display: none')
  expect(detail).not.toHaveStyle('display: none')
})

test('Like button is called normally', async () => {
  const blog = {
    'title': 'test',
    'author': 'author',
    'url': 'www.test.com',
    'likes': 0,
    'user': { 'name': 'admin' },
    'id': 1
  }

  const likeFunc = jest.fn()
  const removeFunc = jest.fn()

  render(<Blog blog={blog} likeBlog={likeFunc} removeBlog={removeFunc} />)

  const user = userEvent.setup()
  const viewButton = screen.getByText('view')
  await user.click(viewButton)

  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(likeFunc.mock.calls).toHaveLength(2)
})