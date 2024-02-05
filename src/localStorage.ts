import { AuthState } from "./reducers/userReducer";

// localStorage.ts
export const saveState = (state: AuthState) => {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem("authState", serializedState);
    } catch (error) {
      // Handle serialization errors
    }
  };
  
  export const loadState = (): AuthState | null => {
    try {
      const serializedState = localStorage.getItem("authState");
      if (serializedState === null) {
        return null;
      }
      return JSON.parse(serializedState);
    } catch (error) {
      // Handle deserialization errors
      return null;
    }
  };
  
  export const token = localStorage.getItem('token');
  fetch('your-api-endpoint', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });