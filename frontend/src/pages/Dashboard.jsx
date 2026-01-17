import { useEffect, useState } from "react";
import { api } from "../services/api";

export default function Dashboard({ onSelectProject, onLogout }) {
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState("");

  const loadProjects = async () => {
    const res = await api.get("/projects");
    setProjects(res.data);
  };

  const createProject = async () => {
    if (!name) return;
    await api.post("/projects", { name });
    setName("");
    loadProjects();
  };

  useEffect(() => {
    loadProjects();
  }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Your Projects</h2>

      <div className="flex gap-2 mb-6">
        <input
          className="flex-1 border p-2 rounded"
          placeholder="New project name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white px-4 rounded hover:bg-blue-700"
          onClick={createProject}>
          Create
        </button>

        <button className="text-red-600 hover:underline" onClick={onLogout}>
          Logout
        </button>
      </div>

      <ul className="space-y-2">
        {projects.map((p) => (
          <li key={p.id}>
            <button
              className="w-full text-left p-3 bg-white rounded shadow hover:bg-gray-50"
              onClick={() => onSelectProject(p)}>
              {p.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
