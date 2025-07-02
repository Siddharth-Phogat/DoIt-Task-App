import React from "react";
import image from "../assets/nikeShoes.png"
import logo from "../assets/nikeLogo.png"
import facebook from "../assets/facebookLogo.png"
import google from "../assets/googleLogo.png"
import {Lock, User} from"lucide-react"

const LoginPage = () => {
  return (
    <div className="w-[1344px] mx-auto flex h-screen justify-center items-center p-2">
      <div className="bg-cyan-600 shadow-xl w-3/5 h-2/3 flex justify-center items-center rounded-bl-2xl rounded-tl-2xl">
        <div className="w-3/4 h-10/12 flex items-center">
          <img className=" ml-4 w-full" src={image} alt="" />
        </div>
        <div className="flex flex-col py-12 gap-2 w-1/4 h-10/12">
          <div className="bg-cyan-500 shadow-lg h-1/6 flex items-center justify-center rounded-l-full cursor-pointer">
            <button className="text-2xl font-bold cursor-pointer">
              LOGIN
            </button>
          </div>
          <div className="h-1/6 flex items-center justify-center rounded-l-full cursor-pointer">
            <button className="text-2xl font-bold text-white cursor-pointer">
              SIGN UP
            </button>
          </div>
        </div>
      </div>
      <div className="bg-white shadow-xl w-2/5 h-2/3 flex flex-col justify-around rounded-br-2xl rounded-tr-2xl">
        <div className="shadow-xl h-5/6 rounded-bl-[250px] flex items-center justify-center">
          <div className="h-4/5 w-3/5 flex flex-col  items-center">
            {/* logo */}
            <div className="h-1/3 w-full flex items-center justify-center">
              {/* w-2/5 for doit logo */}
              <img className="w-4/5" src={logo} alt="" />
            </div>
            <div className="flex flex-col w-full h-2/3 justify-around py-5 items-center">
              {/* Email */}
              <div className="flex flex-col gap-1.5 w-4/5 justify-center">
                <div className="flex gap-2 items-center">
                  {/* email label */}
                  <User/>
                  {/* input */}
                  <div className="w-full">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      className="w-full outline-none text-xl"
                      placeholder="Email"
                      onFocus={(e) => (e.target.placeholder = "")}
                      onBlur={(e) => (e.target.placeholder = "Email")}
                    />
                  </div>
                </div>
                <div className="bg-gray-600 h-0.5 rounded-full w-full"></div>
              </div>
              {/* password */}
              <div className="flex flex-col gap-1.5 w-4/5 justify-center">
                <div className="flex gap-2 items-center">
                  {/* email label */}
                  <Lock/>
                  {/* input */}
                  <div className="w-full">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      required
                      autoComplete="current-password"
                      className="w-full outline-none text-xl"
                      placeholder="Password"
                      onFocus={(e) => (e.target.placeholder = "")}
                      onBlur={(e) => (e.target.placeholder = "Password")}
                    />
                  </div>
                </div>
                <div className="bg-gray-600 h-0.5 rounded-full w-full"></div>
              </div>
              {/* other data */}
              <div className="flex w-full justify-around items-center">
                {/* forgot password */}
                <div className="text-indigo-600 font-semibold cursor-pointer">Forget Password?</div>
                {/* login button */}
                <div className="flex items-center justify-center">
                  <button className="w-[100px] font-semibold bg-indigo-600 text-white outline-none px-2.5 py-1.5 rounded-full hover:bg-indigo-700 cursor-pointer">
                    LOGIN
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* other login options */}
        <div className="h-1/6 w-full">
          <div className="h-full w-2/3 mx-auto flex items-center justify-around textxl">
            <div className="text-indigo-500 font-bold cursor-pointer">Or Login With</div>
            <div className="flex gap-1.5 items-center text-indigo-400 font-bold">
              <div>
                <img className="w-5 h-5 rounded-full" src={google} alt="" />
              </div>
              Google
            </div>
            <div className="flex gap-1.5 items-center text-indigo-400 font-bold">
              <div>
                <img className="w-5 h-5 rounded-full" src={facebook} alt="" />
              </div>
              Facebook
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default LoginPage;
