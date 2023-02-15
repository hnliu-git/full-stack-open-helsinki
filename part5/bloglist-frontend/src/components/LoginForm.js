
const LoginForm = ( {
    username,
    setUsername,
    password,
    setPassword,
    handleLogin } ) => {

    return (
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
}

export default LoginForm