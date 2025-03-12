export enum Roomtype {
  SINGLE = "SIMPLE",
  DOUBLE = "DOUBLE",
  SUITE = "SUITE",
  FAMILY = "FAMILY",
}

export enum RoomStatus {
  AVAILABLE = "AVAILABLE",
  BOOKED = "BOOKED",
  MAINTENANCE = "MAINTENANCE",
}

export const roomTypes = [
  { label: "Simple", value: Roomtype.SINGLE },
  { label: "Double", value: Roomtype.DOUBLE },
  { label: "Suite", value: Roomtype.SUITE },
  { label: "Family", value: Roomtype.FAMILY },
];

export const statusTypes = [
  { label: "Available", value: RoomStatus.AVAILABLE },
  { label: "Booked", value: RoomStatus.BOOKED },
  { label: "Maintenance", value: RoomStatus.MAINTENANCE },
];
