export default function PageHeading({ head, title, description, children }) {
  const heading = head || title || "Gomzi Supplement";
  return (
    <header className="site-page-heading">
      <div className="site-container">
        <h1>{heading}</h1>
        {description && <p>{description}</p>}
        {children}
      </div>
    </header>
  );
}
