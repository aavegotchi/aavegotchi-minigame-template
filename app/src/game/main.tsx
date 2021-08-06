import Phaser from "phaser";
import { useState, useEffect } from "react";
import { IonPhaser, GameInstance } from "@ion-phaser/react";
import { useWeb3 } from "web3/context";
import { Redirect } from "react-router";
import Scenes from "./scenes";
import io, { Socket } from "socket.io-client";
import { AavegotchiObject } from "types";
import { useDiamondCall } from "web3/actions";

const Main = () => {
  const {
    state: { usersAavegotchis, selectedAavegotchiIndex, provider },
  } = useWeb3();
  const [initialised, setInitialised] = useState(true);
  const [config, setConfig] = useState<GameInstance>();

  const startGame = async (socket: Socket, selectedGotchi: AavegotchiObject) => {
    let width = window.innerWidth;
    let height = width / 1.778;

    if (height > window.innerHeight) {
      height = window.innerHeight;
      width = height * 1.778;
    }

    if (!selectedGotchi.svg) {
      try {
        if (!provider) throw "Not connected to web3";
        const svg = await useDiamondCall<string>(provider, {name: "getAavegotchiSvg", parameters: [selectedGotchi.id]});
        selectedGotchi.svg = svg;
      } catch (err) {
        console.error(err);
      }
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
            socket
          });
        },
      },
    });
  }

  useEffect(() => {
    if (usersAavegotchis) {
      // Socket is called here so we can take advantage of the useEffect hook to disconnect upon leaving the game screen
      const socket = io(process.env.REACT_APP_SERVER_PORT || 'http://localhost:8080');
      const selectedGotchi = usersAavegotchis[selectedAavegotchiIndex];
      
      startGame(socket, selectedGotchi)

      return () => {
        socket.emit("handleDisconnect");
      };
    }
  }, []);

  if (!usersAavegotchis) {
    return <Redirect to="/" />;
  }

  return <IonPhaser initialize={initialised} game={config} id="phaser-app" />;
};

export default Main;
