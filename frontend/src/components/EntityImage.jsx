import { useEffect, useState } from "react";
import { getEntityImage, getInitials } from "../services/brandAssets";
import { formatEntityText } from "../services/textFormatter";

export default function EntityImage({
  entity,
  name,
  alt,
  className = "",
  fallbackTag = "span",
  fallbackClassName = "",
  fallbackText,
}) {
  const imageSrc = getEntityImage(entity);
  const resolvedName = formatEntityText(name || entity?.name || alt || "");
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);
  }, [imageSrc]);

  if (imageSrc && !hasError) {
    return (
      <img
        className={className || undefined}
        src={imageSrc}
        alt={alt || resolvedName || "Gorsel"}
        loading="lazy"
        referrerPolicy="no-referrer"
        onError={() => setHasError(true)}
      />
    );
  }

  const FallbackTag = fallbackTag;
  return (
    <FallbackTag className={fallbackClassName || undefined}>
      {fallbackText || getInitials(resolvedName) || "TR"}
    </FallbackTag>
  );
}
