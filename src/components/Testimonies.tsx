import React from 'react'

const Testimonies = () => {
  return (
    <section className="h-screen w-screen bg-gray-100 grid grid-rows-2 p-8">
      {/* Testimonials */}
      <div className="mb-8">
        <h2 className="text-2xl font-medium text-center">Customer Reviews</h2>
        <div className="flex justify-around mt-4">
          <div className="max-w-xs p-4 bg-white rounded-lg">
            <p>"Awesome service with collectible-grade products."</p>
            <p>– Customer name 1</p>
          </div>
          <div className="max-w-xs p-4 bg-white rounded-lg">
            <p>"We combine precision through prints with die-cast models."</p>
            <p>– Customer name 2</p>
          </div>
          <div className="max-w-xs p-4 bg-white rounded-lg">
            <p>"Always a great gifting idea for car lovers."</p>
            <p>– Customer name 3</p>
          </div>
        </div>
      </div>

      {/* Contact */}
      <div className="bg-white p-8 rounded-lg">
        <h3 className="text-xl font-medium text-center">Contact Us</h3>
        <form className="flex flex-col gap-4 max-w-lg mx-auto">
          <input type="text" placeholder="Your Name" className="p-3" />
          <input type="email" placeholder="Email" className="p-3" />
          <textarea placeholder="Message" rows={4} className="p-3" />
          <button type="submit" className="bg-red-600 text-white p-4 rounded border-none">
            Send
          </button>
        </form>
      </div>
    </section>
  )
}

export default Testimonies
