export function isMeaningfulEvent(name: string) {
  return [
    "Login_Success",
    "Record_Created",
    "Record_Finalized",
    "Review_Submitted",
    "Bookmark_Added",
    "Search_Performed",
  ].includes(name);
}

// ---- Meaningful events helpers ----
export const MEANINGFUL_EVENT_NAMES = {
  Login_Success: "Login_Success",
  Search_Performed: "Search_Performed",
  Record_Finalized: "Record_Finalized",
  Review_Submitted: "Review_Submitted",
  Bookmark_Added: "Bookmark_Added",
  Draft_Saved: "Draft_Saved",
  Record_Edited: "Record_Edited",
} as const;

export type MeaningfulEventName =
  (typeof MEANINGFUL_EVENT_NAMES)[keyof typeof MEANINGFUL_EVENT_NAMES];

type ValidPropertyValue = string | number | boolean | string[] | number[];
type AmpProperties = Record<string, ValidPropertyValue>;
type AmplitudeLike = {
  trackEvent: (eventName: string, properties?: AmpProperties) => void;
  updateUserProperties: (properties: AmpProperties) => void;
};

export function trackMeaningfulEvent(
  amplitude: AmplitudeLike,
  name: MeaningfulEventName,
  properties?: AmpProperties
) {
  amplitude.trackEvent(name, properties);
  amplitude.updateUserProperties({
    last_event_at: new Date().toISOString(),
  });
}
