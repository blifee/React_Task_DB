import React, { useState } from 'react';
import { Send, Image, MessageCircle, CheckCircle, AlertCircle, Loader } from 'lucide-react';

export default function AIImplementation() {
  const [activeTab, setActiveTab] = useState('image');
  
  // Image Generation State
  const [imagePrompt, setImagePrompt] = useState('');
  const [generatedImage, setGeneratedImage] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);
  
  // Q&A Agent State
  const [question, setQuestion] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [qaLoading, setQaLoading] = useState(false);
  
  // Form Validation State
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    date: '',
    amount: ''
  });
  const [validationResults, setValidationResults] = useState({});
  const [validating, setValidating] = useState(false);

  // Simulate AI Image Generation
  const handleGenerateImage = async () => {
  if (!imagePrompt.trim()) {
    alert('Please enter a prompt for image generation');
    return;
  }

  setImageLoading(true);

  setTimeout(() => {
    // Use the new working placeholder service
    const placeholderImage =
      `https://placehold.co/512x512/4F46E5/FFFFFF?text=${encodeURIComponent(
        imagePrompt.substring(0, 20)
      )}`;

    setGeneratedImage({
      url: placeholderImage,
      prompt: imagePrompt,
      timestamp: new Date().toLocaleString(),
    });

    setImageLoading(false);
  }, 2000);
};

  // Simulate AI Q&A Agent
  const handleAskQuestion = async () => {
    if (!question.trim()) {
      alert('Please enter a question');
      return;
    }

    const userMessage = {
      type: 'user',
      content: question,
      timestamp: new Date().toLocaleTimeString()
    };

    setChatHistory([...chatHistory, userMessage]);
    setQuestion('');
    setQaLoading(true);

    // Simulate API call to AI Q&A service (like Claude or GPT)
    setTimeout(() => {
      const aiResponses = {
        'how to upload files': 'To upload files, you can either click the "Browse" button or drag and drop files into the designated area. The system supports multiple file uploads at once.',
        'what file types': 'The system supports various file types including PDF, DOC, DOCX, JPG, PNG, and more. Maximum file size is 10MB per file.',
        'how to delete': 'To delete a file, click the red X icon next to the file name in the uploaded files list before final submission.',
        'default': 'I understand you asked: "' + question + '". This is a demonstration of an AI-powered Q&A agent. In a real implementation, this would connect to services like Claude, ChatGPT, or custom AI models to provide contextual help and answers based on your application\'s documentation and features.'
      };

      let response = aiResponses.default;
      const lowerQuestion = question.toLowerCase();
      
      if (lowerQuestion.includes('upload') || lowerQuestion.includes('file')) {
        response = aiResponses['how to upload files'];
      } else if (lowerQuestion.includes('type') || lowerQuestion.includes('format')) {
        response = aiResponses['what file types'];
      } else if (lowerQuestion.includes('delete') || lowerQuestion.includes('remove')) {
        response = aiResponses['how to delete'];
      }

      const aiMessage = {
        type: 'ai',
        content: response,
        timestamp: new Date().toLocaleTimeString()
      };

      setChatHistory(prev => [...prev, aiMessage]);
      setQaLoading(false);
    }, 1500);
  };

  // Simulate AI Form Validation
  const handleValidateForm = async () => {
    setValidating(true);
    
    // Simulate API call to AI validation service
    setTimeout(() => {
      const results = {};
      
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      results.email = {
        valid: emailRegex.test(formData.email),
        message: emailRegex.test(formData.email) 
          ? 'Valid email format' 
          : 'Invalid email format. Please use format: user@example.com',
        suggestion: !emailRegex.test(formData.email) && formData.email 
          ? 'Did you mean: ' + formData.email.replace(/\s/g, '') + '@gmail.com?' 
          : null
      };
      
      // Phone validation
      const phoneRegex = /^\+?[\d\s\-()]{10,}$/;
      results.phone = {
        valid: phoneRegex.test(formData.phone),
        message: phoneRegex.test(formData.phone) 
          ? 'Valid phone number' 
          : 'Invalid phone format. Please use format: +1234567890',
        suggestion: !phoneRegex.test(formData.phone) && formData.phone 
          ? 'Suggested format: +' + formData.phone.replace(/\D/g, '') 
          : null
      };
      
      // Date validation
      const dateValid = formData.date && new Date(formData.date) > new Date();
      results.date = {
        valid: dateValid,
        message: dateValid 
          ? 'Valid future date' 
          : 'Please select a future date',
        suggestion: !dateValid ? 'Today is ' + new Date().toLocaleDateString() : null
      };
      
      // Amount validation
      const amountValid = formData.amount && parseFloat(formData.amount) > 0;
      results.amount = {
        valid: amountValid,
        message: amountValid 
          ? 'Valid amount' 
          : 'Please enter a positive number',
        suggestion: !amountValid && formData.amount 
          ? 'Did you mean: ' + Math.abs(parseFloat(formData.amount) || 0) 
          : null
      };
      
      setValidationResults(results);
      setValidating(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
       

        {/* Tab Navigation */}
        <div className="bg-white rounded-t-lg shadow-md">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('image')}
              className={`flex-1 px-6 py-4 font-medium transition-colors ${
                activeTab === 'image'
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Image className="inline mr-2" size={20} />
              AI Image Generation
            </button>
            <button
              onClick={() => setActiveTab('qa')}
              className={`flex-1 px-6 py-4 font-medium transition-colors ${
                activeTab === 'qa'
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <MessageCircle className="inline mr-2" size={20} />
              Q&A Help Agent
            </button>
            <button
              onClick={() => setActiveTab('validation')}
              className={`flex-1 px-6 py-4 font-medium transition-colors ${
                activeTab === 'validation'
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <CheckCircle className="inline mr-2" size={20} />
              Form Validation
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-b-lg shadow-md p-6">
          {/* AI Image Generation Tab */}
          {activeTab === 'image' && (
            <div>
              <h3 className="text-lg font-semibold mb-4">AI Image Generation & Display Widget</h3>
              <p className="text-sm text-gray-600 mb-4">
                Generate images using AI based on text descriptions. (Demo uses placeholder - integrate with DALL-E, Midjourney, or Stable Diffusion API)
              </p>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Enter Image Description
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={imagePrompt}
                    onChange={(e) => setImagePrompt(e.target.value)}
                    placeholder="e.g., A beautiful sunset over mountains"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onKeyPress={(e) => e.key === 'Enter' && handleGenerateImage()}
                  />
                  <button
                    onClick={handleGenerateImage}
                    disabled={imageLoading}
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition-colors disabled:bg-gray-400"
                  >
                    {imageLoading ? <Loader className="animate-spin" size={20} /> : 'Generate'}
                  </button>
                </div>
              </div>

              {imageLoading && (
                <div className="text-center py-12">
                  <Loader className="animate-spin mx-auto mb-4 text-blue-600" size={48} />
                  <p className="text-gray-600">Generating your image...</p>
                </div>
              )}

              {generatedImage && !imageLoading && (
                <div className="mt-6 border border-gray-200 rounded-lg p-4">
                  <img
                    src={generatedImage.url}
                    alt={generatedImage.prompt}
                    className="w-full max-w-md mx-auto rounded-lg shadow-md"
                  />
                  <div className="mt-4 text-sm text-gray-600">
                    <p><strong>Prompt:</strong> {generatedImage.prompt}</p>
                    <p><strong>Generated:</strong> {generatedImage.timestamp}</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Q&A Help Agent Tab */}
          {activeTab === 'qa' && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Contextual Q&A / Help Agent</h3>
              <p className="text-sm text-gray-600 mb-4">
                Ask questions about the application and get instant AI-powered help. (Demo simulation - integrate with Claude API, ChatGPT, or custom models)
              </p>
              
              {/* Chat History */}
              <div className="bg-gray-50 rounded-lg p-4 h-96 overflow-y-auto mb-4">
                {chatHistory.length === 0 ? (
                  <div className="text-center text-gray-400 mt-20">
                    <MessageCircle size={48} className="mx-auto mb-2" />
                    <p>Ask a question to get started</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {chatHistory.map((message, index) => (
                      <div
                        key={index}
                        className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[70%] rounded-lg p-3 ${
                            message.type === 'user'
                              ? 'bg-blue-600 text-white'
                              : 'bg-white border border-gray-200'
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <p className={`text-xs mt-1 ${message.type === 'user' ? 'text-blue-100' : 'text-gray-400'}`}>
                            {message.timestamp}
                          </p>
                        </div>
                      </div>
                    ))}
                    {qaLoading && (
                      <div className="flex justify-start">
                        <div className="bg-white border border-gray-200 rounded-lg p-3">
                          <Loader className="animate-spin text-blue-600" size={20} />
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Question Input */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Ask a question... (e.g., How to upload files?)"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onKeyPress={(e) => e.key === 'Enter' && handleAskQuestion()}
                />
                <button
                  onClick={handleAskQuestion}
                  disabled={qaLoading}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition-colors disabled:bg-gray-400"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          )}

          {/* Form Validation Tab */}
          {activeTab === 'validation' && (
            <div>
              <h3 className="text-lg font-semibold mb-4">AI-Powered Form Data Validation & Correction</h3>
              <p className="text-sm text-gray-600 mb-4">
                Enter form data and let AI validate and suggest corrections. (Demo simulation - can integrate with AI services for advanced validation)
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="text"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="user@example.com"
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                      validationResults.email?.valid === false
                        ? 'border-red-500 focus:ring-red-500'
                        : validationResults.email?.valid === true
                        ? 'border-green-500 focus:ring-green-500'
                        : 'border-gray-300 focus:ring-blue-500'
                    }`}
                  />
                  {validationResults.email && (
                    <div className={`mt-1 text-sm ${validationResults.email.valid ? 'text-green-600' : 'text-red-600'}`}>
                      {validationResults.email.valid ? <CheckCircle size={14} className="inline mr-1" /> : <AlertCircle size={14} className="inline mr-1" />}
                      {validationResults.email.message}
                      {validationResults.email.suggestion && (
                        <p className="text-blue-600 mt-1">💡 {validationResults.email.suggestion}</p>
                      )}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    placeholder="+1234567890"
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                      validationResults.phone?.valid === false
                        ? 'border-red-500 focus:ring-red-500'
                        : validationResults.phone?.valid === true
                        ? 'border-green-500 focus:ring-green-500'
                        : 'border-gray-300 focus:ring-blue-500'
                    }`}
                  />
                  {validationResults.phone && (
                    <div className={`mt-1 text-sm ${validationResults.phone.valid ? 'text-green-600' : 'text-red-600'}`}>
                      {validationResults.phone.valid ? <CheckCircle size={14} className="inline mr-1" /> : <AlertCircle size={14} className="inline mr-1" />}
                      {validationResults.phone.message}
                      {validationResults.phone.suggestion && (
                        <p className="text-blue-600 mt-1">💡 {validationResults.phone.suggestion}</p>
                      )}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                      validationResults.date?.valid === false
                        ? 'border-red-500 focus:ring-red-500'
                        : validationResults.date?.valid === true
                        ? 'border-green-500 focus:ring-green-500'
                        : 'border-gray-300 focus:ring-blue-500'
                    }`}
                  />
                  {validationResults.date && (
                    <div className={`mt-1 text-sm ${validationResults.date.valid ? 'text-green-600' : 'text-red-600'}`}>
                      {validationResults.date.valid ? <CheckCircle size={14} className="inline mr-1" /> : <AlertCircle size={14} className="inline mr-1" />}
                      {validationResults.date.message}
                      {validationResults.date.suggestion && (
                        <p className="text-blue-600 mt-1">💡 {validationResults.date.suggestion}</p>
                      )}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Amount
                  </label>
                  <input
                    type="number"
                    value={formData.amount}
                    onChange={(e) => setFormData({...formData, amount: e.target.value})}
                    placeholder="0.00"
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                      validationResults.amount?.valid === false
                        ? 'border-red-500 focus:ring-red-500'
                        : validationResults.amount?.valid === true
                        ? 'border-green-500 focus:ring-green-500'
                        : 'border-gray-300 focus:ring-blue-500'
                    }`}
                  />
                  {validationResults.amount && (
                    <div className={`mt-1 text-sm ${validationResults.amount.valid ? 'text-green-600' : 'text-red-600'}`}>
                      {validationResults.amount.valid ? <CheckCircle size={14} className="inline mr-1" /> : <AlertCircle size={14} className="inline mr-1" />}
                      {validationResults.amount.message}
                      {validationResults.amount.suggestion && (
                        <p className="text-blue-600 mt-1">💡 {validationResults.amount.suggestion}</p>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <button
                onClick={handleValidateForm}
                disabled={validating}
                className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition-colors disabled:bg-gray-400"
              >
                {validating ? <Loader className="animate-spin inline mr-2" size={20} /> : <CheckCircle className="inline mr-2" size={20} />}
                {validating ? 'Validating...' : 'Validate with AI'}
              </button>
            </div>
          )}
        </div>

       
  );

}
