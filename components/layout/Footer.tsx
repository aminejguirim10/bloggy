import React from "react"

const Footer = () => {
  const cuurentYear = new Date().getFullYear()
  return (
    <div className="mx-auto mt-6 flex w-full max-w-7xl items-center justify-center border-t px-6 py-4 font-bold">
      Made By Amine Jguirim {cuurentYear}
    </div>
  )
}

export default Footer
