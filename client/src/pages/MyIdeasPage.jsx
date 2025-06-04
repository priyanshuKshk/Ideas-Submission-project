import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import { FiFileText, FiAlertCircle, FiDownload } from "react-icons/fi";
import jsPDF from "jspdf";
function MyIdeasPage() {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');

    fetch(
      //'http://localhost:3001/api/my-ideas'
      "https://ideas-submission-project-1.onrender.com/api/my-ideas"
      , {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setIdeas(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching ideas:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading your ideas...</div>;
 const exportIdeaPDF = (idea) => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text(idea.ideaTitle, 10, 20);
    doc.setFontSize(12);
    doc.text(`Submitted By: ${idea.submittedBy}`, 10, 30);
    doc.text(`Description: ${idea.description}`, 10, 40);
    doc.text(`Impact: ${idea.impact}`, 10, 50);
    doc.text(`Submitted On: ${new Date(idea.createdAt).toLocaleDateString()}`, 10, 60);
    doc.save(`${idea.ideaTitle}.pdf`);
  };
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
          style={{minHeight:"400px", justifyContent: "center", alignItems: "center"}}
        >
          <FiAlertCircle size={24} color="#073763" />
          <h1
        className="text-4xl sm:text-xl font-extrabold mb-2"
      
      >
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
              whileHover={{ scale: 1.05, boxShadow: "4px 4px 15px rgba(0,0,0,0.2)" }}
            >
              <p>
                <strong>Idea Title:</strong> {idea.ideaTitle} <FiFileText style={{ verticalAlign: "middle" }} />
              </p>
              <p>
                <strong>Idea Description:</strong> {idea.description}
              </p>
              <p>
                <strong>Impact:</strong> {idea.impact}
              </p>
              <p>
                <a href={idea.ideaProfile} target="_blank" rel="noopener noreferrer">
                  <strong>View Idea Profile</strong>
                </a>
              </p>
              <p>
                <a href={idea.financialReport} target="_blank" rel="noopener noreferrer">
                  <strong>View Financial Report</strong>
                </a>
              </p>
              <p>
                <small>Submitted on: {new Date(idea.createdAt).toLocaleDateString()}</small>
              </p>

              <button
                onClick={() => exportIdeaPDF(idea)}
                style={{
                  position: "absolute",
                  bottom: "10px",
                  right: "10px",
                  backgroundColor: "#073763",
                  color: "white",
                  border: "none",
                  padding: "6px 10px",
                  borderRadius: "4px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}
                aria-label={`Download PDF for ${idea.ideaTitle}`}
              >
                <FiDownload size={18} />
                PDF
              </button>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}

export default MyIdeasPage;
