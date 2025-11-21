import WiFiService from "../services/WiFiService";
import BluetoothService from "../services/BluetoothService";
import IRService from "../services/IRService";

export const sendDeviceCommand = (device, command) => {
  console.log(`Sending ${command} to ${device.name} via ${device.connection}`);

  switch (device.connection) {
    case "wifi":
      return WiFiService.sendCommand(device, command);
    case "bluetooth":
      return BluetoothService.sendCommand(device, command);
    case "ir":
      return IRService.sendCommand(device, command);
    default:
      console.error("Unknown connection type");
      return Promise.reject(new Error("Unknown connection type"));
  }
};

export const COMMANDS = {
  POWER: "power",
  VOLUME_UP: "volume_up",
  VOLUME_DOWN: "volume_down",
  MUTE: "mute",
  UP: "up",
  DOWN: "down",
  LEFT: "left",
  RIGHT: "right",
  OK: "ok",
  BACK: "back",
  HOME: "home",
  MENU: "menu",
  PLAY: "play",
  PAUSE: "pause",
  NEXT: "next",
  PREVIOUS: "previous",
};
    