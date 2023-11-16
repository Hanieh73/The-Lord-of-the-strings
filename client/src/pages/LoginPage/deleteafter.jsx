<div className="login-page">
      <div className="login">
        <h1 className="login-header">LOGIN</h1>
        <form className="login-form" onSubmit={handleSubmit}>
          <label className="login-username">
            Username:
            <input
              type="text"
              placeholder="Enter Username"
              onChange={handleInput}
              required
            />
          </label>
          <label className="login-password">
            Password:
            <input
              type="password"
              placeholder="Enter Password"
              onChange={handlePassword}
              required
            />
          </label>
          <button type="submit" className="btn-submit">
            Sign In
          </button>
          <Link to="/register">
            <button className="btn-register">Register</button>
          </Link>
        </form>
        {incorrectCredentials ? (
          <h3 style={{ color: '#FF0000', textAlign: 'center' }}>
            Incorrect Credentials
          </h3>
        ) : (
          ''
        )}
      </div>
    </div>