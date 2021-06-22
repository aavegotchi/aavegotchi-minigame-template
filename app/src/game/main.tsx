import Phaser from "phaser";
import { useState, useEffect } from "react";
import { IonPhaser, GameInstance } from "@ion-phaser/react";
import { useWeb3 } from "web3";
import { Redirect } from "react-router";
import Scenes from "./scenes";
import io from "socket.io-client";

const Main = () => {
  const {
    state: { selectedGotchi },
  } = useWeb3();
  const [initialised, setInitialised] = useState(true);
  const [config, setConfig] = useState<GameInstance>();

  useEffect(() => {
    if (selectedGotchi) {
      // Socket is called here so we can take advantage of the useEffect hook to disconnect upon leaving the game screen
      const socket = io(process.env.REACT_APP_SERVER_PORT || 'http://localhost:443');

      let width = window.innerWidth;
      let height = width / 1.778;

      if (height > window.innerHeight) {
        height = window.innerHeight;
        width = height * 1.778;
      }

      setConfig({
        type: Phaser.AUTO,
        physics: {
          default: "arcade",
          arcade: {
            gravity: { y: 0 },
            debug: process.env.NODE_ENV === "development",
          },
        },
        scale: {
          mode: Phaser.Scale.NONE,
          width,
          height,
        },
        scene: Scenes,
        fps: {
          target: 60,
        },
        callbacks: {
          preBoot: (game) => {
            // Makes sure the game doesnt create another game on rerender
            setInitialised(false);
            game.registry.merge({
              selectedGotchi,
              socket: socket
            });
          },
        },
      });

      return () => {
        socket.emit("handleDisconnect");
      };
    }
  }, []);

  if (!selectedGotchi) {
    return <Redirect to="/" />;
  }

  return <IonPhaser initialize={initialised} game={config} id="phaser-app" />;
};

export default Main;
