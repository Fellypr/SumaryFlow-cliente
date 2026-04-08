"use client";

import styles from "./FlowchartButton.module.css";

interface FlowchartButtonProps {
  label?: string;
  onClick?: () => void;
}

export default function FlowchartButton({
  label = "Open Flowchart",
  onClick,
}: FlowchartButtonProps) {
  return (
    <button className={styles.btn} onClick={onClick} type="button">
      <svg
        className={styles.icon}
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Start node */}
        <rect
          className={`${styles.node} ${styles.nodeStart}`}
          x="8" y="1" width="8" height="5" rx="2.5"
        />
        {/* Arrow 1 */}
        <line
          className={styles.arrow}
          x1="12" y1="6" x2="12" y2="9.5"
          strokeLinecap="round"
        />
        {/* Diamond decision */}
        <rect
          className={`${styles.node} ${styles.diamond}`}
          x="8.8" y="9.5" width="6.4" height="6.4" rx="1"
          transform="rotate(45 12 12.7)"
        />
        {/* Arrow 2 */}
        <line
          className={styles.arrow}
          x1="12" y1="16.5" x2="12" y2="19"
          strokeLinecap="round"
        />
        {/* End node */}
        <rect
          className={`${styles.node} ${styles.nodeEnd}`}
          x="8" y="19" width="8" height="4" rx="2"
        />
        {/* Side branch */}
        <line
          className={styles.arrow}
          x1="15.5" y1="12.7" x2="20" y2="12.7"
          strokeLinecap="round"
        />
        <circle className={styles.dot} cx="20.5" cy="12.7" r="1.5" />
      </svg>

      <span className={styles.label}>{label}</span>
    </button>
  );
}
