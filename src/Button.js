import './Button.css';

function Button({color='blue', onClick, children, className=''}) {
  const classNames = `Button ${color} ${className}`;

  return (
    <button className={classNames} onClick = {onClick}> 
      {children} 
    </button>
  )
}

export default Button;