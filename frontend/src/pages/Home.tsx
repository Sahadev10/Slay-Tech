import React, { useState } from 'react';
import { Wand2, Save, Trash2 } from 'lucide-react';

const Home = () => {
  const [generatedDesign, setGeneratedDesign] = useState<string | null>(null);
  const [savedDesigns, setSavedDesigns] = useState<string[]>([]);

  const generateNewDesign = () => {
    // Simulating design generation with placeholder images
    const designs = [
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f",
      "https://images.unsplash.com/photo-1554412933-514a83d2f3c8",
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d"
    ];
    setGeneratedDesign(designs[Math.floor(Math.random() * designs.length)]);
  };

  const saveDesign = () => {
    if (generatedDesign && !savedDesigns.includes(generatedDesign)) {
      setSavedDesigns([...savedDesigns, generatedDesign]);
    }
  };

  const deleteDesign = (designToDelete: string) => {
    setSavedDesigns(savedDesigns.filter(design => design !== designToDelete));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-purple-600 mb-4">Design Studio</h1>
        <button
          onClick={generateNewDesign}
          className="btn-primary flex items-center justify-center space-x-2 mx-auto"
        >
          <Wand2 className="h-5 w-5" />
          <span>Generate New Design</span>
        </button>
      </div>

      {generatedDesign && (
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Current Design</h2>
          <div className="bg-white p-4 rounded-xl shadow-md">
            <img
              src={generatedDesign}
              alt="Generated design"
              className="w-full h-96 object-cover rounded-lg"
            />
            <div className="mt-4 flex justify-center space-x-4">
              <button
                onClick={saveDesign}
                className="btn-secondary flex items-center space-x-2"
              >
                <Save className="h-5 w-5" />
                <span>Save Design</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <div>
        <h2 className="text-2xl font-semibold mb-4">Saved Designs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedDesigns.map((design, index) => (
            <div key={index} className="bg-white p-4 rounded-xl shadow-md">
              <img
                src={design}
                alt={`Saved design ${index + 1}`}
                className="w-full h-64 object-cover rounded-lg"
              />
              <button
                onClick={() => deleteDesign(design)}
                className="mt-4 btn-danger flex items-center space-x-2 mx-auto"
              >
                <Trash2 className="h-5 w-5" />
                <span>Delete</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;