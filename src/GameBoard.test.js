import { GameBoard } from "./GameBoardClass";

test("Can Create game board ", () => {
    const GameBoards = new GameBoard();
    const result = GameBoards.BuildBoard();
    expect(result).toStrictEqual([
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ]);
});

test("Can place ship with 3 length", () => {
    const GameBoards = new GameBoard();
    GameBoards.BuildBoard();
    const result = GameBoards.PlaceShip(1, 0, 3);
    expect(result).toStrictEqual([
        [0, 1, 1, 1, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ]);
});

test("Can place ship with 2 length", () => {
    const GameBoards = new GameBoard();
    GameBoards.BuildBoard();
    const result = GameBoards.PlaceShip(8, 2, 2);
    expect(result).toStrictEqual([
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ]);
});

test("Can place ship with 1 length", () => {
    const GameBoards = new GameBoard();
    GameBoards.BuildBoard();
    const result = GameBoards.PlaceShip(0, 3, 1);
    expect(result).toStrictEqual([
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ]);
});

test("Position doesnt exist ", () => {
    const GameBoards = new GameBoard();
    GameBoards.BuildBoard();
    const result = GameBoards.PlaceShip(10, 3, 1);
    expect(result).toStrictEqual(
        "X_axis or Y_axis is wrong or Position is already taken!"
    );
});

test("Position Already taken ", () => {
    const GameBoards = new GameBoard();
    GameBoards.BuildBoard();
    const Place1 = GameBoards.PlaceShip(4, 3, 2);
    const Place2 = GameBoards.PlaceShip(4, 3, 3);
    expect(Place2).toEqual(
        "X_axis or Y_axis is wrong or Position is already taken!"
    );
});

test("Can dectect ship name", () => {
    const GameBoards = new GameBoard();
    GameBoards.BuildBoard();
    GameBoards.PlaceShip(4, 3, 2);
    const findship = GameBoards.receiveAttack(4, 3)
    expect(findship).toEqual({ "HitsCounter": 0, "isSunk": false, "length": 2, "position": [[4, 3], [5, 3]] });
});

test("Can return ship not found", () => {
    const GameBoards = new GameBoard();
    GameBoards.BuildBoard();
    GameBoards.PlaceShip(4, 3, 2);
    const findship = GameBoards.FindShipName(4, 2)
    expect(findship).toEqual("Ship not found");
});

test("Recive attack ", () => {
    const GameBoards = new GameBoard();
    GameBoards.BuildBoard();
    GameBoards.PlaceShip(4, 3, 2);
    const findship = GameBoards.FindShipName(4, 3)
    expect(findship).not.toEqual("Ship not found");
});



