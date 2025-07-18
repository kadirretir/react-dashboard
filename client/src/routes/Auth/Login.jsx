import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";


const Login = ({switchPages}) => {


  const mutation = useMutation({
    queryKey: ["login"],
    mutationFn: async (data) => {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        data, {withCredentials: true}
      );
      return res.data;
    },

    onSuccess: (res) => {
      console.log(res)
      window.location.href = "/dashboard"
      // setIsBusy(true);
      // toast.success(
      //   <div>
      //     {res.message}
      //     <br />
      //     You're being redirected!
      //   </div>,
      //   {
      //     onClose: () => {
      //       switchPages("login")
      //           setIsBusy(false);
      //     },
      //     className: "w-[400px] text-left",
      //   }
      // );
    },

    onError: (err) => {
      console.log(err.response.data.message);
       toast.error(err.response.data.message)
    },
  });

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

      const data = {
        email: formData.get("email"),
        password: formData.get("password")
      }
      e.target.reset();
    
      mutation.mutate(data)
    }


    const handleClick = (e) => {
        e.preventDefault()
        switchPages("register")
    }
    
  return  (
    <div className="flex  min-h-full h-full flex-1 content-center flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="admin login"
            src="/admin.svg"
            className="mx-auto  h-25 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
          <h3 className="bg-blue-300 mt-2 mb-0 text-center text-gray-500 py-1 px-1 rounded-sm">
            E-mail: admin@admin.com <br/>
            Password: admin

          </h3>
           
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} method="POST" className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-300 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                  Password
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-300 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center transition ease-in-out cursor-pointer rounded-md bg-blue-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-500">
            Not a member?{' '}
            <a href="" onClick={handleClick} className="font-semibold text-indigo-600 hover:text-indigo-500">
              Register
            </a>
          </p>
        </div>
      </div>
  )
}

export default Login