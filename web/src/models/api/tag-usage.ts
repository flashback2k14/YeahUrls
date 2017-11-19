export class TagUsage {
  referenceId: string;
  count: number;

  constructor (referenceId: string, count: number) {
    this.referenceId = referenceId;
    this.count = count;
  }
}
