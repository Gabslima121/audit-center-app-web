function Container({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="mt-11 bg-gray-100 rounded-lg p-2 shadow-3xl h-fit">
        {children}
      </div>
    </>
  )
}

export { Container }