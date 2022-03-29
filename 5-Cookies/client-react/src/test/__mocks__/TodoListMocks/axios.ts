// const mocksResponse = {
//   data: [
//     // {
//     //   _id: "622f0da99914875353f30093",
//     //   text: "test1",
//     //   isFinished: false,
//     //   id: "50933888-c160-4796-b186-88b548a7f017",
//     //   userID: "a95c9de8-f81e-4357-8ab7-5625c103c5c5",
//     //   __v: 0,
//     // },
//     // {
//     //   _id: "62402607d07d5e75f8779139",
//     //   text: "new",
//     //   isFinished: true,
//     //   id: "a45f9b8b-97a6-4bbe-b5f8-f5b5752d6211",
//     //   userID: "a95c9de8-f81e-4357-8ab7-5625c103c5c5",
//     //   __v: 0,
//     // },
//   ],
// };

export default {
  get: jest.fn(() => Promise.resolve({ data: {} })),
};
