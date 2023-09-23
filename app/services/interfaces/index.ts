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

export interface Entrie {
  id: string;
  game: string;
  status: boolean;
  color?: number;
  session_id: string | null;
  time: string;
  botId: string;
}
