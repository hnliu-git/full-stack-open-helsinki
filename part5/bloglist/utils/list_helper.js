
const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, item) => {
        return sum + item['likes']
    }
    return blogs.length === 0
        ? 0
        : blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0){
        return null
    }

    let mostLikes = 0
    const favBlog = {
        'title': blogs[0]['title'],
        'author': blogs[0]['author'],
        'likes': blogs[0]['likes']
    }

    blogs.forEach(blog => {
      if (blog['likes'] > mostLikes){
        mostLikes = blog['likes']
        favBlog['title'] = blog['title']
        favBlog['author'] = blog['author']
        favBlog['likes'] = blog['likes']
      }  
    })

    return favBlog
}

module.exports = {
    dummy, totalLikes, favoriteBlog
}