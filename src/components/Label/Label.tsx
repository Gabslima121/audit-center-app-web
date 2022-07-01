interface LabelType {
  className?: string
  id?: string
  htmlFor: string
  text?: string
}

function Label(props: LabelType) {
  return <label {...props}> {props.text} </label>
}

export { Label }
