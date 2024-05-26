const Error = ({ error }) => {
  return (
    <div className="border border-red-600 mb-2 text-red-500">
      <p>{error}</p>
    </div>
  );
};

export default Error;
