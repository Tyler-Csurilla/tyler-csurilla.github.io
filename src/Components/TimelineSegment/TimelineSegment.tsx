import React from "react";
import "./TimelineSegment.css";

export type TimelineEvent = {
  label: string;
  description?: React.ReactNode;
  link?: string;
  icon?: React.ReactNode;
  timePeriod?: string;
};

export type TimelineSegmentProps = {
  events: TimelineEvent[];
  height: number;
};

const TimelineEventDot: React.FC<{
  event: TimelineEvent;
  index: number;
  total: number;
  isActive: boolean;
  onHover: (index: number) => void;
  onClick: (index: number) => void;
  onMouseLeave: () => void;
  onClose: () => void;
}> = ({
  event,
  index,
  total,
  isActive,
  onHover,
  onClick,
  onMouseLeave,
  onClose,
}) => {
  const dotRef = React.useRef<HTMLDivElement>(null);
  const position = total > 1 ? `${(index / (total - 1)) * 100}%` : "50%";
  const isLeft = index % 2 === 0;

  return (
    <div className="timeline-event" style={{ top: position }}>
      <div className="timeline-event-dot" ref={dotRef} />
      <div
        className={`timeline-event-content ${isLeft ? "left" : "right"}`}
        onMouseEnter={() => onHover(index)}
        onMouseLeave={onMouseLeave}
      >
        {event.timePeriod && (
          <div className="timeline-tooltip-time-period">
            {isLeft ? (
              <>
                {event.timePeriod}
                {event.icon && (
                  <span className="time-icon right">{event.icon}</span>
                )}
              </>
            ) : (
              <>
                {event.icon && (
                  <span className="time-icon left">{event.icon}</span>
                )}
                {event.timePeriod}
              </>
            )}
          </div>
        )}
        <span
          className="timeline-event-title"
          style={{ color: "white" }}
          tabIndex={0}
          onClick={() => onClick(index)}
          onFocus={() => onHover(index)}
          onBlur={onMouseLeave}
          aria-expanded={isActive}
          aria-haspopup="dialog"
        >
          {event.label}
        </span>
        <div
          className={`timeline-tooltip${isActive ? " visible" : ""}`}
          role="dialog"
          aria-modal="false"
        >
          <button
            className="timeline-tooltip-close"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            aria-label="Close tooltip"
            tabIndex={isActive ? 0 : -1}
          >
            ×
          </button>

          <div className="timeline-tooltip-label">{event.label}</div>
          <div className="timeline-tooltip-desc">{event.description}</div>
          {event.link && (
            <a
              className="timeline-tooltip-link"
              href={event.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn more
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

const TimelineSegment: React.FC<TimelineSegmentProps> = ({
  events = [],
  height = 100,
}) => {
  const [clickedDotIndex, setClickedDotIndex] = React.useState<number | null>(
    null
  );
  const [hoveredDotIndex, setHoveredDotIndex] = React.useState<number | null>(
    null
  );
  const blockHeight = height > 0 ? `${height}rem` : "100rem";

  const handleDotHover = (index: number) => {
    setHoveredDotIndex(index);
    if (clickedDotIndex !== null && clickedDotIndex !== index) {
      setClickedDotIndex(null);
    }
  };

  const handleDotClick = (index: number) => {
    if (clickedDotIndex === index) {
      setClickedDotIndex(null);
    } else {
      setClickedDotIndex(index);
    }
    setHoveredDotIndex(null);
  };

  const handleDotLeave = () => {
    setHoveredDotIndex(null);
  };

  const handleClose = () => {
    setClickedDotIndex(null);
    setHoveredDotIndex(null);
  };

  const isActive = (index: number) =>
    index === hoveredDotIndex || index === clickedDotIndex;

  return (
    <div className="timeline-block" style={{ height: blockHeight }}>
      <div className="line" />
      <div className="dot start" />
      {events.map((event, i) => (
        <TimelineEventDot
          key={i}
          event={event}
          index={i}
          total={events.length}
          isActive={isActive(i)}
          onHover={handleDotHover}
          onClick={handleDotClick}
          onMouseLeave={handleDotLeave}
          onClose={handleClose}
        />
      ))}
      <div className="dot end" />
    </div>
  );
};

export default TimelineSegment;
