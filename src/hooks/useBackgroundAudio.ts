import { useSyncExternalStore } from "react";

const STORAGE_KEY = "bg-audio-volume-v2";
const DEFAULT_VOLUME = 1;

interface SCWidget {
  setVolume: (v: number) => void;
  play: () => void;
  pause: () => void;
}

interface State {
  volume: number;
  lastNonZero: number;
  widget: SCWidget | null;
}

const readStored = (): number | null => {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw == null) return null;
    const n = Number(raw);
    if (Number.isFinite(n) && n >= 0 && n <= 100) return n;
  } catch {
    /* noop */
  }
  return null;
};

const initialVolume = readStored() ?? DEFAULT_VOLUME;

const state: State = {
  volume: initialVolume,
  lastNonZero: initialVolume > 0 ? initialVolume : 25,
  widget: null,
};

const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());

const persist = (v: number) => {
  try {
    localStorage.setItem(STORAGE_KEY, String(v));
  } catch {
    /* noop */
  }
};

export const backgroundAudio = {
  getVolume: () => state.volume,
  getInitialVolume: () => initialVolume,
  registerWidget(widget: SCWidget) {
    state.widget = widget;
    try {
      widget.setVolume(state.volume);
    } catch {
      /* noop */
    }
  },
  setVolume(v: number) {
    const clamped = Math.max(0, Math.min(100, Math.round(v)));
    state.volume = clamped;
    if (clamped > 0) state.lastNonZero = clamped;
    persist(clamped);
    try {
      state.widget?.setVolume(clamped);
    } catch {
      /* noop */
    }
    emit();
  },
  toggleMute() {
    if (state.volume > 0) {
      state.lastNonZero = state.volume;
      this.setVolume(0);
    } else {
      this.setVolume(state.lastNonZero || 25);
    }
  },
  subscribe(listener: () => void) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
};

export const useBackgroundAudio = () => {
  const volume = useSyncExternalStore(
    (l) => {
      listeners.add(l);
      return () => listeners.delete(l);
    },
    () => state.volume,
    () => state.volume,
  );
  return {
    volume,
    isMuted: volume === 0,
    setVolume: (v: number) => backgroundAudio.setVolume(v),
    toggleMute: () => backgroundAudio.toggleMute(),
  };
};
