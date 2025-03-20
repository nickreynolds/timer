import { expect, test } from "vitest";
import { parseEditValue, parseTime, formatTime } from "./timeUtils";

test("parseEditValue should return the correct time for 123", () => {
  expect(parseEditValue("123")).toBe(83);
});

test("parseEditValue should return the correct time for 1234", () => {
  expect(parseEditValue("1234")).toBe(754);
});

test("parseEditValue should return the correct time for 12", () => {
  expect(parseEditValue("12")).toBe(12);
});

test("parseEditValue should throw error for 12345", () => {
  expect(() => parseEditValue("12345")).toThrow("Invalid edit value string");
});

test("parseTime should return the correct time for 01:23", () => {
  expect(parseTime("01:23")).toBe(83);
});

test("parseTime should return the correct time for 12:34", () => {
  expect(parseTime("12:34")).toBe(754);
});

test("parseTime should return the correct time for 00:12", () => {
  expect(parseTime("00:12")).toBe(12);
});

test("parseTime should throw error for 123:45", () => {
  expect(() => parseTime("123:45")).toThrow("Invalid time string");
});

test("parseTime should throw error for 15:23:45", () => {
  expect(() => parseTime("15:23:45")).toThrow("Invalid time string");
});
