import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import type { SpeakerFeature } from "@/types/speaker";
import { SpeakerList } from "./SpeakerList";

// Mock analytics
vi.mock("@/lib/analytics", () => ({
  trackSpeakerClick: vi.fn(),
  trackSpeakerListView: vi.fn(),
}));

const mockSpeakers: SpeakerFeature[] = [
  {
    type: "Feature",
    properties: {
      id: 1,
      name: "テストスピーカー1",
      address: "須坂市テスト町1-1",
      type: "屋外拡声子局",
    },
    geometry: {
      type: "Point",
      coordinates: [138.3073, 36.6507],
    },
  },
  {
    type: "Feature",
    properties: {
      id: 2,
      name: "テストスピーカー2",
      address: "須坂市テスト町2-2",
      type: "屋外拡声子局",
    },
    geometry: {
      type: "Point",
      coordinates: [138.308, 36.651],
    },
  },
];

describe("SpeakerList", () => {
  it("should render the title", () => {
    render(<SpeakerList speakers={mockSpeakers} onSpeakerClick={vi.fn()} />);

    expect(screen.getByText("スピーカー一覧")).toBeInTheDocument();
  });

  it("should render the speaker count", () => {
    render(<SpeakerList speakers={mockSpeakers} onSpeakerClick={vi.fn()} />);

    expect(screen.getByText("2件")).toBeInTheDocument();
  });

  it("should render all speakers", () => {
    render(<SpeakerList speakers={mockSpeakers} onSpeakerClick={vi.fn()} />);

    expect(screen.getByText("テストスピーカー1")).toBeInTheDocument();
    expect(screen.getByText("テストスピーカー2")).toBeInTheDocument();
  });

  it("should render speaker addresses", () => {
    render(<SpeakerList speakers={mockSpeakers} onSpeakerClick={vi.fn()} />);

    expect(screen.getByText("須坂市テスト町1-1")).toBeInTheDocument();
    expect(screen.getByText("須坂市テスト町2-2")).toBeInTheDocument();
  });

  it("should call onSpeakerClick when a speaker is clicked", async () => {
    const user = userEvent.setup();
    const onSpeakerClick = vi.fn();

    render(
      <SpeakerList speakers={mockSpeakers} onSpeakerClick={onSpeakerClick} />,
    );

    await user.click(screen.getByText("テストスピーカー1"));

    expect(onSpeakerClick).toHaveBeenCalledWith(mockSpeakers[0]);
  });

  it("should call onSpeakerClick when Enter key is pressed", async () => {
    const user = userEvent.setup();
    const onSpeakerClick = vi.fn();

    render(
      <SpeakerList speakers={mockSpeakers} onSpeakerClick={onSpeakerClick} />,
    );

    const cards = screen.getAllByRole("button");
    cards[0].focus();
    await user.keyboard("{Enter}");

    expect(onSpeakerClick).toHaveBeenCalledWith(mockSpeakers[0]);
  });

  it("should render empty list when no speakers", () => {
    render(<SpeakerList speakers={[]} onSpeakerClick={vi.fn()} />);

    expect(screen.getByText("0件")).toBeInTheDocument();
  });
});
