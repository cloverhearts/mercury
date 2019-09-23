import mercuryCore from "../../index";
const sleep = ms => new Promise(resolve => setTimeout(() => resolve(), ms));
test("test for code Container runner", () => {
  const { Container, Languages } = mercuryCore.Code;
  expect(mercuryCore).toBeTruthy();
  expect(Container).toBeTruthy();
  const codeContainer = new Container();
  expect(codeContainer).toBeTruthy();
  const codeText = "console.log('Hellow Mercury!')";
  codeContainer.code = codeText;
  expect(codeContainer.code).toBe(codeText);
  expect(codeContainer._getCodeWrap(Languages.JAVASCRIPT, codeContainer.code)).toEqual(
    expect.stringMatching(/console.log\('Hello world'\)/)
  );

  const executeResult = () =>
    new Promise((resolve, reject) => {
      const invalidListener = (event, data) => {
        console.log("called invalid listener");
        expect(event).toBeFalsy();
        reject();
      };

      const listener = (event, data) => {
        console.log("received event ", event, data);
        expect(event).toBeTruthy();
        resolve(true);
      };

      codeContainer.addEventListener(codeContainer.channel.LOGGER, invalidListener);
      codeContainer.addEventListener(codeContainer.channel.LOGGER, listener);

      // test for remove event listener
      codeContainer.removeListener(codeContainer.channel.LOGGER, invalidListener);

      const executor = codeContainer.getCommandFunction(codeContainer.code, "");
      expect(executor).toBeTruthy();
      executor();
    });

  const serializedCodeContainer = JSON.stringify(codeContainer);
  expect(serializedCodeContainer).toBeTruthy();
  const newContainer = new Container(JSON.parse(serializedCodeContainer));

  expect(newContainer.id).toEqual(codeContainer.id);
  expect(newContainer.language).toEqual(codeContainer.language);
  expect(newContainer.code).toEqual(codeContainer.code);
  expect(newContainer.logs.length).toEqual(codeContainer.logs.length);

  return expect(executeResult()).resolves.toBe(true);
});
