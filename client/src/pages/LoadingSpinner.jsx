// components/LoadingSpinner.js
import React from 'react';

export default function LoadingSpinner() {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="w-16 h-16 border-4 border-t-transparent border-white rounded-full animate-spin"> Loading...</div>
    </div>
  );
}
