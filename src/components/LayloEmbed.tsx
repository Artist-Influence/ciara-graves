import { siteConfig } from "@/config/siteConfig";

interface LayloEmbedProps {
  dropId?: string;
  height?: number;
  maxWidth?: number;
  className?: string;
  title?: string;
  embedUrl?: string;
  color?: string;
  customTitle?: string;
}

const LayloEmbed = ({
  dropId,
  height = 200,
  maxWidth = 480,
  className = "",
  title = "Sign up for drops",
  embedUrl,
  color = "d3113a",
  customTitle = "Enter The Signal",
}: LayloEmbedProps) => {
  const resolvedDropId = dropId || siteConfig.laylo?.dropId || "QmzWS";
  const resolvedUrl =
    embedUrl ||
    `https://embed.laylo.com?dropId=${resolvedDropId}&color=${color}&minimal=false&theme=dark&background=solid&customTitle=${encodeURIComponent(customTitle)}`;

  const iframeId = `laylo-drop-${resolvedDropId}`;

  return (
    <div
      className={`mx-auto w-full ${className}`}
      style={{
        maxWidth: `${maxWidth}px`,
        minHeight: `${height}px`,
      }}
    >
        <iframe
        id={iframeId}
        title={title}
        src={resolvedUrl}
        frameBorder={0}
        scrolling="no"
        allow="web-share"
          allowTransparency={true}
        style={{
          width: "1px",
          minWidth: "100%",
          maxWidth: "1000px",
          border: 0,
          display: "block",
        }}
      />
    </div>
  );
};

export default LayloEmbed;
