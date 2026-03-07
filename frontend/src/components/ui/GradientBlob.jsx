const GradientBlob = ({ className = '', color = 'primary' }) => {
  const colors = {
    primary: 'from-primary-600/30 to-indigo-600/30',
    purple: 'from-purple-600/30 to-pink-600/30',
    blue: 'from-blue-600/30 to-cyan-600/30',
  };

  return (
    <div
      className={`
        absolute rounded-full
        bg-gradient-to-br ${colors[color]}
        blur-3xl
        animate-blob
        ${className}
      `}
    />
  );
};

export default GradientBlob;
