export interface ITruckEvent {
  type: 'off duty' | 'sleeper berth' | 'driving' | 'on duty';
  time: Date;
  latitude: number;
  longitude: number;
}
