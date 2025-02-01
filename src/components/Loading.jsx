

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col items-center">
        {/* Spinner */}
        <div className="w-16 h-16 border-t-4 border-b-4 border-blue-500 rounded-full animate-spin"></div>
        {/* Loading Text */}
        <p className="mt-4 text-lg font-semibold text-gray-600">Loading...</p>
      </div>
    </div>
  );
};

export default Loading;