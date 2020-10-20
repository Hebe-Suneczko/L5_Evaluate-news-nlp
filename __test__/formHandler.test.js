import { parseApi } from "../src/client/js/formHandler";

const mockUpResponse = {
  "status": {
    "code": "0",
    "msg": "OK",
    "credits": "1",
    "remaining_credits": "19981"
  },
  "model": "general_en",
  "score_tag": "NONE",
  "agreement": "AGREEMENT",
  "subjectivity": "OBJECTIVE",
  "confidence": "100",
  "irony": "NONIRONIC",
  "sentence_list": [
    {
      "text": "response",
      "inip": "0",
      "endp": "7",
      "bop": "y",
      "confidence": "100",
      "score_tag": "NONE",
      "agreement": "AGREEMENT",
      "segment_list": [
        {
          "text": "response",
          "segment_type": "secondary",
          "inip": "0",
          "endp": "7",
          "confidence": "100",
          "score_tag": "NONE",
          "agreement": "AGREEMENT",
          "polarity_term_list": []
        }
      ],
      "sentimented_entity_list": [],
      "sentimented_concept_list": []
    }
  ],
  "sentimented_entity_list": [],
  "sentimented_concept_list": []
}

describe("Test Api Parser", () => {
  test("should recognize agreement", () => {
    expect(parseApi(mockUpResponse).isAgreeing).toBe(true);
  });
  test("should recognize isObjective", () => {
    expect(parseApi(mockUpResponse).isObjective).toBe(true);
  });
  test("should recognize isIronic", () => {
    expect(parseApi(mockUpResponse).isIronic).toBe(false);
  });
  test("should recognize score", () => {
    expect(parseApi(mockUpResponse).confidence).toBe(100);
  });
  test("should recognize len of sentences", () => {
    expect(parseApi(mockUpResponse).totalSentences).toBe(1);
  });
  test("should recognize sentiment none", () => {
    expect(parseApi(mockUpResponse).sentiment).toBe("no");
  });
  test("should recognize sentiment neutral", () => {
    mockUpResponse.score_tag = "NEU";
    expect(parseApi(mockUpResponse).sentiment).toBe("neutral");
  });
  test("should recognize sentiment positive", () => {
    mockUpResponse.score_tag = "P";
    expect(parseApi(mockUpResponse).sentiment).toBe("positive");
  });
  test("should recognize sentiment p+ as positive", () => {
    mockUpResponse.score_tag = "P+";
    expect(parseApi(mockUpResponse).sentiment).toBe("positive");
  });
  test("should recognize sentiment negative", () => {
    mockUpResponse.score_tag = "N";
    expect(parseApi(mockUpResponse).sentiment).toBe("negative");
  });
  test("should recognize sentiment n+", () => {
    mockUpResponse.score_tag = "N+";
    expect(parseApi(mockUpResponse).sentiment).toBe("negative");
  });
  test("should recognize sentiment unknown response", () => {
    mockUpResponse.score_tag = "random new response";
    expect(parseApi(mockUpResponse).sentiment).toBe("unknown");
  });
});


