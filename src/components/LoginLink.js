import React from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/user';
import { CartContext } from '../context/cart';

export default function LoginLink() {
  const { user, userLogout, showAlert } = React.useContext(UserContext);
  const { clearCart } = React.useContext(CartContext);

  if (user.token) {
    return (
      <button
        className='login-btn'
        onClick={() => {
          userLogout();
          clearCart();
          showAlert({
            msg: `User logged out. Goodbye, ${user.username}!`,
            type: 'danger',
          });
        }}
      >
        logout
      </button>
    );
  }
  return <Link to='/login'>login</Link>;
}
