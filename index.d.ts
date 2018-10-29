declare interface Loudness {
  getMuted(): Promise<boolean>
  getVolume(): Promise<number>
  setMuted(muted: boolean): Promise<void>
  setVolume(volume: number): Promise<void>
}

declare const loudness: Loudness

export = loudness
