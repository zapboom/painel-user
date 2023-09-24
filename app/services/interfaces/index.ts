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
export interface Bot {
  id: string;
  signalType: string;
  name: string;
  gameType: string;
  finish_messages: string[];
  bet_message: string;
  gales: number;
  green_message: string;
  red_message: string;
  welcome_messages: string[];
  target_group: string;
  finish_time: number;
  signal_interval: number;
  in_use: boolean;
  minutesLateEntry: number;
  max_signal: number;
  whatsappConnectionId: string;
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
}

export interface CreateConnectionResponse {
  connection: Connection;
  session: Session;
}
