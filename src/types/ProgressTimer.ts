export default class ProgressTimer {
  private startTime: number;
  private saveProgressTime: number;
  private restProgressTime: number;

  setStartTime(): void {
    this.startTime = ProgressTimer.getCurrentTime();
    // console.log('StartTime', this.startTime);
  }

  setRestTime(timeMs: number): void {
    this.restProgressTime = timeMs;
    // console.log('RestTime', this.restProgressTime);
  }

  saveProgress(): void {
    this.saveProgressTime = ProgressTimer.getCurrentTime() - this.startTime;
    // console.log('Progress', this.saveProgressTime);
  }

  getRestTime(): number {
    const rest = this.restProgressTime - this.saveProgressTime;
    // console.log('GetRestTime', rest);
    return rest;
  }

  private static getCurrentTime() {
    return new Date().getTime();
  }
}
