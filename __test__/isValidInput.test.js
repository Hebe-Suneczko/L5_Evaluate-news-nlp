import { isValidInput } from "../src/client/js/inputValidator";

describe("Check user input", () => {
  test("should return true", () => {
    const input = "a short text";
    expect(isValidInput(input)).toBe(true);
  });
  
  test("should return false for too long content", () => {
    const input = "A".repeat(5001);
    expect(isValidInput(input)).toBe(false);
  });
    
  test("should return false for too many elements", () => {
    const input = "A ".repeat(5001);
    expect(isValidInput(input)).toBe(false);
  });
});
