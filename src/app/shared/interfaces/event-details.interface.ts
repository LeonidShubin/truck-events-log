export interface IEventDetails {
  type: 'off duty' | 'sleeper berth' | 'driving' | 'on duty';
  start: {
    time: Date,
    latitude: number;
    longitude: number;
  };
  end: {
    time: Date,
    latitude: number;
    longitude: number;
  };
}
