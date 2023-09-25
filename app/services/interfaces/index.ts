export interface LoginRequest {
  email: string;
  password: string;
}

export interface UserProfile {
  _id: string;
  email: string;
  name: string;
  password: string;
  _subscription: {
    _plan: string;
    _code: string;
    _status: string;
    expiration_date: string;
    _planData: {
      name: string;
      max_bots: number;
      max_connections: number;
      max_signals: number;
    };
    id: string;
  };
}

export interface LoginResponse {
  refreshToken: string;
  token: string;
  plan_data: {
    name: string;
    max_bots: number;
    max_connections: number;
    max_signals: number;
  };
  tokenExpires: number;
  user: UserProfile;
}

interface Session {
  status: string;
  qrcode: string;
}

export interface ConnectionCreateResponse {
  session: Session;
}

export interface Entrie {
  id: string;
  game: string;
  status: boolean;
  color?: number;
  session_id: string | null;
  time: string;
  botId: string;
}

export type signalType = "NORMAL" | "VIP";
export type gameType = "DOUBLE";

export interface Bot {
  id: string;
  signalType: signalType;
  name: string;
  gameType: gameType;
  finish_messages: string[];
  bet_message: string;
  gales: number;
  green_message: string;
  red_message: string;
  welcome_messages: string[];
  target_group: string;
  strategies: Strategie[];
  finish_time: number;
  signal_interval: number;
  in_use: boolean;
  minutesLateEntry: number;
  max_signal: number;
  whatsappConnectionId: string;
}

export interface Strategie {
  id: string;
  preset_colors: number[];
  bet_color: number;
  botId: string;
}

export interface connectionSessionData {
  id: string;
  status: boolean;
  authToken: string;
  sessionId: string | null;
  profileNumber: string | null;
}

export interface Connection {
  id: string;
  is_active: boolean;
  userId: string;
  groupId: null | string;
  connectionSessionDataId: string;
  connectionSessionData: connectionSessionData;
  bots: Bot[];
  user: UserProfile;
}

export interface WhatssapProfile {
  id: string;
  ref: string;
  refTTL: number;
  platform: string;
  smbTos: number;
  pushname: string;
  stale: boolean;
  blockStoreAdds: boolean;
  isVoipInitialized: boolean;
  phoneNumber: string;
}

export interface GetConnectionResponse {
  connection: Connection;
  profile: WhatssapProfile;
  status_session: Session;
  session: Session;
}

export interface CreateConnectionResponse {
  connection: Connection;
  session: Session;
}

export interface WhatssapBotGroup {
  id: {
    server: string;
    user: string;
    _serialized: string;
  };
  subject: string;
}

export interface CreateBotRequest {
  game_type: string;
  name: string;
  signal_type: string;
  gales: number;
  finish_messages: string[];
  welcome_messages: string[];
  bet_message: string;
  green_message: string;
  red_message: string;
  max_signal: number;
  signal_interval: number;
  finish_time: number;
  minutes_late_entry: number;
  whatsappConnectionId: string;
}

export interface UpdateBotRequest {
  game_type?: string;
  name?: string;
  signal_type?: string;
  gales?: number;
  finish_messages?: string[];
  welcome_messages?: string[];
  bet_message?: string;
  green_message?: string;
  red_message?: string;
  max_signal?: number;
  signal_interval?: number;
  finish_time?: number;
  minutes_late_entry?: number;
  whatsappConnectionId?: string;
}

export interface CreateStrategieDoubleRequest {
  bot_id: string;
  bet_color: number;
  preset_colors: number[];
}
