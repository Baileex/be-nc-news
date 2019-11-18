const { expect } = require("chai");
const {
  formatDates,
  makeRefObj,
  formatComments
} = require("../db/utils/utils");

describe("formatDates", () => {
  it("returns a new empty array when passed an empty array", () => {
    const arr = [];
    const actual = formatDates(arr);
    expect(actual).to.eql([]);
  });
  it("returns a single element array, with the correctly formatted created_at key, when a single element array is passed", () => {
    const arr = [
      {
        title: "They're not exactly dogs, are they?",
        topic: "mitch",
        author: "butter_bridge",
        body: "Well? Think about it.",
        created_at: 533132514171
      }
    ];
    let newArr = formatDates(arr);
    expect(newArr[0].created_at).to.equal(
      new Date(arr[0].created_at).toUTCString()
    );
  });
  it("returns a multi-element array, with the correctly formatted created_at key, when a multi-element array is passed ", () => {
    const arr = [
      {
        title: "They're not exactly dogs, are they?",
        topic: "mitch",
        author: "butter_bridge",
        body: "Well? Think about it.",
        created_at: 533132514171
      },
      {
        title: "Seven inspirational thought leaders from Manchester UK",
        topic: "mitch",
        author: "rogersop",
        body: "Who are we kidding, there is only one, and it's Mitch!",
        created_at: 406988514171
      },
      {
        title: "Am I a cat?",
        topic: "mitch",
        author: "icellusedkars",
        body:
          "Having run out of ideas for articles, I am staring at the wall blankly, like a cat. Does this make me a cat?",
        created_at: 280844514171
      },
      {
        title: "Moustache",
        topic: "mitch",
        author: "butter_bridge",
        body: "Have you seen the size of that thing?",
        created_at: 154700514171
      }
    ];
    const actual = formatDates(arr);
    expect(actual[3].created_at).to.eql(
      new Date(arr[3].created_at).toUTCString()
    );
  });
});
// note to self this solution does mutate the original array unsure why?
it("does not mutate the original array", () => {
  const arr = [
    {
      title: "They're not exactly dogs, are they?",
      topic: "mitch",
      author: "butter_bridge",
      body: "Well? Think about it.",
      created_at: 533132514171
    }
  ];
  formatDates(arr);
  expect(arr).to.eql([
    {
      title: "They're not exactly dogs, are they?",
      topic: "mitch",
      author: "butter_bridge",
      body: "Well? Think about it.",
      created_at: 533132514171
    }
  ]);
});

describe("makeRefObj", () => {
  it("returns an empty object when input is an empty array", () => {
    let input = [];
    let actual = makeRefObj(input);
    expect(actual).to.eql({});
  });
  it("makes a reference object of title and article_id when an array of a single element is passed", () => {
    let input = [{ article_id: 1, title: "Hi" }];
    let actual = makeRefObj(input);
    expect(actual).to.eql({ Hi: 1 });
  });
  it("makes a reference object of title and article_id when an array of multiple elements is passed", () => {
    let input = [
      { article_id: 1, title: "A" },
      { article_id: 2, title: "B" },
      { article_id: 3, title: "C" },
      { article_id: 4, title: "D" }
    ];
    let actual = makeRefObj(input);
    expect(actual).to.eql({ A: 1, B: 2, C: 3, D: 4 });
  });
  it("does not mutate original data", () => {
    let input = [{ article_id: 1, title: "A" }];
    makeRefObj(input);
    expect(input).to.eql([{ article_id: 1, title: "A" }]);
  });
});

describe("formatComments", () => {
  it("returns an empty array, ", () => {
    let input = [];
    let actual = formatComments(input, []);
    expect(actual).to.eql([]);
  });
  it("returns a new array for formatted comments using the reference object", () => {
    let input = [
      {
        body: "This is a bad article name",
        belongs_to: "A",
        created_by: "butter_bridge",
        votes: 1,
        created_at: 1038314163389
      }
    ];
    let refObj = { A: 1 };
    let actual = formatComments(input, refObj);
    actual = formatDates(actual);
    expect(actual).to.eql([
      {
        body: "This is a bad article name",
        article_id: 1,
        author: "butter_bridge",
        votes: 1,
        created_at: new Date(input[0].created_at).toUTCString()
      }
    ]);
  });
  it("returns a new array for formatted comments using the reference object", () => {
    let input = [
      {
        body: "This is a bad article name",
        belongs_to: "A",
        created_by: "butter_bridge",
        votes: 1,
        created_at: 1038314163389
      },
      {
        body: "The owls are not what they seem.",
        belongs_to: "B",
        created_by: "icellusedkars",
        votes: 20,
        created_at: 1006778163389
      }
    ];
    let refObj = { A: 1, B: 2 };
    let actual = formatComments(input, refObj);
    actual = formatDates(actual);
    expect(actual).to.eql([
      {
        body: "This is a bad article name",
        article_id: 1,
        author: "butter_bridge",
        votes: 1,
        created_at: new Date(input[0].created_at).toUTCString()
      },
      {
        body: "The owls are not what they seem.",
        article_id: 2,
        author: "icellusedkars",
        votes: 20,
        created_at: new Date(input[1].created_at).toUTCString()
      }
    ]);
  });
  it("check it does not mutate original data", () => {
    const input = [
      {
        body: "This is a bad article name",
        belongs_to: "A",
        created_by: "butter_bridge",
        votes: 1,
        created_at: 1038314163389
      },
      {
        body: "The owls are not what they seem.",
        belongs_to: "B",
        created_by: "icellusedkars",
        votes: 20,
        created_at: 1006778163389
      }
    ];
    let refObj = { A: 1, B: 2 };
    formatComments(input, refObj);
    expect(input).to.eql([
      {
        body: "This is a bad article name",
        belongs_to: "A",
        created_by: "butter_bridge",
        votes: 1,
        created_at: 1038314163389
      },
      {
        body: "The owls are not what they seem.",
        belongs_to: "B",
        created_by: "icellusedkars",
        votes: 20,
        created_at: 1006778163389
      }
    ]);
  });
});
