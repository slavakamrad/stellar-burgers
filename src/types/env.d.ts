export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      REACT_APP_BURGER_API_URL: string; 
    }
  }
}