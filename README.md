# RemoteApp Universal

A comprehensive React Native app for controlling WiFi, Bluetooth, and Infrared (IR) devices from a single interface.

## Features

- 📱 **Multi-Protocol Support**: Control devices via WiFi, Bluetooth, and Infrared
- 🏠 **Room Management**: Organize devices by rooms
- 🎮 **Universal Remote**: Full-featured remote control interface
- 💾 **Persistent Storage**: All devices and settings are saved
- 🔍 **Device Discovery**: Scan and auto-detect compatible devices
- 🎨 **Modern UI**: Beautiful dark theme with intuitive navigation

## Supported Device Types

- 📺 Smart TVs
- ❄️ Air Conditioners
- 🎥 Projectors
- 🔊 Speakers/Soundbars

## Installation

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI (for easier development)
- Android Studio / Xcode (for native builds)

### Setup

1. Clone the repository:

```bash
git clone https://github.com/UzairRehman4/RemoteApp.git
cd RemoteApp
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Start the development server:

```bash
npm start
# or
expo start
```

4. Run on device:

```bash
# Android
npm run android

# iOS
npm run ios
```

## Project Structure

```
RemoteApp/
├── App.js                          # Main entry point
├── src/
│   ├── navigation/
│   │   └── AppNavigator.js         # Navigation setup
│   ├── context/
│   │   └── DeviceContext.js        # Global state management
│   ├── screens/
│   │   ├── HomeScreen.js           # Dashboard with stats
│   │   ├── DevicesScreen.js        # All devices list
│   │   ├── AddDeviceScreen.js      # Add new device
│   │   ├── RemoteControlScreen.js  # Remote control UI
│   │   └── SettingsScreen.js       # App settings
│   ├── components/
│   │   ├── DeviceCard.js           # Device list item
│   │   ├── RoomSelector.js         # Room filter
│   │   └── ConnectionBadge.js      # Connection type badge
│   ├── services/
│   │   ├── WiFiService.js          # WiFi communication
│   │   ├── BluetoothService.js     # Bluetooth communication
│   │   └── IRService.js            # Infrared communication
│   ├── utils/
│   │   ├── storage.js              # AsyncStorage wrapper
│   │   └── deviceCommands.js       # Command handling
│   └── constants/
│       ├── deviceTypes.js          # Device type definitions
│       └── colors.js               # Color palette
```

## Implementation Guide

### Adding WiFi Support

For WiFi device control, you'll need to implement the `WiFiService.js`:

```bash
# Install TCP socket library
npm install react-native-tcp-socket
```

Then implement the service to send commands to your WiFi devices.

### Adding Bluetooth Support

For Bluetooth device control:

```bash
# For Bluetooth Classic
npm install react-native-bluetooth-classic

# OR for Bluetooth Low Energy (BLE)
npm install react-native-ble-plx
```

### Adding IR Support

IR support requires:

1. A device with IR blaster hardware (Xiaomi, Samsung Galaxy series)
2. Native module integration

```bash
# You'll need to create a native module or use:
npm install react-native-ir-manager
```

## Screen Navigation Flow

MainTabs (Bottom Navigation)
├── Home
│ └── Shows recent devices and stats
│ └── Navigate to → RemoteControl
├── Devices
│ └── Lists all devices
│ └── Navigate to → RemoteControl
│ └── Delete devices
├── Add Device
│ └── Add new device form
│ └── Select device type, connection, name, brand, room
└── Settings
└── Manage rooms
└── Connection settings
└── About & Help

RemoteControl (Modal/Stack Screen)
└── Full remote control interface
├── Power button
├── Volume control
├── D-Pad navigation
├── Media controls
└── Quick actions

````

## Usage

### Adding a Device

1. Go to "Add Device" tab
2. Select device type (TV, AC, Projector, Speaker)
3. Choose connection type (WiFi, Bluetooth, IR)
4. Enter device name and brand
5. Assign to a room
6. Tap "Add Device"

### Controlling a Device

1. Select device from Home or Devices screen
2. Remote control interface opens
3. Use power, volume, navigation, and media controls
4. Commands are sent based on connection type

### Managing Rooms

1. Go to Settings
2. View existing rooms with device counts
3. Add new rooms or remove existing ones
4. Use Room Selector on Home screen to filter devices

## Customization

### Adding New Device Types

Edit `src/constants/deviceTypes.js`:

```javascript
export const DEVICE_TYPES = [
  // ... existing types
  { value: 'fan', label: 'Fan', icon: 'fan' },
  { value: 'light', label: 'Smart Light', icon: 'lightbulb' },
];
````

### Adding Custom Commands

Edit `src/utils/deviceCommands.js`:

```javascript
export const COMMANDS = {
  // ... existing commands
  CHANNEL_UP: "channel_up",
  CHANNEL_DOWN: "channel_down",
  INPUT: "input",
};
```

## Device Communication Protocols

### WiFi Devices

- Uses TCP/IP sockets
- REST APIs for smart devices
- MQTT for IoT devices
- UPnP/DLNA for media devices

### Bluetooth Devices

- Bluetooth Classic for audio devices
- BLE for low-power devices
- Custom GATT services

### IR Devices

- Requires IR blaster hardware
- Uses IR code databases
- Learning mode for unknown devices

## Troubleshooting

### Devices Not Connecting

1. **WiFi**: Ensure device and phone are on same network
2. **Bluetooth**: Check Bluetooth permissions and device pairing
3. **IR**: Verify device has IR blaster hardware

### Commands Not Working

1. Check console logs for errors
2. Verify device supports the command
3. Test with manufacturer's official app
4. For IR, try learning the code directly

## Future Enhancements

- [ ] Macro support (execute multiple commands)
- [ ] Schedules and automations
- [ ] Voice control integration
- [ ] Widget support
- [ ] Cloud backup for devices
- [ ] Multi-user support
- [ ] Activity/Scene support
- [ ] IR code database expansion
- [ ] Energy monitoring
- [ ] Device grouping

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## Dependencies

```json
{
  "expo": "~49.0.0",
  "react": "18.2.0",
  "react-native": "0.72.6",
  "@react-navigation/native": "^6.1.9",
  "@react-navigation/bottom-tabs": "^6.5.11",
  "@react-navigation/stack": "^6.3.20",
  "@react-native-async-storage/async-storage": "1.19.3",
  "expo-vector-icons": "^13.0.0",
  "react-native-slider": "^0.11.0"
}
```

## Optional Dependencies (for full functionality)

```bash
# WiFi Support
npm install react-native-tcp-socket

# Bluetooth Classic
npm install react-native-bluetooth-classic

# Bluetooth Low Energy
npm install react-native-ble-plx

# IR Support (requires native module)
npm install react-native-ir-manager
```

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Author

**Uzair Rehman**

- GitHub: [@UzairRehman4](https://github.com/UzairRehman4)

## Support

For issues and questions:

- Open an issue on GitHub
- Check the FAQ section
- Contact: [Your Contact Email]

---

**Note**: This app requires proper hardware support for IR functionality. WiFi and Bluetooth functionality can be implemented on most modern smartphones.

````

---

## 🚀 Quick Start Commands

```bash
# Initialize project
npm install

# Start development
npm start

# Build for Android
npm run android

# Build for iOS
npm run ios

# Run tests
npm test

# Build production APK
cd android && ./gradlew assembleRelease
````

---

## 📝 Development Checklist

- [x] Project structure setup
- [x] Navigation implementation
- [x] Device context and state management
- [x] All screens created
- [x] Component library
- [x] Storage utilities
- [ ] WiFi service implementation
- [ ] Bluetooth service implementation
- [ ] IR service implementation
- [ ] Device discovery
- [ ] Testing
- [ ] Production build

---

This completes the entire project structure! You now have:

1. ✅ Complete file structure
2. ✅ All screens with proper navigation
3. ✅ Context for state management
4. ✅ Reusable components
5. ✅ Service layer for device communication
6. ✅ Utilities and constants
7. ✅ Comprehensive README with setup instructions

**Next Steps:**

1. Copy all these files to your GitHub repository
2. Run `npm install` to install dependencies
3. Implement the actual WiFi/Bluetooth/IR communication in the service files
4. Test on real devices
5. Add device-specific command databases
