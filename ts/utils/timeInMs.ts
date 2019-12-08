interface TimeInMsArg {
  milliseconds?: number,
  seconds?: number,
  minutes?: number,
  hours?: number,
  days?: number,
  weeks?: number,
  months?: number,
  years?: number,
}

export const timeInMs = ({
  milliseconds = 0,
  seconds = 0,
  minutes = 0,
  hours = 0,
  days = 0,
  weeks = 0,
  months = 0,
  years = 0,
}: TimeInMsArg) => (
  milliseconds
  + seconds * 1000
  + minutes * 60_000
  + hours * 3_600_000
  + days * 86_400_000
  + weeks * 604_800_000
  + months * 2_629_746_000
  + years * 31_556_952_000
);

export default {};
