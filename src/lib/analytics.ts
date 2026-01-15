import ReactGA from "react-ga4";

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

export function initializeGA() {
  if (!GA_MEASUREMENT_ID) {
    console.warn("GA_MEASUREMENT_ID is not set. Analytics is disabled.");
    return;
  }
  ReactGA.initialize(GA_MEASUREMENT_ID);
}

export function trackPageView(path: string) {
  if (!GA_MEASUREMENT_ID) return;
  ReactGA.send({ hitType: "pageview", page: path });
}

export function trackEvent(
  category: string,
  action: string,
  label?: string,
  value?: number,
) {
  if (!GA_MEASUREMENT_ID) return;
  ReactGA.event({
    category,
    action,
    label,
    value,
  });
}

export function trackSpeakerClick(speakerName: string) {
  trackEvent("Speaker", "click", speakerName);
}

export function trackSpeakerListView() {
  trackEvent("SpeakerList", "view");
}

export function trackMapMarkerClick(speakerName: string) {
  trackEvent("Map", "marker_click", speakerName);
}
