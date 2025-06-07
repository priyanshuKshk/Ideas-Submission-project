import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext"; // assuming you store user/token here
import { FiAlertCircle, FiDownload, FiFileText } from "react-icons/fi";
import { motion } from "framer-motion";
export default function AdminIdeasPage() {
  const { user, token } = useAuth(); // Make sure you get token and user
  const [ideas, setAllIdeas] = useState([]);

  useEffect(() => {
    const fetchAllIdeas = async () => {
      try {
            const API_URL = import.meta.env.VITE_API_URL;
        const response = await fetch(`${API_URL}/api/ideas/all`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error("Failed to fetch ideas");

        const data = await response.json();
        setAllIdeas(data);
      } catch (error) {
        console.error("Error fetching all ideas:", error);
      }
    };

    if (user?.isAdmin) {
      fetchAllIdeas();
    }
  }, [user, token]);

  return (
      <div>
      <h1
        className="text-xl sm:text-xl font-extrabold text-indigo-700 mb-2"
        style={{ fontSize: "2.5rem", color: "#073763" }}
      >
        My Ideas
      </h1>

      {ideas.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 text-gray-600"
          style={{
            minHeight: "400px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <FiAlertCircle size={24} color="#073763" />
          <h1 className="text-4xl sm:text-xl font-extrabold mb-2">
            You have not submitted any ideas yet.
          </h1>
        </motion.div>
      ) : (
        <motion.div
          style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          {ideas.map((idea) => (
            <motion.div
              key={idea._id}
              style={{
                border: "1px solid #ccc",
                padding: "1rem",
                borderRadius: "8px",
                width: "300px",
                boxShadow: "2px 2px 8px rgba(0,0,0,0.1)",
                margin: "1rem",
                backgroundColor: "#fff",
                position: "relative",
              }}
              whileHover={{
                scale: 1.05,
                boxShadow: "4px 4px 15px rgba(0,0,0,0.2)",
              }}
            >
              <p>
                <strong>Idea Title:</strong> {idea.ideaTitle}{" "}
                <FiFileText style={{ verticalAlign: "middle" }} />
              </p>
              <p>
                <strong>Idea Description:</strong> {idea.description}
              </p>
              <p>
                <strong>Impact:</strong> {idea.impact}
              </p>
              <p>
                <a
                  href={idea.ideaProfile}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <strong>View Idea Profile:  </strong>
                  click here
                </a>
              </p>
              <p>
                <a
                  href={idea.financialReport}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <strong>View Financial Report</strong>
                  click here 
                </a>
              </p>
              <p>
                <small>
                  Submitted on: {new Date(idea.createdAt).toLocaleDateString()}
                </small>
              </p>
            <p className="text-sm text-gray-500 mt-2">
  <strong>Submitted by:</strong> {idea.submittedBy?.firstName || "Unknown"}
</p>

            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
