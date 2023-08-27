import { useState } from "react";

const InstallButton = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  const handleBeforeInstallPrompt = (event) => {
    event.preventDefault();
    setDeferredPrompt(event);
  };
  
  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();

      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted to install the app");
        } else {
          console.log("User refused to install the app");
        }

        setDeferredPrompt(null);
      });
    }
  };

  window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

  return (<button className="btn btn-warning" onClick={handleInstallClick}>Install the app</button>);
};

export default InstallButton;
