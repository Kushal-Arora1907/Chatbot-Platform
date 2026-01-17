import { useEffect, useState } from "react";
import Chat from "./pages/Chat";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { setAuthToken } from "./services/api";

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [mode, setMode] = useState("login");
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuthToken(token);
      setIsAuth(true);
    }
  }, []);

  if (!isAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white w-full max-w-sm p-6 rounded-lg shadow">
          {mode === "login" ? (
            <>
              <Login onSuccess={() => setIsAuth(true)} />
              <p
                className="mt-4 text-sm text-center text-gray-600 cursor-pointer hover:text-blue-600"
                onClick={() => setMode("register")}>
                Create account
              </p>
            </>
          ) : (
            <>
              <Register onSuccess={() => setIsAuth(true)} />
              <p
                className="mt-4 text-sm text-center text-gray-600 cursor-pointer hover:text-blue-600"
                onClick={() => setMode("login")}>
                Already have an account?
              </p>
            </>
          )}
        </div>
      </div>
    );
  }

  if (selectedProject) {
    return (
      <Chat project={selectedProject} onBack={() => setSelectedProject(null)} />
    );
  }

  return (
    <Dashboard
      onSelectProject={setSelectedProject}
      onLogout={() => {
        setAuthToken(null);
        setIsAuth(false);
        setMode("login");
      }}
    />
  );
}

export default App;
