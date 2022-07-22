interface ButtonProps {
  type?: 'submit' | 'button';
  onClick?: () => void;
  children?: React.ReactNode;
  className?: string;
}

export function Button(props: ButtonProps) {
  return (
    <button
      className="mt-4 p-2 text-lg text-white bg-brand-300 rounded-md border-transparent flex-1 flex justify-center items-center hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-100 focus:ring-brand-200 transition-colors"
      {...props}
    />
  )
}
