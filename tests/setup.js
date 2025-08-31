import { expect, afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from "@testing-library/jest-dom/matchers";

expect.extend(matchers);

beforeAll(() => {
	vi.stubGlobal("jest", {
		advanceTimersByTime: vi.advanceTimersByTime.bind(vi),
	});
});

afterEach(() => {
	cleanup();
});

afterAll(() => {
	vi.unstubAllGlobals();
});

/*

- For tests requiring a mocked delay -

// In describe blocks
const fakeTime = 0;
beforeEach(() => {
	vi.useFakeTimers();
});

// In mocked functions
setTimeout(() => resolve(data), fakeTime)

// In tests
const u = userEvent.setup({ advanceTimers: vi.advanceTimersByTime.bind(vi) });

// After all assertions during the "loading" period are done
vi.advanceTimersByTimeAsync(fakeTime);

*/