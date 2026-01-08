import './Button.scss';

function Button({text, onClick, className, icon}) {
    return (
      <button onClick={onClick} className={className}>
        {text}
        {icon && <img src={icon} alt="" />}
      </button>
    );
}

export default Button;