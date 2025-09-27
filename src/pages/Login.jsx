import CryptoJS from "crypto-js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector} from 'react-redux'
const Login = () => {
  const navigate = useNavigate();
  const theme=useSelector((state)=>state.theme.value)
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const userNameChange = (event) => setUsername(event.target.value);
  const changePassword = (event) => setPassword(event.target.value);
  const errorToggle = () => setError(true);

  const submitted = (event) => {
    event.preventDefault();
    if (username !== "Sachin_HR" || password !== "Sachin@123") {
      errorToggle();
    } else {
      const validUser = { username, password };
      const secretKey = import.meta.env.VITE_SECRET_KEY;
      const encryptedUser = CryptoJS.AES.encrypt(
        JSON.stringify(validUser),
        secretKey
      ).toString();

      localStorage.setItem("validUser", encryptedUser);
      navigate("/", { replace: true });
    }
  };

  return (
    <div
      className={
        theme === "dark"
          ? "min-h-screen flex flex-col items-center justify-center bg-gray-900 px-4 text-white"
          : "min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 text-black"
      }
    >
      <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600 mb-5">
        Job Board
      </h1>

      <div
        className={
          theme === "dark"
            ? "w-full max-w-sm bg-gray-800 p-8 rounded-lg shadow-md"
            : "w-full max-w-sm bg-white p-8 rounded-lg shadow-md"
        }
      >
        <form className="space-y-6" onSubmit={submitted}>
          <div>
            <label
              htmlFor="username"
              className={
                theme === "dark"
                  ? "block text-sm font-medium text-gray-200"
                  : "block text-sm font-medium text-gray-700"
              }
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={userNameChange}
              required
              className={
                theme === "dark"
                  ? "mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 bg-gray-700 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  : "mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              }
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className={
                theme === "dark"
                  ? "block text-sm font-medium text-gray-200"
                  : "block text-sm font-medium text-gray-700"
              }
            >
              Password
            </label>
            <div className="relative mt-1">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={password}
                onChange={changePassword}
                required
                className={
                  theme === "dark"
                    ? "block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 bg-gray-700 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    : "block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                }
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="cursor-pointer absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 text-sm"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className={
              theme === "dark"
                ? "w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md shadow focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500"
                : "w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md shadow focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500"
            }
          >
            Login
          </button>
        </form>
        {showError && (
          <p className="text-red-600 text-sm mt-1">
            <span className="font-bold">*</span> Enter valid details
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
