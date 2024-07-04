import { CSSProperties } from "react";

import { ClockLoader } from "react-spinners";

// STYLES
import "@/styles/spinner/spinner.css";

interface Props {
  loading: boolean;
  message?: string;
  longMessage?: boolean;
}

export function Spinner({ loading, message , longMessage}: Props) {
  const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };
  return loading ? (
    <div className="spinner-modal-overlay">
      <div className="spinner-modal-content flex flex-col">
        <ClockLoader
          color="#fff"
          loading={loading}
          cssOverride={override}
          size={90}
        />
        {message ? (
          <span
            style={{ width: longMessage ? "60%" : "100%" }}
            className="text-white text-2xl font-semibold mt-4 uppercase text-center"
          >
            {message}
          </span>
        ) : (
          ""
        )}
      </div>
    </div>
  ) : (
    ""
  );
}
