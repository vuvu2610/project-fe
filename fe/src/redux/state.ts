interface AuthState {
    currentUser: {} | null,
    cart: {} | null,
}

interface RootState {
    auth: AuthState;
}

interface PersistState {
    lang: "en"
}

export type { RootState, AuthState, PersistState};