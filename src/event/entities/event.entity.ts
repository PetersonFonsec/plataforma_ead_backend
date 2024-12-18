
import { EventTypes } from "./event-types.enum";

export class Event {
  type: EventTypes = EventTypes.OTHERS;
  description: string
  title: string
  date: Date
}
