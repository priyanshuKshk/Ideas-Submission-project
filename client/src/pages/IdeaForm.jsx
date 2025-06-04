import { FileText, Icon } from "lucide-react";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
// import generateToken from "../../../server/utils/generateToken";
export default function IdeaForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const navigate = useNavigate();
  const [fileInput, setFileInput] = useState();
  const [formData, SetFormData] = useState({
    ideaTitle: "",
    description: "",
    ideaProfile: null,
    impact: "",
    financialReport: null,
  });
const handleChange = (e) => {
  const { name, value, files } = e.target;
  SetFormData({
    ...formData,
    [name]: name === "ideaProfile" || name === "financialReport"
      ? files[0]
      : value,
  });
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key !== "ideaProfile" && key !== "financialReport") {
        if (value) data.append(key, value);
  } else {
    data.append(key, value);
  }
    });
    if (fileInput) {
      data.append("IdeaProfile", fileInput);
    }
    if (fileInput) {
      data.append("FinancialReport", fileInput);
    }
      const token = localStorage.getItem("token");
const userId = localStorage.getItem("userId");
    try {


      const response = await fetch(
        `${API_URL}/submit-idea` 
        , {
        method: "POST",
         headers: {
      Authorization: `Bearer ${token}`, // ✅ add this line!
    },
        body: data,
      });
      if (response.ok) {
        navigate("/my-ideas");

      }else{
        const errorText =await response.text();
        alert("login to submit idea");

      }
    } catch (error) {
console.error("submit failed:" , error);
alert("idea is not submitted");


    }
  const newIdea = {
  ideaTitle: formData.ideaTitle,
  description: formData.description,
  ideaProfile: formData.ideaProfile,
  impact: formData.impact,
  financialReport: formData.financialReport,
  date: new Date().toISOString(),
};


    // ✅ Save to localStorage
    const existingIdeas = JSON.parse(localStorage.getItem("ideas")) || [];
    localStorage.setItem("ideas", JSON.stringify([...existingIdeas, newIdea]));

    // Clear form
  SetFormData({
  ideaTitle: "",
  description: "",
  ideaProfile: null,
  impact: "",
  financialReport: null,
});
setSubmitted(true);
  //  Optionally, redirect or show success message
    setTimeout(() => {
      setSubmitted(false);
      navigate("/my-ideas");
    }, 2000);

  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center justify-center">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-xl">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Submit Your Idea 💡
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          { [
 { label: "Idea Title", name: "ideaTitle", type: "text", Icon: FileText },
  { label: "Description", name: "description", type: "textarea", Icon: FileText },

  { label: "Impact", name: "impact", type: "text", Icon: FileText },

].map(({label,name,type,Icon})=>(
  <div key={name}>
              <label className="text-gray-900 mb-2 flex items-center gap-2">
                <Icon className="h-5 w-5 text-blue-700" />
                {label}
              </label>
              <input
                type={type}
                name={name}
                value={formData[name]}
              placeholder={`Enter your ${label.toLowerCase()}`}

                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
))}
  <div>
            <label className="block text-gray-900 mb-2">Upload Idea Profile (PDF/JPG/PNG)</label>
            <input
              type="file"
              name="ideaProfile"
              accept=".pdf,.jpg,.png"
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white"
            />
          </div>
            <div>
            <label className="block text-gray-900 mb-2">Upload Financial Report (PDF/JPG/PNG)</label>
            <input
              type="file"
              name="financialReport"
              accept=".pdf,.jpg,.png"
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white"
            />
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
          >
            Submit Idea
          </motion.button>

          {submitted && (
            <div className="text-center mt-4">
              <p className="text-green-600 mb-2">
                🎉 Idea submitted successfully!
              </p>
              <button
                onClick={() => navigate("/ideas")} // or use <Link to="/ideas" />
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
              >
                View My Ideas
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
