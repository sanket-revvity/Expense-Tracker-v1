import React from "react";
import img from "../../assets/Dashboard.png";
import { TypeAnimation } from "react-type-animation";

function Hero() {
  return (
    <section
      className="bg-[radial-gradient(circle,#73737340_1px,transparent_1px)] 
    bg-[size:12px_12px] flex items-center flex-col min-h-screen py-16"
    >
      <div className="mx-auto max-w-screen-xl px-6 lg:flex lg:items-center">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-extrabold text-white sm:text-6xl leading-tight">
            Manage Your Expense
            <br />
            <strong className="font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-gray-500 to-gray-700">
              <TypeAnimation
                sequence={[
                  `Track Every Rupee`,
                  2000,
                  "Save More, Stress Less",
                  2000,
                  "Plan Your Future ",
                  2000,
                ]}
                wrapper="span"
                speed={50}
                style={{ display: "inline-block" }}
                repeat={Infinity}
              />
            </strong>
          </h1>

          <p className="mt-4 text-lg text-slate-700">
            Start managing your expenses effortlessly and take control of your
            finances.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-6">
            <a
              className="block w-full sm:w-auto rounded-xl bg-gray-600 px-8 py-3 text-lg font-medium text-white shadow-lg hover:bg-black transform hover:scale-105 transition-all duration-300"
              href="/dashboard"
            >
              GET STARTED 🚀
            </a>

            <button className="rounded-xl px-8 py-3 text-lg font-medium bg-gray-100 text-black shadow-lg hover:text-white hover:bg-black transform hover:scale-105 transition-all duration-300">
              Learn More
            </button>
          </div>
        </div>
      </div>

      <img
        className="mt-8 rounded-xl border-2 border-gray-700 shadow-lg hover:shadow-gray-500 transition-all duration-300 hover:scale-105"
        src={img}
        alt="dashboard"
        width={1000}
        height={700}
      />
    </section>
  );
}

export default Hero;
