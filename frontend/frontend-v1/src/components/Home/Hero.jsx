import React from 'react'
import img from '../../assets/Dashboard.png'

function Hero() {
  return (
    <section class="bg-gray-50 flex items-center flex-col">
  <div class="mx-auto max-w-screen-xl px-4 py-32 lg:flex">
    <div class="mx-auto max-w-xl text-center">
      <h1 class="text-3xl font-extrabold sm:text-5xl">
        Manage Your Expense
        <strong class="font-extrabold text-gray-500 sm:block"> Contol Your Money </strong>
      </h1>

      <p class="mt-4 sm:text-xl/relaxed">
        Start managing your expenses with ease.
      </p>

      <div class="mt-8 flex flex-wrap justify-center gap-4">
        <a
          class="block w-full rounded bg-gray-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-black focus:outline-none focus:ring active:bg-black-500 sm:w-auto"
          href="#"
        >
          GET STARTED
        </a>

        <a
          class="block w-full rounded px-12 py-3 text-sm font-medium text-black shadow hover:text-black-700 focus:outline-none focus:ring active:text-black-500 sm:w-auto"
          href="#"
        >
          Learn More
        </a>
      </div>
    </div>
  </div>
  <img className="mt-1 rounded-xl border-2" src={img}alt ='dashboard' width={1000} height={700}/>
</section>
  )
}

export default Hero