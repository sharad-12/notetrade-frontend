import React from "react";
import LogoFront from '../Images/logoFront.png'
import { Link } from "react-router-dom";
import Services from '../components/Services'
import About from '../components/About'
import FAQ from '../components/FAQ'
import Contact from '../components/Contact'

export default function Home() {
  return (
    <>
      <section className="backky bg-gray-100 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto py-10 flex flex-col-reverse lg:flex-row items-center">
          <div className="lg:w-1/2 lg:pr-8 ">
            <img 
              src={LogoFront}
              alt="Welcome"
              className="logoClass"
            />
          </div>
          <div className="lg:w-1/2 lg:pl-8 mt-12 lg:mt-20 sm:mt-20 sm:pb-0">
            <h2 className="text-3xl font-extrabold heading sm:text-4xl ">
              Welcome to NoteTrade!...
            </h2>
            <div className="mt-6 text-xl  text-black text-justify">
              <p className="paraHome text-gray-500">
                Your subject notes may seem useless once the semester/year ends,
                but before you toss them in the trash, consider this:- 
                 <span className="spanValue font-bold">Those notes can actually be quite valuable.</span>
                 They can help you study,
                assist others, and even save the planet a tiny bit. Keep them
                organized, and you'll thank yourself in the future.
              </p>
              <div className="buttons my-4">
                <Link to="/signup">
                  <button className="btnValue px-4 py-2 rounded-2xl text-white font-bold  ">
                    SignUp
                  </button>
                </Link>
                <Link to="/login">
                  <button className="btnValue px-4 py-2 rounded-2xl text-white font-bold ">
                    Login
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
     <Services/>
     <About/>
    <FAQ/>
    <Contact/>
    </>
  );
}
