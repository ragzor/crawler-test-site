import TestCase from "../components/TestCase";
import HiddenContent from "../components/HiddenContent";
import ModalDialog from "../components/ModalDialog";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Content Visibility Challenges | Crawler Test Site",
  description:
    "Testing content that is conditionally visible or requires user interaction",
};

export default function ContentVisibilityTests() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Content Visibility Challenges</h1>
      <p className="mb-6">
        These tests demonstrate content that is conditionally visible or hidden
        based on user interaction. Many crawlers struggle with content that
        isn't immediately visible when the page loads.
      </p>

      <TestCase
        title="Hidden Content Elements"
        description="Content that is hidden behind user interactions like clicks, hovers, or tabs."
        expectedBehavior="Crawlers should ideally discover content hidden in tabs, accordions, and behind interactions."
        crawlerChallenge="Most crawlers don't trigger user interactions and may miss content that requires clicks or hovers."
      >
        <HiddenContent />
      </TestCase>

      <TestCase
        title="Modal Dialogs"
        description="Content displayed in modal dialogs that overlay the page."
        expectedBehavior="Advanced crawlers might analyze the modal content in the page source."
        crawlerChallenge="Modal content is typically not visible until triggered by user interaction."
      >
        <ModalDialog />
      </TestCase>

      <TestCase
        title="CSS-Hidden Content"
        description="Content that is hidden using different CSS techniques."
        expectedBehavior="Crawlers' handling of CSS-hidden content varies widely."
        crawlerChallenge="Different hiding techniques may be treated differently by crawlers."
      >
        <div className="space-y-6">
          <div className="p-4 bg-gray-100 rounded">
            <h3 className="font-semibold mb-2">
              Various CSS Hiding Techniques:
            </h3>

            <div className="space-y-4 mt-4">
              <div>
                <p className="font-medium">1. Display: None</p>
                <div className="border p-3 rounded bg-white">
                  <p>This text is visible normally.</p>
                  <p style={{ display: "none" }}>
                    This text is hidden with display:none. Many crawlers will
                    ignore this content completely. This could contain important
                    information that won't be indexed.
                  </p>
                </div>
              </div>

              <div>
                <p className="font-medium">2. Visibility: Hidden</p>
                <div className="border p-3 rounded bg-white">
                  <p>This text is visible normally.</p>
                  <p style={{ visibility: "hidden", height: "20px" }}>
                    This text is hidden with visibility:hidden. Some crawlers
                    may index this despite it being invisible.
                  </p>
                </div>
              </div>

              <div>
                <p className="font-medium">3. Opacity: 0</p>
                <div className="border p-3 rounded bg-white">
                  <p>This text is visible normally.</p>
                  <p style={{ opacity: 0, height: "20px" }}>
                    This text is hidden with opacity:0. Many crawlers will index
                    this content as it's in the DOM.
                  </p>
                </div>
              </div>

              <div>
                <p className="font-medium">4. Text Color Matching Background</p>
                <div className="border p-3 rounded bg-white">
                  <p>This text is visible normally.</p>
                  <p style={{ color: "white", background: "white" }}>
                    This text is hidden by making it white on white background.
                    This technique is considered "cloaking" and can lead to SEO
                    penalties if detected.
                  </p>
                </div>
              </div>

              <div>
                <p className="font-medium">5. Position Off-Screen</p>
                <div className="border p-3 rounded bg-white">
                  <p>This text is visible normally.</p>
                  <p style={{ position: "absolute", left: "-9999px" }}>
                    This text is positioned off-screen. Many crawlers will still
                    index this content despite it not being visible to users.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </TestCase>
    </div>
  );
}
