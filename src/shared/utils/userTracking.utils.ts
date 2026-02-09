type User = {
  address?: string;
};

interface LuckyOrange {
  events: {
    track: (text: string) => void;
  };
  visitor: {
    identify: (id: string, user: User) => void;
  };
  $internal: {
    ready: (type: string) => Promise<void>;
  };
}
type LOQArrayElement = string | ((LO: LuckyOrange) => void);
type LOQArray = Array<Array<LOQArrayElement>>;
declare global {
  var LOQ: LOQArray;
}

const LO = {
  getLOQ() {
    globalThis.LOQ = globalThis.LOQ || [];
    return globalThis.LOQ;
  },
  track(text: string) {
    this.getLOQ().push([
      'ready',
      function (lucky: LuckyOrange) {
        lucky.$internal.ready('events').then(function () {
          lucky.events.track(text);
        });
      },
    ]);
  },
  identify(id: string, user: User) {
    this.getLOQ().push([
      'ready',
      function (lucky: LuckyOrange) {
        lucky.$internal.ready('visitor').then(function () {
          lucky.visitor.identify(id, user);
        });
      },
    ]);
  },
};

export { LO };
