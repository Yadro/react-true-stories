export default class ProgressTimer {
  private startTime: number;
  private progressTime: number; // current - startTime
  private timout: number; // delay

  start(timeMs: number): void {
    this.startTime = ProgressTimer.getCurrentTime();
    this.timout = timeMs;
  }

  pause(): void {
    this.progressTime = ProgressTimer.getCurrentTime() - this.startTime;
  }

  getRestTime(): number {
    const rest = this.timout - this.progressTime;
    // console.log('GetRestTime', rest);
    return rest;
  }

  private static getCurrentTime() {
    return new Date().getTime();
  }
}
