type ButtonProps = {
    children: React.ReactNode;
    className?: string;
    type?: string;
    disabled?: boolean;
    onClick?: () => void;
  };
  
  export const Button: React.FC<ButtonProps> = ({ children, className = '', onClick }) => {
    return (
      <button
        className={`hover:scale-105 hover:cursor-pointer  ${className}`}
        onClick={onClick}
      >
        {children}
      </button>
    );
  };
  