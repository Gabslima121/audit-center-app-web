interface InputProps {
  type?: 'text' | 'password' | 'email' | 'date'
  placeholder?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  className?: string
  id?: string
  value?: string | number | Date | any
  disabled?: boolean
  name?: string
}

function Input(props: InputProps) {
  return (
    <div className="flex flex-1">
      <input {...props} />
    </div>
  )
}

export { Input }
