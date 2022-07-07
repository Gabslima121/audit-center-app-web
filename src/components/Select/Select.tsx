import { useEffect } from 'react'

interface OptionObject {
  id?: string
  name?: string
  corporateName?: string
}

interface SelectProps {
  htmlFor?: string
  id?: string
  className?: string
  options: OptionObject[]
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

function Select(props: SelectProps) {
  return (
    <select {...props}>
      <option>Selecione</option>
      {props?.options.map(item => (
        <option key={item?.id} value={item?.id}>
          {item?.name || item?.corporateName}
        </option>
      ))}
    </select>
  )
}

export { Select }
