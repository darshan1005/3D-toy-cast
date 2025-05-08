import React from 'react'

const Select = () => {
  return (
    <section className="h-screen w-screen bg-white flex flex-col items-center justify-center p-8 text-center">
      <img src="/yellow-car.png" alt="Model" className="w-1/2 mb-8" />
      <h2 className="text-2xl font-medium">Select Your Toy and Frame</h2>
      <p>Choose your favorite die-cast and frame it with our customized backgrounds</p>
      <div className="my-4">
        <button className="mr-4 px-8 py-4">TOY</button>
        <button className="px-8 py-4">FRAME</button>
      </div>
      <button className="px-12 py-4 bg-red-600 text-white rounded">Order</button>
    </section>
  )
}

export default Select
