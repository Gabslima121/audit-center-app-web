interface inputProps {
  type?: 'text' | 'password' | 'email' | 'date';
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  id?: string;
}

function Input(props: inputProps) {
  return (
      <div className="flex flex-1">
        <input
          {...props}
        />
      </div>
  )
}

export { Input }
