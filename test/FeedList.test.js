import { mount } from "@vue/test-utils";
import { describe, it, expect, vi, beforeEach } from "vitest";
import FeedList from "../src/components/FeedList.vue";
import { createPinia, setActivePinia } from "pinia";
import axios from "axios";
import { nextTick } from "vue";

// Mock axios
vi.mock("axios");

// We'll store the observer callback here
let intersectionCallback;

describe("FeedList", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    vi.clearAllMocks();

    // Mock IntersectionObserver and capture the callback
    window.IntersectionObserver = vi.fn(function (cb) {
      intersectionCallback = cb;
      return {
        observe: vi.fn(),
        unobserve: vi.fn(),
        disconnect: vi.fn(),
      };
    });
  });

  it("renders initial loading and then items", async () => {
    axios.get.mockResolvedValueOnce({
      data: [
        {
          id: 1,
          title: "First post",
          user: { username: "Alice" },
          created_at: new Date().toISOString(),
        },
        {
          id: 2,
          title: "Second post",
          user: { username: "Bob" },
          created_at: new Date().toISOString(),
        },
      ],
    });

    const wrapper = mount(FeedList);

    // Check if loading state is shown initially
    await nextTick();
    expect(wrapper.find('[data-test="loading"]').exists()).toBe(true);

    // Wait for API response
    await wrapper.vm.$nextTick();
    await new Promise((resolve) => setTimeout(resolve, 0));

    // Check if content is rendered
    expect(wrapper.text()).toContain("First post");
    expect(wrapper.text()).toContain("Second post");
  });

  it("handles API error gracefully", async () => {
    axios.get.mockRejectedValueOnce(new Error("API Error"));

    const wrapper = mount(FeedList);
    await wrapper.vm.$nextTick();
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(wrapper.find('[data-test="error"]').exists()).toBe(true);
    expect(wrapper.text()).toContain("Error loading feeds");
  });

  it("loads more items on scroll", async () => {
    // First API call
    axios.get.mockResolvedValueOnce({
      data: [
        {
          id: 1,
          title: "First post",
          user: { username: "Alice" },
          created_at: new Date().toISOString(),
        },
      ],
    });

    const wrapper = mount(FeedList);
    await wrapper.vm.$nextTick();

    // Mock second API call for infinite scroll
    axios.get.mockResolvedValueOnce({
      data: [
        {
          id: 2,
          title: "Second post",
          user: { username: "Bob" },
          created_at: new Date().toISOString(),
        },
      ],
    });

    // ✅ Trigger infinite scroll using captured callback
    intersectionCallback([{ isIntersecting: true }]);

    await wrapper.vm.$nextTick();
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(wrapper.text()).toContain("First post");
    expect(wrapper.text()).toContain("Second post");
    expect(axios.get).toHaveBeenCalledTimes(2);
  });
});
