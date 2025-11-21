import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const DeviceContext = createContext();

export const DeviceProvider = ({ children }) => {
  const [devices, setDevices] = useState([]);
  const [rooms, setRooms] = useState([
    "Living Room",
    "Bedroom",
    "Kitchen",
    "Office",
  ]);
  const [selectedRoom, setSelectedRoom] = useState("Living Room");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDevices();
    loadRooms();
  }, []);

  const loadDevices = async () => {
    try {
      const storedDevices = await AsyncStorage.getItem("devices");
      if (storedDevices) {
        setDevices(JSON.parse(storedDevices));
      }
    } catch (error) {
      console.error("Error loading devices:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadRooms = async () => {
    try {
      const storedRooms = await AsyncStorage.getItem("rooms");
      if (storedRooms) {
        setRooms(JSON.parse(storedRooms));
      }
    } catch (error) {
      console.error("Error loading rooms:", error);
    }
  };

  const saveDevices = async (newDevices) => {
    try {
      await AsyncStorage.setItem("devices", JSON.stringify(newDevices));
      setDevices(newDevices);
    } catch (error) {
      console.error("Error saving devices:", error);
    }
  };

  const saveRooms = async (newRooms) => {
    try {
      await AsyncStorage.setItem("rooms", JSON.stringify(newRooms));
      setRooms(newRooms);
    } catch (error) {
      console.error("Error saving rooms:", error);
    }
  };

  const addDevice = (device) => {
    const newDevice = {
      id: Date.now().toString(),
      ...device,
      connected: false,
      lastUsed: new Date().toISOString(),
    };
    saveDevices([...devices, newDevice]);
  };

  const removeDevice = (deviceId) => {
    saveDevices(devices.filter((d) => d.id !== deviceId));
  };

  const updateDevice = (deviceId, updates) => {
    saveDevices(
      devices.map((d) => (d.id === deviceId ? { ...d, ...updates } : d))
    );
  };

  const addRoom = (roomName) => {
    if (!rooms.includes(roomName)) {
      saveRooms([...rooms, roomName]);
    }
  };

  const removeRoom = (roomName) => {
    saveRooms(rooms.filter((r) => r !== roomName));
  };

  return (
    <DeviceContext.Provider
      value={{
        devices,
        rooms,
        selectedRoom,
        setSelectedRoom,
        addDevice,
        removeDevice,
        updateDevice,
        addRoom,
        removeRoom,
        loading,
      }}
    >
      {children}
    </DeviceContext.Provider>
  );
};

export const useDevices = () => {
  const context = useContext(DeviceContext);
  if (!context) {
    throw new Error("useDevices must be used within DeviceProvider");
  }
  return context;
};
