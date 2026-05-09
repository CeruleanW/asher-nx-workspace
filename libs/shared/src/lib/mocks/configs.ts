export interface MockConfig {
  configControl: {
    scanners: {
      useNoScanner: boolean;
    };
  };
}

export const CONFIG: MockConfig = {
  configControl: {
    scanners: {
      useNoScanner: false,
    },
  },
};
