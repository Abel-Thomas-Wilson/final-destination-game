
export interface Position {
  x: number;
  y: number;
}

export interface GameObject {
  id: string;
  pos: Position;
  width: number;
  height: number;
  color: string;
}

export interface PlayerCarState extends GameObject {
  isLaunched: boolean;
  isVisible: boolean;
}
