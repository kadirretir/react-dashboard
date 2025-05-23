import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

const Register = ({ switchPages }) => {
  const [isBusy, setIsBusy] = useState(false)
  const mutation = useMutation({
    queryKey: ["register"],
    mutationFn: async (data) => {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/register`,
        data
      );

      return res.data;
    },

    onSuccess: (res) => {
      setIsBusy(true);
      toast.success(
        <div>
          {res.message}
          <br />
          You're being redirected!
        </div>,
        {
          onClose: () => {
            switchPages("login")
                setIsBusy(false);
          },
          className: "w-[400px] text-left",
        }
      );
    },

    onError: (err) => {
      console.log(err);
      toast.error(err.response.data.message)
    },
  });

  const handleClick = (e) => {
    e.preventDefault();
    switchPages("login");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const data = {
      username: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password"),
    };
    mutation.mutate(data);
  };

  return (
    <div className="flex min-h-full h-full flex-1 content-center flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="admin register"
          src="/admin.svg"
          className="mx-auto  h-25 w-auto"
        />
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Sign Up
        </h2>
        <h3 className="bg-blue-300 mt-2 mb-0 text-center  text-gray-500 py-1 px-1 rounded-sm">
          Register as Moderator
        </h3>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          onSubmit={handleSubmit}
          action="#"
          method="POST"
          className="space-y-6"
        >
          <div>
            <label
              htmlFor="username"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Username
            </label>
            <div className="mt-2">
              <input
                id="username"
                name="username"
                type="text"
                required
                autoComplete="username"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Password
              </label>
              <div className="text-sm"></div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isBusy ? true : false}
              className={`flex ${
                isBusy ? "cursor-wait" : "cursor-pointer"
              }  w-full  transition ease-in-out justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
            >
              Sign Up 
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm/6 text-gray-500">
          Are you a member?{" "}
          <a
            onClick={handleClick}
            href=""
            className="font-semibold text-indigo-600 hover:text-indigo-500"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
