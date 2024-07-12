interface AuthState {
    currentUser: {} | null,
    cart: {} | null,
}

interface RootState {
    auth: AuthState;
}

export type { RootState, AuthState};