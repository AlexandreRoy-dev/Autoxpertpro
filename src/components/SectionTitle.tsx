export function SectionTitle({
  tag,
  title,
  highlight,
  center = false,
  animation = "1",
}: {
  tag: string;
  title: string;
  highlight?: string;
  center?: boolean;
  animation?: "1" | "2";
}) {
  return (
    <div className={`section-title ${center ? "text-center" : "text-left"} sec-title-animation animation-style${animation}`}>
      <div className="section-title__tagline-box">
        <div className="section-title__tagline-border">
          <div className="section-title__shape-1">
            <i className="section-title__circle" />
          </div>
        </div>
        <h6 className="section-title__tagline">{tag}</h6>
        <div className="section-title__tagline-border">
          <div className="section-title__shape-2">
            <i className="section-title__circle" />
          </div>
        </div>
      </div>
      <h2 className="section-title__title title-animation">
        {title}
        {highlight ? <span> {highlight}</span> : null}
      </h2>
    </div>
  );
}
