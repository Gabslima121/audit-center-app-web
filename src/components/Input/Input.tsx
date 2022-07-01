interface inputProps {
  type?: 'text' | 'password' | 'email';
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  id?: string;
}

function Input(props: inputProps) {
  return (
    <div className="w-52 mt-2">
      <div className="flex flex-1">
        <input
          {...props}
        />
      </div>
    </div>
  )
}

export { Input }
