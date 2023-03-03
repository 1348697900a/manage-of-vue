/// <reference types="vite/client" />
import { RouteRecordRaw } from 'vue-router';
declare module 'vue-router' {
  interface RouteRecordRaw {
    label?: string;
  }
}
