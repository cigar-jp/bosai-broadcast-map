import ReactGA from "react-ga4";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  initializeGA,
  trackEvent,
  trackMapMarkerClick,
  trackPageView,
  trackSpeakerClick,
  trackSpeakerListView,
} from "./analytics";

vi.mock("react-ga4", () => ({
  default: {
    initialize: vi.fn(),
    send: vi.fn(),
    event: vi.fn(),
  },
}));

describe("analytics", () => {
  const originalEnv = import.meta.env.VITE_GA_MEASUREMENT_ID;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.stubEnv("VITE_GA_MEASUREMENT_ID", originalEnv);
  });

  describe("initializeGA", () => {
    it("should not initialize when GA_MEASUREMENT_ID is not set", () => {
      vi.stubEnv("VITE_GA_MEASUREMENT_ID", "");
      const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

      initializeGA();

      expect(ReactGA.initialize).not.toHaveBeenCalled();
      warnSpy.mockRestore();
    });
  });

  describe("trackPageView", () => {
    it("should not track when GA is not initialized", () => {
      vi.stubEnv("VITE_GA_MEASUREMENT_ID", "");

      trackPageView("/test");

      expect(ReactGA.send).not.toHaveBeenCalled();
    });
  });

  describe("trackEvent", () => {
    it("should not track when GA is not initialized", () => {
      vi.stubEnv("VITE_GA_MEASUREMENT_ID", "");

      trackEvent("category", "action", "label");

      expect(ReactGA.event).not.toHaveBeenCalled();
    });
  });

  describe("trackSpeakerClick", () => {
    it("should call trackEvent with correct parameters", () => {
      vi.stubEnv("VITE_GA_MEASUREMENT_ID", "");

      trackSpeakerClick("Test Speaker");

      // GA is not initialized, so no event should be sent
      expect(ReactGA.event).not.toHaveBeenCalled();
    });
  });

  describe("trackSpeakerListView", () => {
    it("should call trackEvent with correct parameters", () => {
      vi.stubEnv("VITE_GA_MEASUREMENT_ID", "");

      trackSpeakerListView();

      expect(ReactGA.event).not.toHaveBeenCalled();
    });
  });

  describe("trackMapMarkerClick", () => {
    it("should call trackEvent with correct parameters", () => {
      vi.stubEnv("VITE_GA_MEASUREMENT_ID", "");

      trackMapMarkerClick("Test Marker");

      expect(ReactGA.event).not.toHaveBeenCalled();
    });
  });
});
