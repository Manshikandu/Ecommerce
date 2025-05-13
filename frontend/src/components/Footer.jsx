//import React from 'react'

const Footer = () => {
  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        <div>
            <p className="mb-5 w-32 text-xl font-medium text-gray-600" >ATTIRE ALLEY</p>
            <p className="w-full md:w-2/3 text-grey-600">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique repellat nulla blanditiis laudantium! Commodi quibusdam quasi, aliquam aspernatur, id ducimus nisi, blanditiis nesciunt unde error eius at voluptatibus consequatur accusantium.
            </p>

        </div>
        <div>
            <p className="text-xl font-medium mb-5">COMPANY</p>
            <ul className="flex flex-col gap-1 text-gray-600">
                <li>Home</li>
                <li>About US</li>
                <li>Delivery</li>
                <li>Privacy Policy</li>
            </ul>
        </div>
        <div>
            <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
            <ul className="flex flex-col gap-1 text-gray-600">
                <li>+ 312-233-435</li>
                <li>Contact@gmail.com</li>
            </ul>
        </div>
      </div>
      <div>
        <hr />
        <p className="py-5 text-sm text-center">Copright 2025@gmail.com- All Right Reserved</p>
      </div>
    </div>
  )
}

export default Footer
