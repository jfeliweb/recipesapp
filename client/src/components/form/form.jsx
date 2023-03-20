export const Form = ({ label, username, setUsername, password, setPassword, onSubmit }) => {
	return (
		<div className='auth-container'>
			<form onSubmit={onSubmit}>
				<h2>{label}</h2>
				<div className='form-group'>
					<label htmlFor='username'>Username: </label>
					<input
						type='text'
						placeholder='Username'
						value={username}
						onChange={event => setUsername(event.target.value)}
					/>
				</div>
				<div className='form-group'>
					<label htmlFor='password'>Password: </label>
					<input
						type='password'
						placeholder='Password'
						value={password}
						onChange={event => setPassword(event.target.value)}
					/>
				</div>
				<button type='submit'>{label}</button>
			</form>
		</div>
	)
}
