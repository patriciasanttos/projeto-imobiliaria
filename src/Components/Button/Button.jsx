import './Button.scss';

function Button({text, onClick, className, icon}) {
    return (
      <button onClick={onClick} className={className}>
        {text}
        {icon && <span className="button-icon">{icon}</span>}
      </button>
    );
}

export default Button;