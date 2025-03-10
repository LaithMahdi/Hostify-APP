enum roomtype {
  SINGLE = "SIMPLE",
  DOUBLE = "DOUBLE",
  SUITE = "SUITE",
  FAMILY = "FAMILY",
}

enum RoomStatus {
  AVAILABLE = "AVAILABLE",
  BOOKED = "BOOKED",
  MAINTENANCE = "MAINTENANCE",
}

export const roomTypes = [
  { label: "Simple", value: roomtype.SINGLE },
  { label: "Double", value: roomtype.DOUBLE },
  { label: "Suite", value: roomtype.SUITE },
  { label: "Family", value: roomtype.FAMILY },
];

export const statusTypes = [
  { label: "Available", value: RoomStatus.AVAILABLE },
  { label: "Booked", value: RoomStatus.BOOKED },
  { label: "Maintenance", value: RoomStatus.MAINTENANCE },
];
