import { useEffect, useState } from "react";

function InstallButton() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault();
      setDeferredPrompt(event);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleInstallClick = () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === "accepted") {
        console.log("User accepted to install the app");
      } else {
        console.log("User refused to install the app");
      }
      setDeferredPrompt(null);
    });
  };

  if (!deferredPrompt) return null;

  return (
    <button className="btn btn-warning" onClick={handleInstallClick}>
      Install the app
    </button>
  );
}

export default InstallButton;
