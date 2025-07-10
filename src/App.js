import React, { useState, useEffect } from 'react';

// Main App component for the QuickRNG application
const App = () => {
  // State variables for minimum, maximum, and generated number
  const [min, setMin] = useState(1); // Default minimum value
  const [max, setMax] = useState(100); // Default maximum value
  const [randomNumber, setRandomNumber] = useState(null); // Stores the generated random number
  const [error, setError] = useState(''); // Stores any error messages
  // State for background gradient, allowing for dynamic changes (kept for your testing)
  const [backgroundGradient, setBackgroundGradient] = useState('from-purple-600 to-blue-500');

  // Effect to generate a random number on initial load
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { // This is line 17 in the current problem description
    generateNumber();
  }, []); // Empty dependency array means this runs once on mount

  // Function to generate a random number within the specified range
  const generateNumber = () => {
    // Clear any previous errors
    setError('');

    // Convert input values to numbers
    const numMin = parseInt(min, 10);
    const numMax = parseInt(max, 10);

    // Validate inputs
    if (isNaN(numMin) || isNaN(numMax)) {
      setError('Please enter valid numbers for min and max.');
      setRandomNumber(null);
      return;
    }

    if (numMin > numMax) {
      setError('Minimum value cannot be greater than maximum value.');
      setRandomNumber(null);
      return;
    }

    // Generate the random number
    // Math.random() generates a number between 0 (inclusive) and 1 (exclusive)
    // We scale it to the desired range and use Math.floor to get an integer
    const newRandomNumber = Math.floor(Math.random() * (numMax - numMin + 1)) + numMin;
    setRandomNumber(newRandomNumber);
  };

  // Function to change background gradient (for testing different colors)
  const changeBackground = (gradientClass) => {
    setBackgroundGradient(gradientClass);
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${backgroundGradient} flex flex-col items-center justify-center p-4 font-inter text-white`}>
      {/* App Title */}
      <h1 className="text-5xl font-extrabold mb-8 drop-shadow-lg">QuickRNG</h1>

      {/* Random Number Display Area */}
      <div className="bg-white text-blue-700 w-full max-w-sm h-48 flex items-center justify-center rounded-3xl shadow-2xl mb-8 transform transition-all duration-300 hover:scale-105 overflow-hidden px-2">
        {randomNumber !== null ? (
          // Adjust font size dynamically based on number length to prevent overflow
          <span className={`font-bold ${
            String(randomNumber).length > 7 ? 'text-5xl' :
            String(randomNumber).length > 5 ? 'text-6xl' : 'text-8xl'
          }`}>{randomNumber}</span>
        ) : (
          <span className="text-3xl text-gray-400">Generate!</span>
        )}
      </div>

      {/* Input Fields - Adjusted for symmetry and proper alignment */}
      <div className="flex justify-center space-x-4 mb-6 w-full max-w-sm">
        <input
          type="number"
          placeholder="Min"
          value={min}
          onChange={(e) => setMin(e.target.value)}
          className="w-1/2 p-4 rounded-xl bg-white bg-opacity-20 border border-white border-opacity-30 text-white placeholder-white placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 transition-all duration-200 text-center"
        />
        <input
          type="number"
          placeholder="Max"
          value={max}
          onChange={(e) => setMax(e.target.value)}
          className="w-1/2 p-4 rounded-xl bg-white bg-opacity-20 border border-white border-opacity-30 text-white placeholder-white placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 transition-all duration-200 text-center"
        />
      </div>

      {/* Error Message Display */}
      {error && (
        <p className="text-red-300 mb-4 text-center text-lg font-medium">{error}</p>
      )}

      {/* Generate Button - Now fixed to "GENERATE!" */}
      <button
        onClick={generateNumber}
        className="w-full max-w-sm bg-white text-purple-700 py-4 px-6 rounded-full text-2xl font-bold shadow-xl hover:bg-purple-100 transform transition-all duration-200 active:scale-95 focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
      >
        GENERATE!
      </button>

      {/* Background Gradient Selection (for testing) */}
      <div className="mt-8 flex flex-wrap justify-center gap-2 w-full max-w-sm">
        <button
          onClick={() => changeBackground('from-purple-600 to-blue-500')}
          className="bg-gradient-to-r from-purple-600 to-blue-500 text-white text-xs px-3 py-1 rounded-full shadow-md hover:scale-105 transition-transform"
        >
          Purple-Blue
        </button>
        <button
          onClick={() => changeBackground('from-green-500 to-teal-600')}
          className="bg-gradient-to-r from-green-500 to-teal-600 text-white text-xs px-3 py-1 rounded-full shadow-md hover:scale-105 transition-transform"
        >
          Green-Teal
        </button>
        <button
          onClick={() => changeBackground('from-red-500 to-orange-500')}
          className="bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs px-3 py-1 rounded-full shadow-md hover:scale-105 transition-transform"
        >
          Red-Orange
        </button>
        <button
          onClick={() => changeBackground('from-gray-700 to-gray-900')}
          className="bg-gradient-to-r from-gray-700 to-gray-900 text-white text-xs px-3 py-1 rounded-full shadow-md hover:scale-105 transition-transform"
        >
          Dark Gray
        </button>
      </div>
    </div>
  );
};

export default App;
