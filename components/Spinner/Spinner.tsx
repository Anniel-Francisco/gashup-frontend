import { CSSProperties } from "react";

import { ClockLoader } from "react-spinners";

// STYLES
import "@/styles/spinner/spinner.css";

interface Props {
  loading: boolean;
}

export function Spinner({ loading }: Props) {
  const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };
  return loading ? (
    <div className="spinner-modal-overlay">
      <div className="spinner-modal-content">
        <ClockLoader
          color="#fff"
          loading={loading}
          cssOverride={override}
          size={90}
        />
      </div>
    </div>
  ) : (
    ""
  );
}
