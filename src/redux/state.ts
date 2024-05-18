interface AuthState {
    currentUser: {} | null;
}

interface RootState {
    auth: AuthState;
}

export type { RootState, AuthState};