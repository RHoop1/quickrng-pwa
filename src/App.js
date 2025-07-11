import React, { useState, useEffect } from 'react';

function App() {
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(100);
  const [randomNumber, setRandomNumber] = useState(null);
  const [error, setError] = useState('');

  // Function to generate a random number
  const generateRandomNumber = () => {
    setError(''); // Clear previous errors
    const minNum = parseInt(min);
    const maxNum = parseInt(max);

    if (isNaN(minNum) || isNaN(maxNum)) {
      setError('Please enter valid numbers for both Min and Max.');
      setRandomNumber(null);
      return;
    }

    if (minNum >= maxNum) {
      setError('Max value must be greater than Min value.');
      setRandomNumber(null);
      return;
    }

    // Generate random number within the specified range (inclusive)
    const num = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
    setRandomNumber(num);
  };

  // Effect to load AdSense ads when the component mounts
  useEffect(() => {
    try {
      if (window.adsbygoogle && window.adsbygoogle.push) {
        window.adsbygoogle.push({});
      }
    } catch (e) {
      console.error("AdSense push error:", e);
    }
  }, []); // Empty dependency array means this runs once on mount

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-700 to-indigo-900 text-white flex flex-col items-center justify-center p-4 font-inter relative">
      {/* Main Application Content Box */}
      <div className="bg-purple-800 bg-opacity-70 backdrop-blur-md p-8 rounded-2xl shadow-xl max-w-md w-full text-center border border-purple-600">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-purple-200 drop-shadow-lg">
          QuickRNG
        </h1>

        {/* Input Fields */}
        <div className="flex justify-center gap-4 mb-6">
          <input
            type="number"
            placeholder="Min"
            value={min}
            onChange={(e) => setMin(e.target.value)}
            className="w-1/2 p-3 rounded-lg bg-purple-900 bg-opacity-50 border border-purple-600 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400 transition duration-200"
          />
          <input
            type="number"
            placeholder="Max"
            value={max}
            onChange={(e) => setMax(e.target.value)}
            className="w-1/2 p-3 rounded-lg bg-purple-900 bg-opacity-50 border border-purple-600 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400 transition duration-200"
          />
        </div>

        {/* Error Message */}
        {error && (
          <p className="text-red-300 mb-4 text-sm font-medium">{error}</p>
        )}

        {/* Generate Button */}
        <button
          onClick={generateRandomNumber}
          className="w-full bg-purple-600 hover:bg-purple-700 active:bg-purple-800 text-white font-bold py-3 px-6 rounded-lg shadow-lg transform transition duration-150 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-purple-800"
        >
          Generate
        </button>

        {/* Display Result */}
        {randomNumber !== null && (
          <p className="mt-8 text-5xl md:text-7xl font-extrabold text-purple-300 animate-fade-in-up drop-shadow-lg">
            {randomNumber}
          </p>
        )}

        {/* AdSense Banner */}
        <div className="mt-8 w-full max-w-sm text-center">
          <ins className="adsbygoogle"
               style={{ display: 'block' }}
               data-ad-client="ca-pub-4901144288089010"
               data-ad-slot="YOUR_AD_SLOT_ID" // Replace with your actual ad slot ID
               data-ad-format="auto"
               data-full-width-responsive="true"></ins>
          {/* The AdSense push is now handled in a useEffect for better control */}
        </div>
      </div>
    </div>
  );
}

export default App;
