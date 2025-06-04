// IdeasPage.jsx
import React, { useEffect, useState } from 'react';

const AllIdeasPage = () => {
  const [ideas, setIdeas] = useState([]);

  useEffect(() => {
    // Mock fetching ideas – replace with API call
    const savedIdeas = JSON.parse(localStorage.getItem('ideas')) || [];
    setIdeas(savedIdeas);
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">My Submitted Ideas</h1>
      {ideas.length === 0 ? (
        <p className="text-gray-500">You haven't submitted any ideas yet.</p>
      ) : (
        <div className="space-y-4">
          {ideas.map((idea, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg p-4 shadow-sm bg-white"
            >
              <h2 className="text-xl font-semibold">{idea.title}</h2>
              <p className="text-gray-600 mt-1">{idea.description}</p>
              <p className="text-sm text-gray-400 mt-2">
                Submitted on: {new Date(idea.date).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllIdeasPage;
