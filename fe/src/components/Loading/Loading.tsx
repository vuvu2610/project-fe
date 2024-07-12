function Loading() {
  return (
    <div className="backdrop flex justify-center items-center">
      <div className="loader flex items-center justify-center">
        <div className="dot bg-white m-2.5 animate-dot1"></div>
        <div className="dot bg-white m-2.5 animate-dot2"></div>
        <div className="dot bg-white m-2.5 animate-dot3"></div>
        <div className="dot bg-white m-2.5 animate-dot4"></div>
        <div className="dot bg-white m-2.5 animate-dot5"></div>
      </div>
    </div>
  );
}

export default Loading;
