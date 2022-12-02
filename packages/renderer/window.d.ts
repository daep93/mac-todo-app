import type { ContextBridgeApi } from "./../preload/src/index";

declare global {
  interface Window {
    api: ContextBridgeApi;
  }
}
