//mport React from 'react'

const NewsLetterBox = () => {
    const onSubmitHandler = (event) => {
    event.preventDefault();
    }
  return (
    <div className="text-center">
      <p className="text-2xl font-medium text-gray-800">Subscribe now & get 20% off</p>
      <p className="text-grey-400 mt-3">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto esse fugiat exercitationem repudiandae facere odio nemo perferendis non nihil quos quisquam saepe, consectetur cupiditate, aperiam placeat tempora iure. Neque, modi.</p>
      <form  onSubmit={onSubmitHandler} className="w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3">
        <input className="w-full sm:flex-1 outline-none" type="email" placeholder='Enter Your Email:' required />
        <button type="Submit" className="bg-black text-white text-xs px-10 py-4">Subscribe</button>
      </form>
    </div>
  )
}

export default NewsLetterBox
