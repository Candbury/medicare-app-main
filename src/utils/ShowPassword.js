import React from 'react';

const showPassword = ({ user, showPassword, setShowPassword }) => {
  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div>
      <label htmlFor="password">Password:</label>
      <input
        type={showPassword ? 'text' : 'password'}
        id="password"
        name="password"
        value={user.password}
        // Add other necessary props like onChange, etc.
      />
      {/* Toggle button to show/hide password */}
      <button onClick={handleTogglePassword}>{showPassword ? 'Hide' : 'Show'} Password</button>
    </div>
  );
};

export default showPassword;
