import "./index.css";

export default function Component({ title, description }) {
  return (
    <div className="body">
      <h1 className="title">{title}</h1>
      <h3 className="description">{description}</h3>
    </div>
  );
}
