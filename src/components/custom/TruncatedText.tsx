import { Tooltip } from "@mui/material";
import { useState, useRef, useEffect } from "react";
import { TruncatedTextWithTooltipProps } from "src/types/types";

const TruncatedTextWithTooltip = ({ text, maxLength }: TruncatedTextWithTooltipProps) => {
  const [isTruncated, setIsTruncated] = useState(false);
  const textRef = useRef<HTMLSpanElement>(null);

  const truncateText = (txt: string, maxLength: number) => {
    if (txt.length <= maxLength) {
      return txt;
    }
    return txt.substring(0, maxLength) + '...';
  };

  useEffect(() => {
    if (textRef.current) {
      const isOverflowing = textRef.current.offsetHeight < textRef.current.scrollHeight;
      setIsTruncated(isOverflowing);
    }
  }, [text]);

  return (
    <Tooltip
      title={text}
      open={isTruncated}
      leaveDelay={100}
    >
      <span>
        <span ref={textRef} style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {truncateText(text, maxLength)}
        </span>
      </span>
    </Tooltip>
  );
}

export default TruncatedTextWithTooltip;