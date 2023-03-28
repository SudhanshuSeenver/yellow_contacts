import "./panel.css";

function Panel({ children, className, ...props }) {
  return (
    <div className={`panel_container ${className}`} {...props}>
      {children}
    </div>
  );
}

export default Panel;
