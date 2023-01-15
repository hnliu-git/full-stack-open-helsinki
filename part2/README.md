
# Overview on this part

This part talks deeply into how you render more complex data structures correctly. It also starts talking about server, you can communicate with server follow the Asynchronous model. 

# What you can do after it

- You should be able render collections with `map` function correctly (use unique indices)
- You should be able to use the form element
- You can communicate with server by `axios`
- You understand Effect basic concept and know how to use it to fetch data
- You know how to add style to your app by inline style and external style


# Notes

## Effect Hook

Sometimes, we want to run some additional code after React has updated the DOM. Network requests, manual DOM mutations, and logging are common examples of effects that don’t require a cleanup. That is the case we need Effect hook

    By default, effects run after every completed render, but you can choose to fire it only when certain values ​​have changed.

    The second parameter of useEffect is used to specify how often the effect is run . If the second parameter is an empty array [] , then the effect is only run along with the first render of the component.

We fetch data from the server on the first render.

```js
const hook = () => {
  console.log('effect')
  axios
    .get('http://localhost:3001/notes')
    .then(response => {
      console.log('promise fulfilled')
      setNotes(response.data)
    })
}

useEffect(hook, [])
```

## Styles

By className
```js
<div className='error'>
    {message}
</div>
```

By inline style

```js
const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16
}
return (
<div style={footerStyle}>
    <br />
    <em>Note app, Department of Computer Science, University of Helsinki 2022</em>
</div>
)
```