import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { capitalizeFirstLetter } from "../service/utils";

const VISIBLE_MS = 2500;

function TeamToast() {
  const lastTeamAction = useSelector(
    (state) => state.globalProps.lastTeamAction
  );
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!lastTeamAction) return;
    setVisible(true);
    const timer = setTimeout(() => setVisible(false), VISIBLE_MS);
    return () => clearTimeout(timer);
  }, [lastTeamAction]);

  if (!lastTeamAction) return null;

  const { type, name } = lastTeamAction;
  const verb = type === "add" ? "added to" : "removed from";
  const bg = type === "add" ? "bg-success" : "bg-secondary";

  return (
    <div
      className="toast-container position-fixed bottom-0 end-0 p-3"
      style={{ zIndex: 1100, pointerEvents: "none" }}
      aria-live="polite"
      aria-atomic="true"
    >
      <div
        className={`toast text-white ${bg} ${visible ? "show" : "hide"}`}
        role="status"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(10px)",
          transition: "opacity 200ms ease, transform 200ms ease",
        }}
      >
        <div className="toast-body">
          <strong>{capitalizeFirstLetter(name)}</strong> {verb} your team
        </div>
      </div>
    </div>
  );
}

export default TeamToast;
