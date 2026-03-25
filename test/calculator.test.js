const { somar, diminuir, multiplicar, dividir } = require("../src/calculator");

test("Somar dois valores válidos", async () => {
  expect(somar(150, 25)).toStrictEqual(175);
});

test("Diminuir dois valores válidos", async () => {
  expect(diminuir(150, 25)).toStrictEqual(125);
});

test("Multiplicar dois valores válidos", async () => {
  expect(multiplicar(5, 10)).toStrictEqual(50);
});

test("Dividir dois valores válidos", async () => {
  expect(dividir(20, 10)).toStrictEqual(2);
});

test("Somar com número negativo", async () => {
  expect(somar(10, -3)).toStrictEqual(7);
});

test("Multiplicar por zero", async () => {
  expect(multiplicar(999, 0)).toStrictEqual(0);
});

test("Dividir valores decimais", async () => {
  expect(dividir(7.5, 2.5)).toStrictEqual(3);
});
