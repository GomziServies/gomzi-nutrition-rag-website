export default function Wavyheading({ text1, text2, text3 }) {
  return <div className="mb-6 sm:mb-8">
    <h2 className="font-toma text-2xl sm:text-3xl text-text leading-tight tracking-tight">
      {text1} <span className="text-primary">{text2}</span>{text3}
    </h2>
  </div>;
}
