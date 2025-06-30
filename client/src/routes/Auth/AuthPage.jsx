import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";




const AuthPage = () => {
  const [switchPages, setSwitchPages] = useState("login");



  return (
    <div className="relative min-h-screen bg-gray-100 overflow-hidden">
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-indigo-300 opacity-30 rounded-full blur-[120px] -translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-pink-300 opacity-20 rounded-full blur-[100px] translate-x-1/4 translate-y-1/4" />

      <div className="relative z-10 flex items-center justify-center min-h-screen">
        {switchPages === "login" ? (
          <Login switchPages={setSwitchPages} />
        ) : switchPages === "register" ? (
          <Register switchPages={setSwitchPages} />
        ) : null}
      </div>
    </div>
  );
};

export default AuthPage;
