import React, { useState, useEffect } from 'react';

function App() {
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(100);
  const [randomNumber, setRandomNumber] = useState(null);
  const [error, setError] = useState('');
  const [showAboutModal, setShowAboutModal] = useState(false); // State for modal visibility

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

  // Effect to load AdSense ads when the component mounts or updates
  // This ensures ads are loaded after the AdSense script in index.html is available
  useEffect(() => {
    try {
      if (window.adsbygoogle && window.adsbygoogle.push) {
        // Push an empty object to load Auto ads or a specific ad unit
        // For a specific ad unit, you might need to push an object with its details
        window.adsbygoogle.push({});
      }
    } catch (e) {
      console.error("AdSense push error:", e);
    }
  }, [showAboutModal]); // Re-run when modal state changes to potentially refresh ads if needed

  return (
    // Main container: Ensure it fills screen, centers content horizontally, and allows vertical scroll if needed.
    // Removed 'justify-center' from the main container to prevent content from being pushed off-screen
    // if it exceeds viewport height on mobile. Added 'pt-8' and 'pb-16' for consistent padding.
    <div className="min-h-screen bg-gradient-to-br from-purple-700 to-indigo-900 text-white flex flex-col items-center p-4 font-inter relative pt-8 pb-16">
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

      {/* About Button - Positioned absolutely at the bottom */}
      <button
        onClick={() => setShowAboutModal(true)}
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-purple-600 hover:bg-purple-700 active:bg-purple-800 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-150 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-purple-800 text-sm"
      >
        About
      </button>

      {/* About Modal - Fixed position to cover the screen */}
      {showAboutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50">
          <div className="bg-purple-800 bg-opacity-90 backdrop-blur-md p-6 rounded-2xl shadow-2xl max-w-sm w-full text-center border border-purple-600 relative">
            <h2 className="text-2xl font-bold mb-4 text-purple-200">About QuickRNG</h2>
            <p className="text-purple-100 mb-4 text-sm md:text-base">
              Welcome to the world's fastest RNG application!
              If you're using mobile, you can add it to your Home Screen for quick access.
            </p>
            <p className="text-purple-100 mb-6 text-sm md:text-base">
              If you have any questions, comments, or suggestions, please email me at{' '}
              <a href="mailto:rynoman08@yahoo.com" className="text-purple-300 hover:text-purple-400 underline">
                rynoman08@yahoo.com
              </a>.
            </p>
            <button
              onClick={() => setShowAboutModal(false)}
              className="bg-purple-600 hover:bg-purple-700 active:bg-purple-800 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-150 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-purple-800 text-sm"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
