interface inputProps {
  type?: 'text' | 'password' | 'email';
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function Input(props: inputProps) {
  return (
    <div className="w-100">
      <div className="flex flex-1 flex-col">
        <input
          className="bg-input p-2 rounded-lg"
          {...props}
        />
      </div>
    </div>
  )
}

export { Input }
