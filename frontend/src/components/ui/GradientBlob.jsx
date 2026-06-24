const GradientBlob = ({ className = '', color = 'primary' }) => {
  const colors = {
    primary: 'bg-primary/10',
    purple: 'bg-primary/5',
    blue: 'bg-primary/5',
  };

  return (
    <div
      className={`
        absolute rounded-full
        ${colors[color]}
        blur-3xl
        animate-morph
        ${className}
      `}
      style={{ borderRadius: '40% 60% 60% 40% / 40% 40% 60% 60%' }}
    />
  );
};

export default GradientBlob;
