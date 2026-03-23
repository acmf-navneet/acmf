global.localStorage = {
    getItem: jest.fn(() => "mock-jwt-token"),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
  };
  