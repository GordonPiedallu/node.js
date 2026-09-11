function calculateTotal(price, quantity) {
    return price * quantity;
}

test("calcule correctement le total", () => {
    expect(calculateTotal(8.90, 2)).toBe(17.80);
});